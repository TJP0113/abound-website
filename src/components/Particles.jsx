import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';
import './Particles.css';

const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];

const hexToRgb = hex => {
  const value = hex.replace(/^#/, '');
  const normalized = value.length === 3 ? value.split('').map(character => character + character).join('') : value;
  const int = parseInt(normalized.slice(0, 6), 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  uniform float uFillContainer;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;
    vec3 pos = position * uSpread;
    if (uFillContainer > 0.5) {
      pos = vec3(position.xy, 0.0);
    } else {
      pos.z *= 10.0;
    }
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    vec4 mvPos = viewMatrix * mPos;
    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }
    vec4 clipPosition = projectionMatrix * mvPos;
    if (uFillContainer > 0.5) {
      vec2 screenPosition = (modelMatrix * vec4(position.xy, 0.0, 1.0)).xy;
      screenPosition += vec2(
        sin(t * random.z + 6.28 * random.w),
        sin(t * random.y + 6.28 * random.x)
      ) * 0.012;
      clipPosition.xy = screenPosition * clipPosition.w;
    }
    gl_Position = clipPosition;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if (uAlphaParticles < 0.5) {
      if (d > 0.5) discard;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
  randomSeed = 1,
  fillContainer = false,
  className,
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return undefined;

    let renderer;
    let geometry;
    let program;
    let frameId = 0;
    let visible = false;
    let elapsed = 0;
    let lastTime = 0;
    let resizeObserver;
    let intersectionObserver;

    try {
      renderer = new Renderer({ dpr: Math.min(pixelRatio, 1.5), depth: false, alpha: true });
      const gl = renderer.gl;
      gl.canvas.setAttribute('aria-hidden', 'true');
      gl.clearColor(0, 0, 0, 0);
      container.appendChild(gl.canvas);

      const camera = new Camera(gl, { fov: 15 });
      camera.position.set(0, 0, cameraDistance);

      const resize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.perspective({ aspect: width / height });
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const handleMouseMove = event => {
        const rect = container.getBoundingClientRect();
        mouseRef.current = {
          x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
          y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
        };
      };
      if (moveParticlesOnHover) container.addEventListener('mousemove', handleMouseMove, { passive: true });

      const positions = new Float32Array(particleCount * 3);
      const randoms = new Float32Array(particleCount * 4);
      const colors = new Float32Array(particleCount * 3);
      const palette = particleColors?.length ? particleColors : defaultColors;
      let seed = Number(randomSeed) >>> 0;
      if (!seed) seed = 1;
      const nextRandom = () => {
        seed += 0x6D2B79F5;
        let value = seed;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
      };
      for (let i = 0; i < particleCount; i += 1) {
        let x; let y; let z; let length;
        if (fillContainer) {
          x = nextRandom() * 2 - 1;
          y = nextRandom() * 2 - 1;
          z = 0;
          positions.set([x, y, z], i * 3);
        } else {
          do {
            x = nextRandom() * 2 - 1;
            y = nextRandom() * 2 - 1;
            z = nextRandom() * 2 - 1;
            length = x * x + y * y + z * z;
          } while (length > 1 || length === 0);
          const radius = Math.cbrt(nextRandom());
          positions.set([x * radius, y * radius, z * radius], i * 3);
        }
        randoms.set([nextRandom(), nextRandom(), nextRandom(), nextRandom()], i * 4);
        colors.set(hexToRgb(palette[Math.floor(nextRandom() * palette.length)]), i * 3);
      }

      geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        random: { size: 4, data: randoms },
        color: { size: 3, data: colors },
      });
      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uSpread: { value: particleSpread },
          uBaseSize: { value: particleBaseSize * Math.min(pixelRatio, 1.5) },
          uSizeRandomness: { value: sizeRandomness },
          uFillContainer: { value: fillContainer ? 1 : 0 },
          uAlphaParticles: { value: alphaParticles ? 1 : 0 },
        },
        transparent: true,
        depthTest: false,
      });
      const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

      const stop = () => {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = 0;
      };
      const update = time => {
        frameId = 0;
        if (!visible || document.hidden) return;
        const delta = lastTime ? Math.min(time - lastTime, 50) : 0;
        lastTime = time;
        elapsed += delta * speed;
        program.uniforms.uTime.value = elapsed * 0.001;
        particles.position.x = moveParticlesOnHover ? -mouseRef.current.x * particleHoverFactor : 0;
        particles.position.y = moveParticlesOnHover ? -mouseRef.current.y * particleHoverFactor : 0;
        if (!disableRotation) {
          particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
          particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
          particles.rotation.z += 0.01 * speed;
        }
        renderer.render({ scene: particles, camera });
        frameId = requestAnimationFrame(update);
      };
      const start = () => {
        if (visible && !document.hidden && !frameId) {
          lastTime = 0;
          frameId = requestAnimationFrame(update);
        }
      };
      intersectionObserver = new IntersectionObserver(entries => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) start();
        else stop();
      });
      intersectionObserver.observe(container);
      document.addEventListener('visibilitychange', start);

      return () => {
        stop();
        document.removeEventListener('visibilitychange', start);
        intersectionObserver?.disconnect();
        resizeObserver?.disconnect();
        if (moveParticlesOnHover) container.removeEventListener('mousemove', handleMouseMove);
        geometry?.remove();
        program?.remove();
        if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    } catch {
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (renderer?.gl?.canvas?.parentElement === container) container.removeChild(renderer.gl.canvas);
      renderer?.gl?.getExtension('WEBGL_lose_context')?.loseContext();
      return undefined;
    }
  }, [
    particleCount, particleSpread, speed, particleColors, moveParticlesOnHover,
    particleHoverFactor, alphaParticles, particleBaseSize, sizeRandomness,
    cameraDistance, disableRotation, pixelRatio, randomSeed, fillContainer, prefersReducedMotion,
  ]);

  return <div ref={containerRef} className={`particles-container ${className || ''}`} aria-hidden="true" />;
}
