import type { Metadata } from 'next';
import { PartnerDetailPage } from '@/components/templates/partner-detail-page';
import { getPage } from '@/lib/content';

const page = getPage('affiliate-program');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function AffiliateProgramRoute() {
  return <PartnerDetailPage page={page} kind="affiliate" />;
}
