import test from 'node:test'; import assert from 'node:assert/strict';
import fs from 'node:fs'; import path from 'node:path';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('index.html', 'utf8');
await import('../assets/js/embed-utils.js');
const U = globalThis.EmbedUtils;

test('isPublishedUrl accepts only real Tableau Public URLs', () => {
  assert.equal(U.isPublishedUrl('PLACEHOLDER_TABLEAU_PUBLIC_DASHBOARD_URL'), false);
  assert.equal(U.isPublishedUrl('https://example.com/views/a/b'), false);
  assert.equal(U.isPublishedUrl('http://public.tableau.com/views/a/b'), false);
  assert.equal(U.isPublishedUrl('https://public.tableau.com/'), false);
  assert.equal(U.isPublishedUrl('https://public.tableau.com/views/Book1/Dash'), true);
  assert.equal(U.embedSrc('https://public.tableau.com/views/Book1/Dash?x=1'), 'https://public.tableau.com/views/Book1/Dash?:showVizHome=no&:embed=true&:toolbar=yes');
});

async function render(config) {
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/' });
  const w = dom.window; w.PROJECT_CONFIG = config; w.EmbedUtils = U; globalThis.PROJECT_CONFIG = config;
  w.eval(fs.readFileSync('assets/js/data.js', 'utf8')); w.eval(fs.readFileSync('assets/js/main.js', 'utf8'));
  return w.document;
}
test('placeholder URLs show "not published" notices, no iframes', async () => {
  const d = await render({ dashboardUrl: 'PLACEHOLDER_X', storyUrl: 'PLACEHOLDER_Y' });
  assert.equal(d.querySelectorAll('iframe').length, 0);
  assert.equal(d.querySelectorAll('.notice[role="status"]').length >= 2, true);
  assert.match(d.querySelector('#dashboard-embed').textContent, /not published yet/);
});
test('real-looking URLs create iframes with titles', async () => {
  const d = await render({ dashboardUrl: 'https://public.tableau.com/views/B/D', storyUrl: 'https://public.tableau.com/views/B/S', dashboardHeight: 900, storyHeight: 800 });
  const f = [...d.querySelectorAll('iframe')]; assert.equal(f.length, 2); assert.ok(f.every((x) => x.title && x.src.includes(':embed=true')));
});
test('KPIs, charts and dictionary render from data', async () => {
  const d = await render({ dashboardUrl: 'PLACEHOLDER', storyUrl: 'PLACEHOLDER' });
  assert.equal(d.querySelectorAll('.kpi').length, 5);
  assert.ok(d.querySelectorAll('.bars li').length >= 20);
  assert.equal(d.querySelectorAll('#dict-body tr').length, 27);
  assert.match(d.querySelector('#kpis').textContent, /10\.2%/);
});
test('all local links/assets exist and none are root-relative (GitHub Pages subpath safe)', () => {
  const refs = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map((m) => m[1]).filter((r) => !/^(https?:|mailto:)/.test(r));
  assert.ok(refs.length > 10);
  for (const r of refs) { assert.ok(!r.startsWith('/'), `root-relative: ${r}`); assert.ok(fs.existsSync(r), `missing: ${r}`); }
  for (const f of ['assets/css/styles.css', 'assets/js/main.js', 'assets/js/config.js']) assert.ok(!/url\(\s*['"]?\//.test(fs.readFileSync(f, 'utf8')));
});
test('SEO and accessibility basics', () => {
  assert.match(html, /<html lang="en">/); assert.match(html, /<meta name="description"/); assert.match(html, /name="viewport"/);
  assert.match(html, /class="skip"/); assert.equal((html.match(/<h1/g) || []).length, 1); assert.match(html, /<main id="main">/);
});
