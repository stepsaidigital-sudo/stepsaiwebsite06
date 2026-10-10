import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IntegrationTemplate } from '@/components/templates/integration';
import { getIntegration, getIntegrationsHub, listIntegrations } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listIntegrations().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getIntegration((await params).slug);
  return page ? { title: page.seo.title, description: page.seo.description } : {};
}

export default async function IntegrationRoute({ params }: Props) {
  const page = getIntegration((await params).slug);
  if (!page) notFound();
  // Siblings in the same category first, topped up with the flagship apps.
  const apps = getIntegrationsHub().apps.filter(app => app.slug !== page.slug);
  const same = apps.filter(app => app.category === page.category);
  const related = [...same, ...apps.filter(app => !same.includes(app))].slice(0, Math.max(3, same.length));
  return <IntegrationTemplate page={page} related={related} />;
}
