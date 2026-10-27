# PROJECT_CONTEXT (last updated 2026-10-27)

## Title & objectives
Superstore Sales and Profitability Analysis - Tableau vocational training project (all four items Medium): (A) responsive multi-chart Tableau dashboard; (B) Tableau story with number of story points specified and explained; (C) performance testing on 4 factors (data amount, filters, calculated fields, number of visualisations); (D) publish to Tableau Public and embed in an HTML/CSS/JS website; (E) demo video script + step-by-step documentation.

## Hard requirements from the user's master prompt
- NO Python anywhere. JavaScript/Node.js, HTML, CSS only. Site must be static and deployable on GitHub Pages (relative paths; no Node server claims).
- Never invent performance measurements; label measured vs planned vs illustrative. Never claim unpublished Tableau content is live; use placeholders + graceful notices.
- Do not pretend JS charts or HTML are a Tableau workbook. Keep original data unchanged. Keep explanations concise; record assumptions; update this file at milestones.
- Deliverables: data (original, cleaned, dictionary, quality report, cleaning script), Excel workbook, Tableau specs, performance test materials, website, report + step docs + demo script + viva Q&A + checklist, PROJECT_CONTEXT.md + HANDOFF.md.

## Dataset
- Source: https://github.com/curran/data/tree/gh-pages/superstoreSales (raw file downloaded 2026-10-27 via raw.githubusercontent.com). Licence/provenance NOT stated. Preferred "Global Superstore" (51K rows) was not available offline in the sandbox; this is a Tableau-style Superstore (Canadian provinces), 8,399 rows, order dates 2009-01-01..2012-12-30.
- Original: `data/original/superstoreSales.csv` (CR-only line endings, 21 cols, hash in `data/original/SHA256.txt`). Cleaned: `data/processed/superstore_clean.csv` (27 cols: 21 snake_case + order_year, order_month, order_quarter, ship_days, profit_margin, is_loss).
- Cleaning: Prarie->Prairie (1,706), Saskachewan->Saskatchewan (913), dates ISO, 63 blank Product Base Margin left blank, 0 rows dropped. Caveats: Region mixes regions and territories; currency unknown; some product names contain encoding artefacts; max ship days 92.
- Verified headline figures: Sales 14,915,600.82; Profit 1,521,767.98; margin 10.2%; 5,496 orders; 795 customers; 4,264 loss lines (50.8%), total loss -1,102,503.01. Furniture margin 2.3% (34.7% of sales); Tables/Bookcases/Scissors/Rubber Bands negative; Delivery Truck 4.3% margin (41.7% of sales) vs Regular Air 14.7%; discount 4%+ bands ~8% vs 12.6-13.6% at 0-3%; West 8.3%, Yukon 7.6%, Nunavut 2.4%; yearly margin 10.3/10.3/11.1/9.2%.

## Files (all under project root)
README.md, package.json, .gitignore, .nojekyll, index.html, assets/css/styles.css, assets/js/{config,embed-utils,data,main}.js (data.js auto-generated), scripts/{lib,clean_data,analyze_data,data_dictionary,build_excel,validate_excel,build_site_data,serve}.js, excel/tableau_analysis.xlsx (9 sheets, 232 formulas, validated), tableau/{workbook_specification,calculated_fields,dashboard_specification,story_specification,publishing_checklist}.md, performance_testing/{test_plan.md,results_template.csv,make_template.mjs,prepare_datasets.js,analyze_results.js,datasets/}, tests/{data,excel,site,perf}.test.js, documentation/{project_report,development_procedure,demonstration_script,viva_questions,submission_checklist}.md, outputs/{analysis.json,performance_summary.md}, data/processed/data_quality_report.{md,json}.

## Stack
Node 22.22, npm 10.9; deps: exceljs ^4.4.0, papaparse ^5.4.1; dev: jsdom. Tests via node:test. No bundler. Excel has no native charts (ExcelJS limitation; data bars used). soffice (LibreOffice) used only for formula validation.

## Design decisions
CSS-bar preview charts (no chart library) labelled as non-Tableau; embed via iframe to Tableau Public view URL (`?:showVizHome=no&:embed=true`), URL validated by `EmbedUtils.isPublishedUrl`; data.js (not fetch) so site works from file://; Excel formulas carry cached values and distinct counts are static (script-computed); synthetic 25K/100K stress datasets are replicated rows, gitignored.

## Tableau specs
14 worksheets W1-W14, 12 calculated fields C1-C12, parameters Margin Target and Metric Selector, filters (Year, Region, Category, Segment, Ship Mode), actions (category filter, region filter, highlight), dashboard layout and device layouts, 6-point story: (1) big picture (2) Furniture (3) loss-making sub-categories (4) ship mode (5) discounts (6) regions + recommendations. Full formulas and layout in `tableau/*.md`.

## Performance testing
Plan T1-T4 in `performance_testing/test_plan.md`. **Results: none measured. All 48 rows in results_template.csv are PENDING.** Excel "Test Results" sheet is empty on purpose.

## Website / deployment
Static; see README "Deploy to GitHub Pages" (branch main, root). Not yet pushed/deployed. `assets/js/config.js` holds PLACEHOLDER URLs.

## Commands
`npm install`; `npm run all`; `npm run serve`; `npm test`; `npm run perf:data`; `npm run perf`; Excel audit: `soffice --headless --calc --convert-to xlsx --outdir /tmp/recalc excel/tableau_analysis.xlsx && node scripts/validate_excel.js`.

## Test status: 17 of 17 automated tests passed on 2026-10-27 (node --test); Excel audit 232 formulas, 0 mismatches. Details:
Automated tests cover data reconciliation, Excel structure, no fabricated results, embed placeholder/iframe behaviour (jsdom), link existence/relative paths, perf-analysis maths. NOT tested: real browser visual rendering, real Tableau embed, screen readers.

## Known issues / limitations
No Tableau workbook exists. No real browser available in the build sandbox (jsdom only). Licence of dataset unconfirmed. Tableau field display names assumed to be Title Case of snake_case headers (verify in Tableau).

## Manual tasks for the user
1. Build workbook, dashboard (+device layouts), story in Tableau Public Desktop per `tableau/`. 2. Screenshots. 3. Run T1-T4 and record. 4. Publish; update `assets/js/config.js`. 5. Push to GitHub, enable Pages. 6. Fill report placeholders; record video. 7. Confirm dataset licence/permission.

## Verified published links
None yet. (Add only after opening them in a browser.)

## Next steps (exact)
1. Tableau build (`tableau/workbook_specification.md`). 2. Performance measurements. 3. Publish + set config.js + deploy + verify embeds live + update this file.
