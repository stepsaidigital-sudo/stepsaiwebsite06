import type { Metadata } from 'next';
import { IntegrationsHubTemplate } from '@/components/templates/integrations-hub';
import { getIntegrationsHub } from '@/lib/content';

const page = getIntegrationsHub();

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function IntegrationsRoute() {
  return <IntegrationsHubTemplate page={page} />;
}
