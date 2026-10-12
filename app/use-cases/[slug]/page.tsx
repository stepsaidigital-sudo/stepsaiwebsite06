import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AgentPageTemplate } from '@/components/templates/agent-page';
import { premiumAgentPages } from '@/components/templates/premium-pages';
import { UseCaseTemplate } from '@/components/templates/usecase';
import { getUseCase, listUseCases } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listUseCases().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getUseCase((await params).slug);
  return page ? { title: page.seo.title, description: page.seo.description } : {};
}

export default async function UseCaseRoute({ params }: Props) {
  const page = getUseCase((await params).slug);
  if (!page) notFound();
  return premiumAgentPages.includes(page.slug) ? <AgentPageTemplate page={page} /> : <UseCaseTemplate page={page} />;
}
