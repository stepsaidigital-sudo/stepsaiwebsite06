import type { Metadata } from 'next';
import { PartnerDetailPage } from '@/components/templates/partner-detail-page';
import { getPage } from '@/lib/content';

const page = getPage('hire-an-agency');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function HireAnAgencyRoute() {
  return <PartnerDetailPage page={page} kind="agency" />;
}
