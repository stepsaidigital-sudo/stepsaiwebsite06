import type { Metadata } from 'next';
import { PricingTemplate } from '@/components/templates/pricing';
import { getPricing } from '@/lib/content';

const page = getPricing();

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function PricingRoute() {
  return <PricingTemplate page={page} />;
}
