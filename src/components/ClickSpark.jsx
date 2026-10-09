import React, { useCallback, useEffect, useRef, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export default function ClickSpark({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const frameRef = useRef(0);
  const pixelRatioRef = useRef(1);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(REDUCED_MOTION_QUERY).matches);

  useEffect(() => {
    const preference = window.matchMedia(REDUCED_MOTION_QUERY);
    const updatePreference = event => setReducedMotion(event.matches);
    preference.addEventListener?.('change', updatePreference);
    return () => preference.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    let resizeTimeout;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      pixelRatioRef.current = pixelRatio;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.getContext('2d')?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(parent);
    window.addEventListener('resize', handleResize, { passive: true });
    window.visualViewport?.addEventListener('resize', handleResize, { passive: true });
    resizeCanvas();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(progress => {
    switch (easing) {
      case 'linear': return progress;
      case 'ease-in': return progress * progress;
      case 'ease-in-out': return progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
      default: return progress * (2 - progress);
    }
  }, [easing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    if (reducedMotion) {
      sparksRef.current = [];
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      context.clearRect(0, 0, canvas.width / pixelRatioRef.current, canvas.height / pixelRatioRef.current);
      return;
    }

    const draw = timestamp => {
      frameRef.current = 0;
      const pixelRatio = pixelRatioRef.current;
      context.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = Math.min(elapsed / duration, 1);
        const eased = easeFunc(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        context.strokeStyle = sparkColor;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        return true;
      });

      if (sparksRef.current.length) frameRef.current = requestAnimationFrame(draw);
    };

    const handleClick = event => {
      const target = event.target;
      const interactiveSelector = [
        'a', 'button', 'input', 'textarea', 'select', 'label',
        '[role="button"]', '[role="link"]', '[role="navigation"]', '[role="menuitem"]', 'nav',
        '[data-no-spark]', '[tabindex]',
      ].join(',');
      if (target instanceof Element && target.closest(interactiveSelector)) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const startTime = performance.now();
      sparksRef.current.push(...Array.from({ length: sparkCount }, (_, index) => ({
        x,
        y,
        angle: (2 * Math.PI * index) / sparkCount,
        startTime,
      })));
      if (!frameRef.current) frameRef.current = requestAnimationFrame(draw);
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      sparksRef.current = [];
      context.clearRect(0, 0, canvas.width / pixelRatioRef.current, canvas.height / pixelRatioRef.current);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: 'block',
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
}
