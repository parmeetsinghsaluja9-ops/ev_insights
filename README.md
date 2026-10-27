# Superstore Sales & Profitability - Tableau Vocational Project

Static website + data tooling + Tableau specifications for a Tableau dashboard, story and performance-testing project.
**Status:** data, Excel, site, tests, docs: done. **Tableau workbook, Tableau Public publishing and performance measurements: NOT done (manual).** See `PROJECT_CONTEXT.md`.

## Quick start
```bash
npm install
npm run all        # clean data -> analysis -> Excel -> site data -> tests
npm run serve      # http://localhost:8080/
```
Requires Node.js 20+ (built on 22). No Python is used.

## Scripts
| Command | Purpose |
|---|---|
| `npm run clean` | `data/original` -> `data/processed/superstore_clean.csv` + quality report |
| `npm run analyze` | writes `outputs/analysis.json` (all figures used downstream) |
| `npm run excel` | builds `excel/tableau_analysis.xlsx` |
| `npm run build` | generates `assets/js/data.js` for the site |
| `npm test` | 17 automated tests |
| `npm run perf:data` / `npm run perf` | T1 data subsets / summarise your measured results |

## Deploy to GitHub Pages (project site)
1. Create a GitHub repo and push this folder as the repo root (`git init && git add . && git commit -m "init" && git remote add origin <url> && git push -u origin main`).
2. Repo > Settings > Pages > Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`.
3. Wait ~1 minute: `https://<user>.github.io/<repo>/`. All paths are relative, so the subpath works. `.nojekyll` is included.
4. After publishing in Tableau Public, edit `assets/js/config.js`, commit and push.

## Layout
`index.html`, `assets/` (css, js), `data/` (original untouched, processed), `excel/`, `scripts/`, `tableau/` (specs), `performance_testing/`, `tests/`, `documentation/`, `outputs/`.

## Honesty notes
- The site's bar charts are quick previews, not Tableau visualisations.
- Embeds stay as "not published yet" notices until real Tableau Public URLs are configured.
- Performance results are PENDING; no timings were invented.
- Dataset: `curran/data` superstoreSales.csv (licence not stated in the repo).
