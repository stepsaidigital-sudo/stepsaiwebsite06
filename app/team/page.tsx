import type { Metadata } from 'next';
import { CompanyTemplate } from '@/components/templates/company-page';
import { getPage } from '@/lib/content';

const page = getPage('team');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function TeamRoute() {
  return <CompanyTemplate slug="team" page={page} />;
}
