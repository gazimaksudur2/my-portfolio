/**
 * Build-time HTML prerender script.
 * Usage (run after `npm run build` and `npm run build:server`):
 *   node scripts/prerender.mjs
 */
import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname    = path.dirname(fileURLToPath(import.meta.url));
const distDir      = path.resolve(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntry  = path.join(distDir, 'server', 'entry-server.js');

if (!fs.existsSync(serverEntry)) {
  console.error(`❌  Server entry not found at ${serverEntry}`);
  console.error('   Run `npm run build:server` first.');
  process.exit(1);
}

console.log('⚙️  Prerendering…');
// On Windows, absolute paths must be passed as file:// URLs for dynamic import()
const entryUrl = pathToFileURL(serverEntry).href;
const { render } = await import(entryUrl);
const appHtml = render();

const template = fs.readFileSync(templatePath, 'utf-8');
const output = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
);

fs.writeFileSync(templatePath, output);
console.log(`✅  dist/index.html prerendered (${Buffer.byteLength(appHtml, 'utf-8')} bytes injected)`);
