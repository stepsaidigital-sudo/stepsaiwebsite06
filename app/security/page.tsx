import type { Metadata } from 'next';
import { ContentTemplate } from '@/components/templates/content';
import { getPage } from '@/lib/content';

const page = getPage('security');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function SecurityRoute() {
  return <ContentTemplate page={page} />;
}
