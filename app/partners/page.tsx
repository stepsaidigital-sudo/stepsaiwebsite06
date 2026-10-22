import type { Metadata } from 'next';
import { PartnersPage } from '@/components/templates/partners-page';
import { getPage } from '@/lib/content';

const page = getPage('partners');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function PartnersRoute() {
  return <PartnersPage page={page} />;
}
