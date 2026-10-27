// Creates reproducible row-count subsets for test T1 from the cleaned data (seeded sampling).
// 2000/4000 = random samples of REAL rows. 25000/100000 = REPLICATED rows with new Row IDs (synthetic stress only).
import fs from 'node:fs';
import Papa from 'papaparse';
import { readCsv } from '../scripts/lib.js';
const { data, meta } = readCsv('data/processed/superstore_clean.csv');
let s = 12345; const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
const sample = (n) => { const a = [...data]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); };
const replicate = (n) => Array.from({ length: n }, (_, i) => ({ ...data[i % data.length], row_id: i + 1 }));
fs.mkdirSync('performance_testing/datasets', { recursive: true });
const write = (n, rows, tag) => { fs.writeFileSync(`performance_testing/datasets/superstore_${n}${tag}.csv`, Papa.unparse(rows, { columns: meta.fields })); console.log(n, tag || 'real sample', rows.length); };
write(2000, sample(2000), ''); write(4000, sample(4000), '');
write(25000, replicate(25000), '_synthetic'); write(100000, replicate(100000), '_synthetic');
