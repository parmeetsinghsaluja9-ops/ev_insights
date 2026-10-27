import test from 'node:test'; import assert from 'node:assert/strict';
import fs from 'node:fs'; import crypto from 'node:crypto';
import { readCsv, groupBy, loadClean } from '../scripts/lib.js';

test('original dataset is unchanged (SHA-256)', () => {
  const expected = fs.readFileSync('data/original/SHA256.txt', 'utf8').split(/\s+/)[0];
  const actual = crypto.createHash('sha256').update(fs.readFileSync('data/original/superstoreSales.csv')).digest('hex');
  assert.equal(actual, expected);
});

test('cleaned data reconciles with original (independent parse)', () => {
  const raw = readCsv('data/original/superstoreSales.csv').data;
  const clean = loadClean();
  assert.equal(clean.length, raw.length);
  const sum = (a, f) => a.reduce((s, r) => s + f(r), 0);
  assert.ok(Math.abs(sum(raw, (r) => +r.Sales) - sum(clean, (r) => r.sales)) < 0.01);
  assert.ok(Math.abs(sum(raw, (r) => +r.Profit) - sum(clean, (r) => r.profit)) < 0.01);
  assert.equal(new Set(clean.map((r) => r.row_id)).size, clean.length);
});

test('cleaning rules: typos fixed, dates valid, ship_days non-negative', () => {
  const c = loadClean();
  assert.ok(!c.some((r) => r.region === 'Prarie' || r.province === 'Saskachewan'));
  assert.ok(c.every((r) => /^\d{4}-\d{2}-\d{2}$/.test(r.order_date) && r.shipDays >= 0 && r.discount >= 0 && r.discount <= 1));
  assert.deepEqual([...new Set(c.map((r) => r.year))].sort(), [2009, 2010, 2011, 2012]);
});

test('groupBy on a small known example', () => {
  const rows = [{ sales: 100, profit: 10, qty: 1 }, { sales: 50, profit: -5, qty: 2 }, { sales: 50, profit: 5, qty: 1 }].map((r, i) => ({ ...r, k: i < 2 ? 'a' : 'b' }));
  const g = Object.fromEntries(groupBy(rows, (r) => r.k).map((x) => [x.key, x]));
  assert.equal(g.a.sales, 150); assert.equal(g.a.profit, 5); assert.equal(g.a.margin, 0.0333); assert.equal(g.a.lossLines, 1); assert.equal(g.b.lines, 1);
});

test('analysis.json KPIs match recomputation', () => {
  const A = JSON.parse(fs.readFileSync('outputs/analysis.json', 'utf8')), c = loadClean();
  assert.equal(A.kpis.orderLines, c.length);
  assert.equal(A.kpis.orders, new Set(c.map((r) => r.order_id)).size);
  assert.equal(A.kpis.lossLines, c.filter((r) => r.profit < 0).length);
  assert.ok(Math.abs(A.byCategory.reduce((s, x) => s + x.sales, 0) - A.kpis.totalSales) < 0.05);
});
