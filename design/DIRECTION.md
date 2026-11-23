# Everyday design contract

Surface: usable discount calculator, with formula and examples. User job: learn a final sale price and savings. Primary action: Calculate savings. Hierarchy: identity → short heading → input/result workspace → example → explanation → questions. Local reference: WEBSITE_PLAN.md, especially browser-local calculations, explicit submission, visible results, and mobile-first use.

Direction: calm stationery and shopping receipt. Warm ivory canvas, forest green typography, terracotta emphasis, pale sage receipt. Georgia offers a distinctive editorial heading without downloading fonts; system sans-serif keeps form labels readable. Receipt separator, barcode motif and numbered math steps give the tool its own identity. No external assets or network dependencies.

Viewports: 390x844 and 1440x900. Desktop: paired input and receipt. Mobile: single column, inputs before receipt. Visible focus, labelled controls, 200% zoom-friendly layout, keyboard submit, result live region, reduced-motion support.

States: empty on first visit/reset, success after valid submission, field-specific error after invalid submission. Previous valid values stay visible on error with a corrective message. Loading, partial, and permission states do not apply: synchronous local calculation, complete results, no accounts or remote requests. No analytics is installed in this design preview.
