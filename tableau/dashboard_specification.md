# Dashboard Specification: "Superstore Sales & Profitability"

**Goal:** let a manager see overall performance, spot where profit is lost, and slice by time, geography, product, segment and ship mode.

## Size & responsiveness (required)
- Desktop layout: **Range** 1000x700 min to 1400x1000 max (or Automatic), all containers *tiled* (floating avoided).
- Create **Device Layouts**: Tablet (stack charts 2x2) and Phone (KPI row 2x2, then one chart per row; hide filters behind a collapsed Filter container or "Filters" button).
- Phone must remove W11/W13 (secondary) to keep scroll length reasonable.
- When embedded: use the Tableau Public embed code with `device="default"` so the layout switches automatically (see `assets/js/config.js`).

## Layout (desktop, top to bottom)
1. **Header** (Text object): title + subtitle "Data: Superstore sample 2009-2012, 8,399 order lines".
2. **KPI row** (horizontal container, 5 equal tiles): W1 Sales | W2 Profit | W3 Margin | W4 Orders | W5 Loss Share.
3. **Left column (filters)**: Year, Region, Category, Segment, Ship Mode, parameter Margin Target. Collapsible.
4. **Row A:** W6 Trend (wide, ~60%) | W7 Category Profit (~40%).
5. **Row B:** W9 Region Map (50%) | W8 SubCategory Profit (50%).
6. **Row C:** W12 Discount Band | W11 Ship Mode | W13 Segment.
7. **Footer:** data source, definitions note, "Last refreshed" text.

## Interactivity / actions
| Action | Source | Target | Behaviour |
|---|---|---|---|
| Filter (select) | W7 Category Profit | W6, W8, W9, W11, W12, W13 | Click bar to filter dashboard; clear on deselect: *Show all values* |
| Filter (select) | W9 Region Map / W10 | W6, W7, W8, W11, W12 | Region/Province drill |
| Highlight | W8 SubCategory | All | Hover |
| Tooltip viz (optional) | W8 | - | Tooltip shows sales/profit/margin |

## Design rules
Colour: blue = positive/neutral, red = losses only (colour-blind safe palette: Tableau "Blue-Orange Diverging" if preferred). Consistent number formats. Titles state the question each chart answers. Alt text for accessibility on dashboard objects.

## Insights the dashboard must surface (verified)
Margin 10.2% overall; Furniture margin 2.3%; Tables and Bookcases lose money; Delivery Truck margin 4.3% vs Regular Air 14.7%; 50.8% of lines are loss-making.
