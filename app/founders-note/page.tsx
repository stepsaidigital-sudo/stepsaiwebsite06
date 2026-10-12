import type { Metadata } from 'next';
import { CompanyTemplate } from '@/components/templates/company-page';
import { getPage } from '@/lib/content';

const page = getPage('founders-note');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function FoundersNoteRoute() {
  return <CompanyTemplate slug="founders-note" page={page} />;
}
