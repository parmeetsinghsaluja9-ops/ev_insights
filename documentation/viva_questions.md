# Likely Viva Questions and Short Answers

1. **Why Superstore data?** A standard, widely used sales dataset with sales, profit, time, geography, products and segments, so the dashboard and story are meaningful.
2. **Is this the Global Superstore?** No. It is a 8,399-row Superstore sample with Canadian provinces; I named it accurately.
3. **What cleaning did you do?** Line endings, trimmed text, ISO dates, fixed two spelling errors, derived fields; blanks in Product Base Margin left as blank. Original untouched.
4. **Why not impute Product Base Margin?** It is not used in KPIs and imputing would invent data.
5. **Dataset vs database?** A CSV is a file of records; a database adds a server, schemas, queries, concurrency and access control. This project does not need one.
6. **Why JavaScript and no Python?** It was a project constraint; Node.js handles CSV/Excel and testing, and the site is static for GitHub Pages.
7. **Can GitHub Pages run Node.js?** No. It serves static files only; Node is used locally for build and tests.
8. **What is a calculated field? Give examples.** A formula-defined field in Tableau, e.g. Profit Margin = SUM(Profit)/SUM(Sales); Discount Band; a FIXED LOD for customer sales.
9. **Row-level vs aggregate vs LOD?** Row-level computes per record; aggregate after grouping; LOD computes at a specified level independent of the view.
10. **What is a parameter?** A user-controlled value (Margin Target, Metric Selector) that calculations can reference.
11. **Dashboard vs story?** Dashboard: interactive combined view. Story: ordered sequence of views with captions to communicate a narrative.
12. **How many story points and why?** Six: overview, category, sub-category, shipping, discount, regions/recommendations - each answers one question.
13. **How is the dashboard responsive?** Range-sized layout with tiled containers and Tablet/Phone device layouts; the website embed adapts to width.
14. **Four performance factors?** Amount of data rendered, filter utilisation, number of calculated fields, number of visualisations.
15. **How did you keep tests fair?** Changed one variable at a time, same device/browser/data, cold loads, 3 runs, recorded mean/median/SD.
16. **What are your performance results?** [State your measured results. If not measured: "pending", never guess.]
17. **How can you speed up a dashboard?** Extracts, fewer filters/sheets, avoid heavy LODs/COUNTD, hide unused fields, aggregate data, simple marks.
18. **Biggest finding?** Furniture is 35% of sales at 2.3% margin; 50.8% of lines lose money.
19. **Does discounting cause lower profit?** The data show association only; other factors (product mix) may explain it.
20. **How did you validate your work?** Reconciled cleaned vs original totals, automated tests, LibreOffice recalculation of all 232 Excel formulas, link/path tests for the site.
21. **How is the site embedded and deployed?** Tableau Public view URL in an iframe configured in config.js; relative paths so it works at a GitHub Pages project subpath.
22. **Limitations?** Sample data, unknown licence/currency, correlation not causation, small data volume, single-machine timings.
23. **What would you do next?** Add forecasting, profit-driver modelling, customer-level analysis, larger data tests.
