import test from 'node:test'; import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';
const wb = new ExcelJS.Workbook(); await wb.xlsx.readFile('excel/tableau_analysis.xlsx');

test('workbook has the expected sheets', () => {
  assert.deepEqual(wb.worksheets.map((w) => w.name), ['Read Me', 'Data Dictionary', 'Cleaned Data', 'KPI Summary', 'Sales Analysis', 'Profit Analysis', 'Regional Analysis', 'Performance Testing', 'Test Results']);
  assert.equal(wb.getWorksheet('Cleaned Data').rowCount, 8400);
});
test('Test Results contains NO fabricated measurements', () => {
  const ws = wb.getWorksheet('Test Results'); let n = 0;
  ws.eachRow((row, i) => { if (i > 1) for (const c of [3, 4, 5]) if (row.getCell(c).value !== null) n++; });
  assert.equal(n, 0);
});
test('KPI formulas present', () => {
  const ws = wb.getWorksheet('KPI Summary');
  assert.match(ws.getCell('B2').value.formula, /SUM\(/); assert.equal(ws.getCell('B4').value.formula, 'B3/B2');
});
