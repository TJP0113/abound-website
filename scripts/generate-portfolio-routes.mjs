import { readFile, writeFile } from 'node:fs/promises';
import { portfolioProjects } from '../src/data/portfolio-data.js';

// Keep non-project routing unchanged; derive exact project rules from the data.
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
config.routes = config.routes.filter(rule => !rule.src || !/^\^\/(portfolio|work)\/[a-z0-9-]+(?:\/|\$)/.test(rule.src));
const projectRules = portfolioProjects.flatMap(project => [
  ...(project.aliases || []).flatMap(alias => [
    { src: `^/portfolio/${alias}(?:/(?:index\\.html)?)?$`, headers: { Location: `/portfolio/${project.slug}` }, status: 308 },
    { src: `^/work/${alias}/?$`, headers: { Location: `/portfolio/${project.slug}` }, status: 308 },
  ]),
  { src: `^/work/${project.slug}/?$`, headers: { Location: `/portfolio/${project.slug}` }, status: 308 },
  { src: `^/portfolio/${project.slug}/(?:index\\.html)?$`, headers: { Location: `/portfolio/${project.slug}` }, status: 308 },
  { src: `^/portfolio/${project.slug}$`, dest: `/portfolio/${project.slug}/index.html` },
]);
const insertion = config.routes.findIndex(rule => rule.src === '^/404\\.html$');
if (insertion < 0) throw new Error('Missing 404 routing boundary');
config.routes.splice(insertion, 0, ...projectRules);
await writeFile('vercel.json', JSON.stringify(config, null, 2) + '\n');
console.log(`Updated deployment routes for ${portfolioProjects.length} portfolio projects.`);
