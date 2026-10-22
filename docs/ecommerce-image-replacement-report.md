# E-commerce images — 22 October 2026

Route: `/solutions/ecommerce/`. Existing layout, styles, copy and interactions retained. Changes are confined to image references and matching alt descriptions.

## Slot decisions

| Section | Image | Decision |
|---|---|---|
| Hero | `images/cta-tiles/fashion-boutique.webp` | Reuse face-free apparel context |
| Sales agent | `images/industries/ecommerce/evening-online-shopping.webp` | Show product selection on a shopping screen |
| Support agent | `images/industries/ecommerce/order-support-desk.webp` | Headset, order tracking and parcel communicate support without a support person's face |
| Marketing agent | `images/cta-tiles/product-campaign-studio.webp` | Reuse product campaign shoot |
| Lead capture agent | `images/industries/ecommerce/wholesale-enquiry.webp` | Buyer entering a wholesale enquiry beside product samples |
| Capability demonstration | `images/capabilities/linen-commerce.webp` | Retain existing matching face-free shirt image; provenance not independently established in this pass |
| Store connection story | `images/cta-tiles/ecommerce-order-packing.webp` | Reuse packing activity |
| Sale-days story | `images/industries/ecommerce/evening-online-shopping.webp` | Reuse sales image for the same after-hours shopping activity |

The four agent cards now show different tasks, not interchangeable industry objects. Three new generations total; no speculative variants. Existing homepage sources remain documented in `homepage-generated-images.json`.

## New generation briefs

Built-in `image_gen` used for all three. These are brief summaries; original generation prompts are in the task conversation.

1. **Evening online shopping:** realistic 4:3 editorial photograph, centered laptop showing an unbranded shirt catalogue on a walnut table at night, warm lamp and cool blue window, cropped hands on trackpad, kraft parcel. No heads, faces, logos or readable text. Keep key objects central for the existing crop. Source `exec-3bb114ce-75ff-4a49-8224-8ef9d31192f6.png`; export 1200 × 900 WebP.
2. **Order support desk:** realistic 4:3 photograph, prominent customer-service headset, laptop with anonymous parcel progress and chat bubbles, open parcel with folded blue shirt. Sage background and natural daylight. No people, hands, faces, readable personal data or logos. Source `exec-da7e4e78-40d9-4f2a-8f77-0b8999a675cb.png`; export 960 × 720 WebP.
3. **Wholesale enquiry:** realistic 4:3 overhead three-quarter photograph of hands using a tablet beside linen samples and a product catalogue. Tablet form headed “Wholesale enquiry”, blank Name/Business email/Quantity fields and “Send enquiry” button. No faces, personal data, branding or office scene. Export 960 × 720 WebP.

Generated originals are retained under the task's Codex generated-images directory. Public exports use descriptive names, without upscaling. Existing `asset()` and content asset-host mapping remain in place; S3 keys are `website/public/` plus the paths above. No S3 upload or deployment performed.

## Checks

Desktop 1280 × 720 and mobile 390 × 844 image loading and sizes checked. Existing centered object-cover crops retained. Screenshots in `qa-ecommerce-images/`. TypeScript and whitespace checks passed before the final image-path-only card correction; final paths and WebP dimensions checked after export. Production build not run for these asset-only changes.
