import type { Metadata } from 'next';
import { ContentTemplate } from '@/components/templates/content';
import { getPage } from '@/lib/content';

const page = getPage('terms-of-service');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function TermsOfServiceRoute() {
  return <ContentTemplate page={page} />;
}
