// Labels that have a real page. Everything not listed here (and not a homepage
// anchor) opens the "Design preview" notice instead of a dead link.
export const builtRoutes: Record<string, string> = {};

// Homepage sections that nav and footer labels point at.
export const homeAnchors: Record<string, string> = {
  Product: '#product',
  Solutions: '#solutions',
  Resources: '#stories',
  Features: '#product',
  Channels: '#top',
  Integrations: '#integrations',
  Industries: '#solutions',
  'Use cases': '#solutions',
  'Customer stories': '#stories',
};

// A built page wins over a homepage anchor. Anchors are prefixed with "/"
// off the homepage so they lead back to the right section.
export function resolveLabel(label: string, onHome: boolean): { href?: string } {
  if (builtRoutes[label]) return { href: builtRoutes[label] };
  const anchor = homeAnchors[label];
  if (anchor) return { href: onHome ? anchor : `/${anchor}` };
  return {};
}
