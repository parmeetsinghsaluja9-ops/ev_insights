# Tableau Publishing & Embedding Checklist (MANUAL - needs you)

Status: **NOT PUBLISHED.** No Tableau workbook has been created by the automated build.

1. Install Tableau Public Desktop (free) and create a Tableau Public account.
2. Connect to `data/processed/superstore_clean.csv`; set data types per `workbook_specification.md`.
3. Create calculated fields and parameters per `calculated_fields.md`.
4. Build sheets W1-W14, the dashboard (with Device Layouts), and the 6-point story.
5. Take screenshots for the report (dashboard desktop/phone, each story point).
6. File > Save to Tableau Public As... (dashboard and story in the same workbook).
7. On the published page click **Share** and copy: (a) the page URL, (b) the **Embed code** -> pull out the `name`/path value (e.g. `Superstore_123/Dashboard`).
8. Open `assets/js/config.js` and replace the two placeholder URLs, set `published: true`.
9. Run `npm run build`, commit, push; verify embeds on the live GitHub Pages URL in a private window.
10. Tableau Public workbooks are public by default; confirm no sensitive data is in the extract.
11. Record verified links in `PROJECT_CONTEXT.md` ("Verified published links").
