import type { Metadata } from 'next';
import { CompanyTemplate } from '@/components/templates/company-page';
import { getPage } from '@/lib/content';

const page = getPage('privacy-policy');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function PrivacyPolicyRoute() {
  return <CompanyTemplate slug="privacy-policy" page={page} />;
}
