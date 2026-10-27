# Superstore Sales and Profitability Analysis
### Tableau Vocational Training Project - Dashboard, Story, Performance Testing and Web Integration

**Student:** [YOUR NAME] | **Programme/Institution:** [FILL IN] | **Date:** [FILL IN] | **Supervisor:** [FILL IN]

> Legend: **[PENDING]** = needs real data you must produce (Tableau measurements, links). **[SCREENSHOT]** = insert an image after building in Tableau.

## 1. Abstract
This project analyses 8,399 order lines of a Superstore sample dataset (orders placed 2009-2012) to find where the business earns and loses money. Total sales are 14.92M and total profit 1.52M (10.2% margin). Furniture generates 34.7% of sales but only 2.3% margin, Tables and Bookcases are loss-making, Delivery Truck shipments earn a 4.3% margin versus 14.7% for Regular Air, and 50.8% of order lines lose money. A Tableau dashboard, a six-point story, a performance-testing plan covering four factors, and a static website that embeds the published Tableau content were prepared. Tableau publishing and performance measurements are **[PENDING]**.

## 2. Introduction
Business intelligence tools turn transaction data into decisions. Tableau supports interactive dashboards and guided stories. This project applies it to a retail scenario, and wraps the result in a web page so that it can be shared.

## 3. Problem Statement
Management sees growing sales volume in places but lacks a clear view of which regions, categories, ship modes and discount levels create or destroy profit. A single interactive view is needed that supports data-driven decisions.

## 4. Objectives
1. Build a responsive multi-chart Tableau dashboard (Medium).
2. Build a Tableau story and explain each story point (Medium).
3. Design and run performance tests on four factors (Medium).
4. Publish to Tableau Public and embed in a website (Medium).
5. Produce a demonstration video script and development documentation.

## 5. Dataset Description and Source
- **File:** `superstoreSales.csv`, from the public GitHub repository *curran/data* (`superstoreSales/`). SHA-256 recorded in `data/original/SHA256.txt`.
- **Size:** 8,399 order lines, 21 original columns, 5,496 distinct orders, 795 customers, order dates 2009-01-01 to 2012-12-30.
- **Licence/provenance:** not stated in the repository; the dataset resembles the Tableau sample Superstore (Canadian provinces). Treated as an educational sample. **Confirm permitted use with your institution.** It is *not* the larger "Global Superstore" (51K rows), so the title says Superstore.
- **Currency:** not stated; amounts are shown unitless.
- The original file was never modified.

## 6. Methodology
Questions: total sales/profit; best regions/categories; trend over time; poor-profit products/segments; recommendations. Process: acquire -> profile -> clean -> validate -> analyse (JavaScript) -> Excel workbook -> Tableau build -> story -> performance tests -> website -> documentation.

## 7. Data Preparation
Implemented in `scripts/clean_data.js` (Node.js): normalised CR-only line endings and a trailing blank record; trimmed text; converted dates to ISO; corrected "Prarie" -> "Prairie" (1,706 rows) and "Saskachewan" -> "Saskatchewan" (913 rows); left 63 blank Product Base Margin values empty (not imputed); added derived fields (order year/month/quarter, ship days, profit margin, loss flag). No rows were dropped. Validation found no duplicates, no invalid dates/numbers, discounts within 0-1, and no ship-before-order errors. Full details: `data/processed/data_quality_report.md`. Note: maximum shipping time is 92 days, plausible for the data but worth noting as an outlier.

## 8. Tableau Implementation
Specifications in `tableau/`: 14 worksheets, 12 calculated fields, 2 parameters (`calculated_fields.md`, `workbook_specification.md`). **[PENDING: build in Tableau; insert screenshots of key sheets.]** The Tableau workbook was not generated automatically because Tableau workbooks require Tableau software.

## 9. Dashboard Design
Layout: KPI row (Sales, Profit, Margin, Orders, Loss Share), trend, category and sub-category profit, region map, discount band, ship mode, segment; filters for Year, Region, Category, Segment, Ship Mode. Actions: filter and highlight. Responsive design: range-sized desktop layout plus Tablet and Phone device layouts. Colour: blue neutral/positive, red for losses. See `tableau/dashboard_specification.md`. **[SCREENSHOT: desktop and phone layouts]**

