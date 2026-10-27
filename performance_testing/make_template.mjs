// Generates results_template.csv with PENDING rows (no values). Run: node performance_testing/make_template.mjs
import fs from 'node:fs';
const L = { T1: ['Amount of data rendered', ['2000 rows', '4000 rows', '8399 rows']], T2: ['Utilisation of filters', ['0 filters/load', '2 filters/load', '4 filters/load', '6 filters/load', '4 filters/interaction']],
  T3: ['Number of calculated fields', ['0 calcs', '3 calcs', '6 calcs', '10 calcs']], T4: ['Number of visualisations', ['1 viz', '3 viz', '6 viz', '9 viz']] };
const out = ['test_id,factor,level,run,seconds,method,cold_or_warm,status,notes'];
for (const [id, [f, ls]] of Object.entries(L)) for (const l of ls) for (let r = 1; r <= 3; r++) out.push(`${id},${f},${l},${r},,,,PENDING,`);
fs.writeFileSync(new URL('./results_template.csv', import.meta.url), out.join('\n') + '\n'); console.log(out.length - 1, 'rows');
