import type { Metadata } from 'next';
import { LegalPage } from '@/components/templates/legal-page';
import document from '@/content/legal/privacy-policy.json';
import { getPage } from '@/lib/content';

const page = getPage('privacy-policy');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function PrivacyPolicyRoute() {
  return <LegalPage document={document} />;
}
