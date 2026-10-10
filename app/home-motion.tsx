'use client';
import { useSiteMotion } from '@/components/site/motion';

// The homepage keeps its own pinned tours and ScrollPolish reveal. This adds
// the shared extras only where they do not overlap with those.
const AUTO = '.faq-section > div:first-child, .faq-list > details, .integrations-intro, .logo-ribbons, .final-section .container > *';
const SPOTS = '.rv-card, .bci-card, .bci-story';

export function HomeMotion() {
  useSiteMotion({ auto: AUTO, spots: SPOTS });
  return <div className="m-progress" aria-hidden="true" />;
}
