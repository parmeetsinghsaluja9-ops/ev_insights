# Step-by-Step Development Procedure

## Part A - Reproduce the automated parts (about 5 minutes)
1. Install Node.js 20+ (built and tested on Node 22).
2. `npm install`
3. `npm run all` (clean -> analyse -> Excel -> site data -> tests).
4. Optional Excel formula audit: `soffice --headless --calc --convert-to xlsx --outdir /tmp/recalc excel/tableau_analysis.xlsx && node scripts/validate_excel.js`
5. `npm run serve` and open http://localhost:8080/

## Part B - Build in Tableau (MANUAL, about 3-5 hours)
1. Connect to `data/processed/superstore_clean.csv` (Text file). Create an extract.
2. Set data types and the geographic role for Province (Canada).
3. Create parameters and calculated fields: `tableau/calculated_fields.md`.
4. Build worksheets W1-W14: `tableau/workbook_specification.md`.
5. Verify numbers against `outputs/analysis.json` (e.g. total sales 14,915,600.82; profit 1,521,767.98).
6. Build the dashboard and device layouts: `tableau/dashboard_specification.md`; add actions.
7. Build the six-point story: `tableau/story_specification.md`.
8. Take screenshots.

## Part C - Performance testing (MANUAL)
1. `npm run perf:data` to create the T1 data subsets.
2. Follow `performance_testing/test_plan.md`; enter measured seconds and set `status` to `MEASURED` in a copy of `results_template.csv`.
3. `node performance_testing/analyze_results.js <your_copy.csv>`; paste `outputs/performance_summary.md` in the report.
4. Copy the numbers into the Excel sheet *Test Results* (Run 1-3 columns).

## Part D - Publish and integrate
1. Follow `tableau/publishing_checklist.md`; edit `assets/js/config.js`.
2. `npm run build`; `npm test`; check locally.
3. Deploy to GitHub Pages (README section "Deploy").

## Part E - Finish
Fill report placeholders, record the demo video (`demonstration_script.md`), tick `submission_checklist.md`, update `PROJECT_CONTEXT.md` with verified links.
