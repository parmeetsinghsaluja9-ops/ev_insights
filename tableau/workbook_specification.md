# Tableau Workbook Specification

**Workbook name:** `Superstore_Sales_Profitability.twbx` (Tableau Public: save to Public, packaged workbook not needed; use *Save to Tableau Public*).
**Connection:** Text file -> `data/processed/superstore_clean.csv` (extract; Tableau Public requires extracts).
**Set data types:** Order Date/Ship Date = Date; Province = Geographic Role *State/Province* (country: Canada); Row ID/Order ID = Dimension (string) to avoid summing.

## Worksheets (build in this order)
| ID | Sheet name | Chart | Columns | Rows | Marks / Notes |
|---|---|---|---|---|---|
| W1 | KPI Sales | Text (BAN) | - | - | `SUM(Sales)`, format `#,##0` |
| W2 | KPI Profit | Text (BAN) | - | - | `SUM(Profit)`; colour red if < 0 |
| W3 | KPI Margin | Text (BAN) | - | - | `Profit Margin` (C1), format 0.0% |
| W4 | KPI Orders | Text (BAN) | - | - | `Distinct Orders` (C4) |
| W5 | KPI Loss Share | Text (BAN) | - | - | `Loss Line Share` (C6), format 0.0% |
| W6 | Trend | Dual-axis line | `MONTH(Order Date)` continuous | `SUM(Sales)`, `SUM(Profit)` | Synchronise axes off; Profit as bars optional. Add Year filter. |
| W7 | Category Profit | Bar | `SUM(Profit)` | `Product Category` | Colour = `Profit Margin` diverging (red-neg to blue-pos). Sort desc. |
| W8 | SubCategory Profit | Bar | `SUM(Profit)` | `Product Sub Category` | Colour = sign of Profit; shows Tables/Bookcases negative. |
| W9 | Region Map | Filled map | `Province` (Geographic) | - | Colour `Profit Margin`; tooltip Sales, Profit. Check "unknown" locations indicator. |
| W10 | Region Bar | Bar | `Profit Margin` | `Region` | Reference line at `Margin Target`. Backup for map. |
| W11 | Ship Mode | Bar | `SUM(Sales)`, `Profit Margin` | `Ship Mode` | Dual measure or two panes. |
| W12 | Discount Band | Bar | `Profit Margin` | `Discount Band` (C3) | Sort by band order (manual). Note >10% has 5 rows only. |
| W13 | Segment | Bar | `SUM(Sales)` | `Customer Segment` | Colour = `Profit Margin`. |
| W14 | Top/Bottom Products | Bar | `SUM(Profit)` | `Product Name` | Top-N filter by field (10 worst); used in story scene 3. |

## Required KPIs (definitions)
See `calculated_fields.md` C1, C4-C7. All KPIs use **order lines** unless stated.

## Filters
Order Year (multi-value list, all), Region, Product Category, Customer Segment, Ship Mode. Apply "Show Filter" and "Apply to Worksheets > Selected Worksheets" so KPI sheets respond. Use *Only relevant values* sparingly (it adds query cost; see performance plan T2).

## Optimisation (apply before publishing)
Use extract; hide unused fields (customer_name only if not used, product_base_margin, shipping_cost if unused); avoid >10 sheets visible at once on one dashboard; prefer fixed dashboard size ranges; avoid unneeded Top-N and COUNTD on large dimensions.
