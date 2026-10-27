# Tableau Story Specification: "Where does Superstore make and lose money?"

**Number of story points: 6.** Each story point = one sheet or dashboard with a caption. Navigator: numbers. All figures below come from `outputs/analysis.json` (real data, unit amounts as supplied).

| # | Caption | Visual | Narrative | Key numbers |
|---|---|---|---|---|
| 1 | The big picture: healthy margin, flat sales | Trend by Year (W6, yearly) + KPI tiles | Sales 14.9M, profit 1.52M, margin 10.2%. Sales fell from 4.21M (2009) to 3.44M (2011), partly recovering to 3.72M in 2012, while margin dipped to 9.2% in 2012. | 2009 10.3%, 2010 10.3%, 2011 11.1%, 2012 9.2% |
| 2 | Furniture sells a lot but earns little | Category bars (W7) | Furniture is 34.7% of sales but ~7.7% of profit; Technology and Office Supplies earn 14.8% and 13.8% margins. | Furniture 2.3% margin |
| 3 | A few sub-categories lose money | Sub-category profit (W8) | Tables (-99K), Bookcases (-34K), Scissors/Rulers (-8K), Rubber Bands (-0.1K) have negative profit; Storage & Organization has 1.07M sales but only 0.6% margin. | Binders 30.0% margin is the best |
| 4 | How an order ships matters | Ship Mode (W11) | Delivery Truck carries 41.7% of sales at 4.3% margin vs Regular Air 14.7%. (Large items such as furniture ship by truck: a likely confounder, test before acting.) | Truck 6.22M sales, 270K profit |
| 5 | Higher discounts coincide with thinner margins | Discount Band (W12) | 0-3% discount lines earn 12.6-13.6% margin; 4-10% bands ~8%. This is an association, not proof of cause. | >10% has only 5 lines |
| 6 | Regions and recommendations | Region map/bar (W9/W10) + text | West is the largest region (3.60M) at 8.3% margin; Nunavut has 2.4% margin on tiny volume. Recommendations: (1) review pricing/cost of Tables, Bookcases and truck-shipped furniture; (2) cap discounts above 3% unless justified; (3) investigate West and Yukon margins; (4) protect high-margin Binders, Labels, Envelopes, Telephones. | West 8.3%, Yukon 7.6% |

**Presentation tip:** start each caption with the takeaway sentence; keep captions under ~25 words in Tableau (longer text above stays on the website).
