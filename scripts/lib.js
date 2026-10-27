// Shared helpers: load cleaned data, grouping.
import fs from 'node:fs';
import Papa from 'papaparse';

export function readCsv(path) {
  const text = fs.readFileSync(path, 'utf8').replace(/\r\n?/g, '\n');
  return Papa.parse(text, { header: true, skipEmptyLines: 'greedy' });
}

export function loadClean(path = 'data/processed/superstore_clean.csv') {
  const { data } = readCsv(path);
  return data.map((r) => ({
    ...r,
    rowId: +r.row_id,
    sales: +r.sales,
    profit: +r.profit,
    qty: +r.order_quantity,
    discount: +r.discount,
    shipCost: +r.shipping_cost,
    year: +r.order_year,
    shipDays: +r.ship_days,
  }));
}

export function groupBy(rows, keyFn) {
  const m = new Map();
  for (const r of rows) {
    const k = keyFn(r);
    if (!m.has(k)) m.set(k, { key: k, sales: 0, profit: 0, qty: 0, lines: 0, lossLines: 0 });
    const g = m.get(k);
    g.sales += r.sales; g.profit += r.profit; g.qty += r.qty; g.lines += 1;
    if (r.profit < 0) g.lossLines += 1;
  }
  return [...m.values()].map((g) => ({
    ...g,
    sales: round(g.sales), profit: round(g.profit),
    margin: g.sales ? round(g.profit / g.sales, 4) : 0,
  }));
}

export const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
