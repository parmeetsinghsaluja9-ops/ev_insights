// Summarises results_template.csv-style data. Rows with status != MEASURED or empty seconds are reported as PENDING and never imputed.
// Usage: node performance_testing/analyze_results.js [path/to/results.csv]
import fs from 'node:fs';
import { readCsv } from '../scripts/lib.js';

export function summarize(rows) {
  const groups = new Map();
  for (const r of rows) {
    const k = `${r.test_id}|${r.factor}|${r.level}`;
    if (!groups.has(k)) groups.set(k, { test: r.test_id, factor: r.factor, level: r.level, vals: [], pending: 0 });
    const g = groups.get(k), v = parseFloat(r.seconds);
    if (r.status === 'MEASURED' && Number.isFinite(v) && v >= 0) g.vals.push(v); else g.pending++;
  }
  const out = [];
  for (const g of groups.values()) {
    const v = [...g.vals].sort((a, b) => a - b), n = v.length;
    const mean = n ? v.reduce((a, b) => a + b, 0) / n : null;
    const sd = n > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1)) : null;
    out.push({ ...g, n, mean, median: n ? (n % 2 ? v[(n - 1) / 2] : (v[n / 2 - 1] + v[n / 2]) / 2) : null, sd, min: n ? v[0] : null, max: n ? v[n - 1] : null });
  }
  // % change vs first level of each test (baseline = first level in file order that has data)
  const base = {};
  for (const o of out) if (o.mean != null && base[o.test] == null) base[o.test] = o.mean;
  return out.map((o) => ({ ...o, pctVsBaseline: o.mean != null && base[o.test] ? ((o.mean - base[o.test]) / base[o.test]) * 100 : null }));
}

export function toMarkdown(s) {
  const f = (x, d = 2) => (x == null ? '-' : x.toFixed(d));
  let md = '# Performance Summary\n\nGenerated from recorded results only. `PENDING` = no measured data; nothing is estimated.\n\n| Test | Level | Measured runs | Pending runs | Mean (s) | Median (s) | SD | Min | Max | % vs baseline | Status |\n|---|---|---|---|---|---|---|---|---|---|---|\n';
  for (const o of s) md += `| ${o.test} ${o.factor} | ${o.level} | ${o.n} | ${o.pending} | ${f(o.mean)} | ${f(o.median)} | ${f(o.sd)} | ${f(o.min)} | ${f(o.max)} | ${f(o.pctVsBaseline, 1)} | ${o.n ? 'MEASURED' : 'PENDING'} |\n`;
  return md;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = process.argv[2] || 'performance_testing/results_template.csv';
  const s = summarize(readCsv(file).data);
  fs.mkdirSync('outputs', { recursive: true });
  fs.writeFileSync('outputs/performance_summary.md', toMarkdown(s));
  console.log(`${s.filter((x) => x.n).length} of ${s.length} levels have measured data; wrote outputs/performance_summary.md`);
}
