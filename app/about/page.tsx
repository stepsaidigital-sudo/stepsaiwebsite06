import type { Metadata } from 'next';
import { CompanyTemplate } from '@/components/templates/company-page';
import { getPage } from '@/lib/content';

const page = getPage('about');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function AboutRoute() {
  return <CompanyTemplate slug="about" page={page} />;
}
