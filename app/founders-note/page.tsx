import type { Metadata } from 'next';
import { ContentTemplate } from '@/components/templates/content';
import { getPage } from '@/lib/content';

const page = getPage('founders-note');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function FoundersNoteRoute() {
  return <ContentTemplate page={page} />;
}
