import type { Metadata } from 'next';
import { ContentTemplate } from '@/components/templates/content';
import { getPage } from '@/lib/content';

const page = getPage('not-found');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

// Unknown URLs keep the site header, footer and a way back.
export default function NotFound() {
  return <ContentTemplate page={page} />;
}
