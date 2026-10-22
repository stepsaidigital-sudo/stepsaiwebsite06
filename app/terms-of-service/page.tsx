import type { Metadata } from 'next';
import { LegalPage } from '@/components/templates/legal-page';
import document from '@/content/legal/terms-of-service.json';
import { getPage } from '@/lib/content';

const page = getPage('terms-of-service');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function TermsOfServiceRoute() {
  return <LegalPage document={document} />;
}
