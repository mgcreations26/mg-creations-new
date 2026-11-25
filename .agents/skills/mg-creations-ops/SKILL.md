---
name: mg-creations-ops
description: Operate and maintain MG Creations product catalog, inventory, pricing, Etsy and website listings, orders, and supporting spreadsheets. Use for MG Creations work only.
---

# MG Creations Operations

## Brand boundary
MG Creations is the crafts, personalized-products, and print-on-demand brand. Keep it distinct from Craftee Mama, Gear N Grid, and QueerGear Supply. Apply `../SHARED_BRAND_RULES.md` when available; otherwise follow the same principles.

## Core responsibilities
1. Product catalog and design-library maintenance.
2. Inventory, product identifiers, SKU, and cost auditing.
3. Etsy and website pricing review.
4. Listing preparation and publishing workflow.
5. Order-management workflow support.
6. Google Sheets formula, reference, and data-quality auditing.

## Required workflow
1. Confirm the target project, workbook, sheet, range, website, or listing.
2. Begin with a read-only audit. Identify dependencies, formulas, source-of-truth fields, and risks.
3. Report findings in plain language, separating verified facts from assumptions.
4. Propose the smallest safe change and explain why it is needed.
5. Wait for approval before material edits, deletions, publishing, or deployment.
6. Make only the approved change.
7. Verify the result and report exactly what changed and what remains.

## Catalog and identifiers
- Never invent product facts, variants, dimensions, materials, production times, stock counts, or costs.
- Preserve all existing SKUs, product codes, listing IDs, and identifiers unless the owner separately approves a change.
- Flag duplicate, missing, conflicting, or malformed identifiers; do not silently normalize them.
- Maintain traceability between design, product, variant, channel listing, and order.

## Pricing and channel rules
- Keep Etsy and website pricing/channel workflows distinct.
- Show the inputs to every price: base product cost, print or customization cost, shipping treatment, marketplace/payment fees, packaging, taxes where relevant, and target margin.
- Label estimates clearly. Do not present a suggested price as an approved/live price.
- Use the workbook's explicitly designated source of truth. Do not replace authoritative formulas with legacy calculations without approval.
- For the Product & Inventory Control Center, the currently approved architecture identifies **Pricing Review column L** as the authoritative recommended Etsy price. **Design Library column J** contains connected Etsy price formulas; J47 and J48 were previously corrected and are to remain protected.
- The approved repair sequence is: preserve Pricing Engine A:J; repair POD Profit Calculator references; clean up orphaned Design Library formulas; verify replacements; only then retire Pricing Engine T:Y. Do not change this sequence without approval.
- Treat Pricing Engine T:Y as legacy/outdated pending completion of the approved verification. Do not delete or retire it prematurely.
- Never change SKUs or product codes as part of formula cleanup.

## Listings
Use the owner's requested Etsy listing structure when asked:
- Title up to 140 characters.
- 13 tags.
- Description of approximately 150–250 words.
- Three concise product highlights/bullets.
- Top five keywords.
- Pricing note.
Use a friendly, handcrafted tone. Confirm unsupported details rather than filling gaps.

## Spreadsheet safety
- Map formulas and dependencies before editing.
- Preserve protected cells and working formulas.
- Check for external references, named ranges, hidden sheets, array formulas, and downstream consumers before retiring a range or sheet.
- Keep a before/after record of changed formulas and cells.
- Verify representative rows and edge cases after changes.
- Never claim a workbook audit is complete if relevant sheets or dependencies were not inspected.

## Orders and customer data
- Do not invent order status or promise fulfillment dates.
- Protect customer names, addresses, emails, and order details.
- Draft customer-facing messages for owner review unless explicitly authorized to send.
