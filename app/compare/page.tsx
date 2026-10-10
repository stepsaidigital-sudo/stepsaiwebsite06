import type { Metadata } from 'next';
import { HubTemplate } from '@/components/templates/hub';
import { getHub } from '@/lib/content';

const page = getHub('compare');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function CompareRoute() {
  return <HubTemplate page={page} />;
}
