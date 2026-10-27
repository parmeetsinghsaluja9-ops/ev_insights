// Validates workbook formulas: compares cached values (from JS) with values recalculated by LibreOffice.
// Usage: soffice --headless --calc --convert-to xlsx --outdir /tmp/recalc excel/tableau_analysis.xlsx && node scripts/validate_excel.js
import ExcelJS from 'exceljs';
const a = new ExcelJS.Workbook(), b = new ExcelJS.Workbook();
await a.xlsx.readFile('excel/tableau_analysis.xlsx'); await b.xlsx.readFile('/tmp/recalc/tableau_analysis.xlsx');
let checked = 0, bad = [];
for (const ws of a.worksheets) {
  if (ws.name === 'Cleaned Data') continue;
  const wr = b.getWorksheet(ws.name);
  ws.eachRow((row, rn) => row.eachCell((c, cn) => {
    if (c.value && typeof c.value === 'object' && c.value.formula) {
      const exp = c.value.result, got = wr.getCell(rn, cn).value, gv = got && typeof got === 'object' ? got.result : got;
      checked++;
      const ok = typeof exp === 'number' ? Math.abs(exp - gv) <= Math.max(0.02, Math.abs(exp) * 1e-6) : (exp ?? '') === (gv ?? '');
      if (!ok) bad.push(`${ws.name}!${c.address}: cached=${exp} recalculated=${gv} (${c.value.formula.slice(0, 60)})`);
    }
  }));
}
console.log(`formulas checked: ${checked}, mismatches: ${bad.length}`); bad.slice(0, 15).forEach((x) => console.log(x));
process.exit(bad.length ? 1 : 0);
