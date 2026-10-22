# Shopify integration page — research and design notes

Reviewed 22 October 2026. Scope: marketing UI, not a backend integration audit.

## Primary sources

- [Shopify: Create and update a cart](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage) documents cart line items and a checkout URL. The visual story distinguishes choosing in chat from payment on Shopify checkout.
- [Shopify: Installing and setting up apps](https://help.shopify.com/en/manual/apps/install-setup-apps) documents reviewing requested access before installation and reviewing permissions afterwards. It does not verify Steps AI's exact install flow.
- [Shopify: API access scopes](https://shopify.dev/docs/api/usage/access-scopes) documents that permissions control data reads and writes. Platform support is not evidence of which scopes Steps AI has implemented.
- [Shopify: Webhooks](https://shopify.dev/docs/apps/build/webhooks) describes near-real-time event notifications and synchronization. This does not establish instant synchronization or delivery guarantees for Steps AI.

## Content evidence and boundaries

The existing content/integrations/shopify.json is marked draft, pending specialist copy. Its descriptions of attribution, discount synchronization, workflows, channel coverage and stock filtering remain product-authored draft claims, not independently verified by Shopify documentation. No new revenue numbers, customer testimonials, install-count claims, badges or Shopify endorsement claims were introduced.

The page uses this existing content for capabilities, workflows, setup and FAQs. The hero's checkout language is clarified to match the existing FAQ: payment happens on Shopify checkout. All conversation data and product details are labelled illustrative. No live customer or order data is used.

## Design decisions

- Shopify-specific template; other integration routes retain their current template.
- Dedicated photographic hero with an illustrative order lookup overlay.
- Customer story before setup: product recommendation, stock, offer, then checkout.
- Explicit step controls and next/restart buttons; no surprise automatic step changes.
- Capabilities organized into readable rows; workflows have a sticky introduction on desktop.
- Setup uses the actual three existing content steps rather than a generic connection mockup.
- Persistent site navigation, existing demo action, FAQ and CTA components retained.
- Navy/pastel blue brand palette; Shopify green appears in the existing logo and semantic status indicators only.
- New image is a face-free WebP, referenced through the asset URL helper for future S3 hosting.