## 10. Storytelling and Findings (6 story points)
| # | Point | Finding (computed from data) |
|---|---|---|
| 1 | Big picture | Sales 14.92M; profit 1.52M; margin 10.2%. Sales by year: 4.21M, 3.55M, 3.44M, 3.72M; margin 10.3%, 10.3%, 11.1%, 9.2%. |
| 2 | Furniture | 34.7% of sales, ~7.7% of profit; margin 2.3% (Technology 14.8%, Office Supplies 13.8%). |
| 3 | Loss-makers | Tables -99K, Bookcases -34K, Scissors/Rulers -8K, Rubber Bands -0.1K; Storage & Organization 0.6% margin on 1.07M sales. |
| 4 | Shipping | Delivery Truck 41.7% of sales at 4.3% margin; Regular Air 14.7%; Express Air 12.4%. |
| 5 | Discounts | Margin 12.6% (0%), 13.6% (1-3%), 8.4% (4-6%), 8.1% (7-10%). Association only. |
| 6 | Regions + actions | West 3.60M at 8.3%; Ontario 11.3%; Prairie 11.3%; Atlantic 11.9%; Yukon 7.6%; Nunavut 2.4%. |

Recommendations: review pricing/costs of Tables, Bookcases and truck-shipped furniture; examine discounts above 3%; investigate West and Yukon; protect Binders (30.0%), Labels (35.1%), Envelopes (27.7%).

## 11. Performance-Testing Methodology and Results
Four factors, one-at-a-time, 3 runs per level, cold loads: (T1) data rows 2,000/4,000/8,399; (T2) filters 0/2/4/6; (T3) calculated fields 0/3/6/10; (T4) visualisations 1/3/6/9. Full protocol: `performance_testing/test_plan.md`. Analysis tool: `npm run perf`.
**Results: [PENDING - no Tableau measurements have been taken.]** Insert the table from `outputs/performance_summary.md` after measuring, and write the analysis (which factor mattered most, supported only by your data).

## 12. Website Integration and Deployment
Static site (HTML/CSS/JS) deployed to GitHub Pages; Tableau URLs are configured in `assets/js/config.js`; placeholders show a "not published yet" notice. Embeds use Tableau Public view URLs inside iframes. Relative paths are used so the site works under `https://<user>.github.io/<repo>/`. **Live URL: [PENDING]. Tableau Public URLs: [PENDING].**

## 13. Testing and Validation
`npm test` (Node built-in test runner + jsdom): original-file hash, reconciliation of cleaned vs original totals, cleaning rules, group-by correctness, Excel sheet structure, no fabricated results, placeholder/iframe embed behaviour, rendering of KPIs and charts, link existence, absence of root-relative paths, SEO/accessibility basics, performance-analysis maths. The Excel workbook's 232 formulas were independently recalculated with LibreOffice with zero mismatches (`scripts/validate_excel.js`). Not tested: real Tableau embeds, real browsers' visual rendering, assistive-technology testing.

## 14. Limitations
Sample dataset (2009-2012); unknown currency and licence; "Region" mixes regions and territories; lines not orders; discount-profit link is correlational; Delivery Truck effect is probably confounded by product type; performance tests on 8,399 rows on one machine are limited; Excel file has no native charts.

## 15. Conclusions and Recommendations
Profit is concentrated in Technology and Office Supplies; Furniture, truck-shipped goods and discounts above 3% coincide with weak margins; about half of all lines lose money. Focused pricing, discount and shipping reviews are the most promising levers, to be validated with further analysis.

## 16. References
- Dataset: curran/data, `superstoreSales/superstoreSales.csv`, GitHub (accessed 2026-10-27).
- Tableau Public and Tableau Help documentation: https://help.tableau.com (embedding, Performance Recorder, device layouts).
- GitHub Pages documentation: https://docs.github.com/pages.
- ExcelJS, Papa Parse, jsdom npm documentation.

## 17. Appendix
A. Data dictionary - `excel/tableau_analysis.xlsx` > Data Dictionary. B. Calculated fields - `tableau/calculated_fields.md`. C. Story specification - `tableau/story_specification.md`. D. Test plan - `performance_testing/test_plan.md`. E. Screenshots **[PENDING]**. F. Published links **[PENDING]**.
