// Computes every aggregate used in the Excel workbook, website and report -> outputs/analysis.json
import fs from 'node:fs';
import { loadClean, groupBy, round } from './lib.js';

const rows = loadClean();
const sum = (k) => round(rows.reduce((a, r) => a + r[k], 0));
const by = (fn, sortKey = 'sales') => groupBy(rows, fn).sort((a, b) => b[sortKey] - a[sortKey]);
const band = (d) => (d === 0 ? '0%' : d <= 0.03 ? '1-3%' : d <= 0.06 ? '4-6%' : d <= 0.1 ? '7-10%' : '>10%');

const orders = new Set(rows.map((r) => r.order_id)).size;
const totalSales = sum('sales'), totalProfit = sum('profit');
const kpis = {
  totalSales, totalProfit, margin: round(totalProfit / totalSales, 4),
  orders, orderLines: rows.length, customers: new Set(rows.map((r) => r.customer_name)).size,
  avgOrderValue: round(totalSales / orders), lossLines: rows.filter((r) => r.profit < 0).length,
  lossLineShare: round(rows.filter((r) => r.profit < 0).length / rows.length, 4),
  lossTotal: round(rows.filter((r) => r.profit < 0).reduce((a, r) => a + r.profit, 0)),
  avgShipDays: round(rows.reduce((a, r) => a + r.shipDays, 0) / rows.length),
};

const products = groupBy(rows, (r) => r.product_name);
const subcats = by((r) => `${r.product_category} | ${r.product_sub_category}`, 'profit');
const monthly = groupBy(rows, (r) => `${r.order_year}-${String(r.order_month).padStart(2, '0')}`).sort((a, b) => a.key.localeCompare(b.key));
const cust = groupBy(rows, (r) => r.customer_name);

const analysis = {
  generatedFrom: 'data/processed/superstore_clean.csv',
  kpis,
  byYear: groupBy(rows, (r) => r.year).sort((a, b) => a.key - b.key),
  byRegion: by((r) => r.region),
  byProvince: by((r) => r.province),
  byCategory: by((r) => r.product_category),
  bySubCategory: subcats,
  bySegment: by((r) => r.customer_segment),
  byShipMode: by((r) => r.ship_mode),
  byPriority: by((r) => r.order_priority),
  byContainer: by((r) => r.product_container, 'profit'),
  byDiscountBand: ['0%', '1-3%', '4-6%', '7-10%', '>10%'].map((b) => groupBy(rows.filter((r) => band(r.discount) === b), () => b)[0]).filter(Boolean),
  monthly,
  byCategoryYear: groupBy(rows, (r) => `${r.year}|${r.product_category}`).sort((a, b) => a.key.localeCompare(b.key)),
  topProductsByProfit: [...products].sort((a, b) => b.profit - a.profit).slice(0, 10),
  worstProductsByProfit: [...products].sort((a, b) => a.profit - b.profit).slice(0, 10),
  topCustomersBySales: [...cust].sort((a, b) => b.sales - a.sales).slice(0, 10),
  worstCustomersByProfit: [...cust].sort((a, b) => a.profit - b.profit).slice(0, 5),
};
fs.writeFileSync('outputs/analysis.json', JSON.stringify(analysis, null, 2));
const t = (a, n = 20) => a.slice(0, n).map((x) => `${x.key} S=${x.sales} P=${x.profit} m=${(x.margin * 100).toFixed(1)}% n=${x.lines}`).join('\n');
console.log(JSON.stringify(kpis));
for (const k of ['byYear', 'byRegion', 'byCategory', 'bySubCategory', 'bySegment', 'byShipMode', 'byDiscountBand', 'worstProductsByProfit']) console.log('--', k, '\n' + t(analysis[k]));
