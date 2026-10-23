import type { NextConfig } from "next";

// Old stepsai.co URLs that move or go away at launch (SEO URL map, "301 redirects" tab).
// Each goes straight to its final URL in one hop, with and without the trailing slash.
const moved: [from: string, to: string][] = [
  ["/use-cases/ai-calling-agent", "/channels/ai-calling-agent/"],
  ["/why-stepsai/security", "/security/"],
  ["/product/analytics-insights", "/features/analytics/"],
  ["/channels/website", "/channels/website-ai-agent/"],
  ["/interfaces/chat-widget", "/channels/website-ai-agent/"],
  ["/channels/standalone-page", "/channels/website-ai-agent/"],
  ["/interfaces/standalone-page", "/channels/website-ai-agent/"],
  ["/interfaces/ai-popup", "/channels/website-ai-agent/"],
  ["/websites/conversation-interface-layer", "/channels/website-ai-agent/"],
  ["/channels/whatsapp", "/channels/whatsapp-ai-agent/"],
  ["/channels/instagram", "/channels/instagram-ai-agent/"],
  ["/use-cases", "/solutions/"],
  ["/use-cases/sales", "/use-cases/ai-sales-agent/"],
  ["/use-cases/support-cx", "/use-cases/ai-support-agent/"],
  ["/use-cases/operations", "/use-cases/ai-support-agent/"],
  ["/features/lead-capture", "/use-cases/ai-lead-capture-agent/"],
  ["/use-cases/marketing-growth", "/use-cases/ai-lead-capture-agent/"],
  ["/resources/case-studies", "/case-studies/"],
  ["/resources/ai-guides", "/blog/"],
  ["/product/ai-agents", "/"],
  ["/product/copilot", "/"],
];

const nextConfig: NextConfig = {
  // Match the SEO sitemap, where every page URL ends in a slash.
  trailingSlash: true,
  // Next's own slash redirect runs before custom redirects, which would send /channels/whatsapp
  // through /channels/whatsapp/ first (two hops). proxy.ts adds the slash instead, after these run.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return moved.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `${from}/`, destination: to, permanent: true },
    ]);
  },
};

export default nextConfig;
