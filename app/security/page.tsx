import type { Metadata } from 'next';
import { CompanyTemplate } from '@/components/templates/company-page';
import { getPage } from '@/lib/content';

const page = getPage('security');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function SecurityRoute() {
  return <CompanyTemplate slug="security" page={page} />;
}
