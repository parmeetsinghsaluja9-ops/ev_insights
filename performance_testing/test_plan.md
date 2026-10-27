# Performance Test Plan (Tableau)

**Status of results: PENDING.** Nothing in this folder contains real Tableau timings. Every number you record must come from your own measurement. Tools here only prepare data and analyse what you enter.

## Common protocol (all tests)
- **Environment (record once):** Tableau version, OS, CPU/RAM, browser, network (Wi-Fi/Ethernet), Tableau Public or Desktop.
- **Cold vs warm:** for each run close the workbook (or use a fresh incognito tab for the published view) to measure *cold* load; record warm only if labelled so in `notes`.
- **Runs:** 3 per level (5 if variation >15%). Record each run in seconds; the analyser reports mean, median, SD, min, max.
- **Measurement methods:**
  1. *Tableau Performance Recorder* (Desktop: Help > Settings and Performance > Start Performance Recording; stop and read the dashboard of events: query, layout, rendering time) - preferred where available.
  2. *Stopwatch / screen recording* from action (open view, apply filter) until the last mark finishes rendering - works for the published Tableau Public view.
  3. *Browser DevTools Network/Performance* tab on the website for embed load (optional).
- **Do not change** anything except the independent variable. Close other heavy apps. Keep zoom, window size, and device layout identical.
- Record into `results_template.csv` (columns defined below), then run `npm run perf` to get `outputs/performance_summary.md`.

## Result columns
`test_id, factor, level, run, seconds, method, cold_or_warm, status, notes` - `status` is `PENDING` until a real number exists, then `MEASURED`.

---
## T1 - Amount of data rendered
- **Objective:** how load time changes as more rows feed the same dashboard.
- **Independent variable:** rows in the extract: 2,000 / 4,000 / 8,399 (full). Optional stress levels 25,000 / 100,000 (made by replication; *synthetic*, label clearly; not for business conclusions).
- **Controlled:** same dashboard, same filters (none applied), same extract settings, device, browser.
- **Procedure:** `npm run perf:data` creates `performance_testing/datasets/superstore_<N>.csv` (seeded random sample, reproducible). For each file: replace the data source (or build the identical workbook), refresh the extract, open dashboard cold, measure to full render. 3 runs.
- **Measurement:** method 1 or 2 above.
- **Interpretation:** compute % change vs the 2,000-row baseline. Roughly linear growth is expected to be small at this scale; a jump >50% between adjacent levels warrants investigation (e.g. a LOD or COUNTD scaling poorly).
- **Optimisation:** use extracts, aggregate extract to the needed level, hide unused fields, filter at data source.

## T2 - Utilisation of filters
- **Objective:** effect of the number of active quick filters on load and interaction time.
- **Independent variable:** 0 / 2 / 4 / 6 quick filters shown on the dashboard (Year, Region, Category, Segment, Ship Mode, Priority in that order). Variant: same 4 filters as *normal* vs *context* filters; and "Only relevant values" on vs off.
- **Controlled:** full 8,399-row data, same 9 sheets, same default selections.
- **Procedure:** (a) measure dashboard load with N filters visible. (b) measure *response time* of one scripted interaction (select Region = West, then clear) 3 times.
- **Measurement:** method 1 or 2; log `load` and `interaction` as separate `level` suffixes (e.g. `4 filters/load`).
- **Interpretation:** compare to 0-filter baseline; flag if interaction >2 s or load increases >25% per added pair of filters (rule of thumb thresholds you may adjust, state your thresholds in the report).
- **Optimisation:** fewer quick filters, use dropdown/single-value, avoid "Only relevant values", use filter actions instead, apply filters to selected sheets only.

## T3 - Number of calculated fields
- **Objective:** cost of calculated fields used by worksheets.
- **Independent variable:** 0 / 3 / 6 / 10 calculated fields in use (add in order C1..C10 from `tableau/calculated_fields.md`; includes row-level, aggregate, table-calc and one LOD).
- **Controlled:** same data, same number of sheets (9); only the fields used on them change.
- **Procedure:** build the dashboard variant, refresh, open cold, measure 3 runs. Also note which types were added at each level (row-level vs LOD vs table calc).
- **Interpretation:** compare to baseline; look for step changes after LOD (C9) or COUNTD (C4/C5) are added rather than assuming linear cost.
- **Optimisation:** materialise row-level calcs in the extract (already done for Order Year, Ship Days, Is Loss), replace string logic with numeric flags, avoid LODs on high-cardinality dimensions (Customer Name has ~795 values), limit table calcs.

## T4 - Number of visualisations
- **Objective:** effect of the number of worksheets on a dashboard.
- **Independent variable:** 1 / 3 / 6 / 9 worksheets on the dashboard.
- **Controlled:** full data, no filters, same fields types per sheet, same dashboard size.
- **Procedure:** duplicate the dashboard and remove sheets down to each level (order of removal: W13, W11, W12, W10, W8, W9 ...). Measure cold load, 3 runs.
- **Interpretation:** compare per-sheet marginal cost; a map (W9) typically costs more than a bar chart - report separately if it dominates.
- **Optimisation:** merge related views, use fewer marks, replace map with bar (W10), use Device Layouts to hide secondary sheets on phone, lazy navigation (tabs/buttons).

## Analysis & reporting
Report a table and a line/bar chart per factor, state the thresholds, name the most expensive factor *only if* the measured data supports it, and list limitations (single machine, 8,399 rows is small, network variance).
