# Calculated Fields (Tableau)

Data source: `data/processed/superstore_clean.csv`. Tableau shows CSV headers with spaces/Title Case (e.g. `product_sub_category` -> **Product Sub Category**). If yours differ, adjust names. Type column marks the kind (used by performance test T3: add fields in the order listed).

| # | Name | Type | Formula |
|---|---|---|---|
| C1 | Profit Margin | Aggregate | `SUM([Profit]) / SUM([Sales])` |
| C2 | Profitability Flag | Row-level | `IF [Profit] < 0 THEN "Loss" ELSE "Profit" END` |
| C3 | Discount Band | Row-level | `IF [Discount]=0 THEN "0%" ELSEIF [Discount]<=0.03 THEN "1-3%" ELSEIF [Discount]<=0.06 THEN "4-6%" ELSEIF [Discount]<=0.10 THEN "7-10%" ELSE ">10%" END` |
| C4 | Distinct Orders | Aggregate | `COUNTD([Order ID])` |
| C5 | Avg Order Value | Aggregate | `SUM([Sales]) / COUNTD([Order ID])` |
| C6 | Loss Line Share | Aggregate | `SUM(IF [Profit] < 0 THEN 1 ELSE 0 END) / COUNT([Row ID])` |
| C7 | Total Loss | Aggregate | `SUM(IF [Profit] < 0 THEN [Profit] END)` |
| C8 | Sales YoY % | Table calc | `(ZN(SUM([Sales])) - LOOKUP(ZN(SUM([Sales])),-1)) / ABS(LOOKUP(ZN(SUM([Sales])),-1))` (compute using Order Year) |
| C9 | Customer Total Sales | LOD | `{ FIXED [Customer Name] : SUM([Sales]) }` |
| C10 | Margin vs Target | Aggregate | `[Profit Margin] - [Margin Target]` |
| C11 | Selected Metric | Aggregate | `CASE [Metric Selector] WHEN "Sales" THEN SUM([Sales]) WHEN "Profit" THEN SUM([Profit]) WHEN "Orders" THEN COUNTD([Order ID]) END` |
| C12 | Avg Ship Days | Aggregate | `AVG([Ship Days])` |

## Parameters
- **Margin Target** (Float, default `0.10`, range 0 to 0.3, step 0.01) - 10% is roughly the observed overall margin (10.2%), used as a neutral reference, not a business target.
- **Metric Selector** (String list: Sales, Profit, Orders; default Sales).

## Notes
- Derived columns `Order Year`, `Ship Days`, `Is Loss` already exist in the cleaned CSV; C2 is kept as a calculated field for the "calculated field" requirement and for T3.
- Verified expected values (from `outputs/analysis.json`): overall Profit Margin 10.2%, Distinct Orders 5,496, Loss Line Share 50.8%, Total Loss -1,102,503.
