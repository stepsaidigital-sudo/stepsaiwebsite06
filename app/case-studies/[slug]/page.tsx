import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyTemplate } from '@/components/templates/case-study';
import { getCaseStudiesHub, getCaseStudy, listCaseStudies } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listCaseStudies().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getCaseStudy((await params).slug);
  return page ? { title: page.seo.title, description: page.seo.description } : {};
}

export default async function CaseStudyRoute({ params }: Props) {
  const page = getCaseStudy((await params).slug);
  if (!page) notFound();
  return <CaseStudyTemplate page={page} agents={getCaseStudiesHub().agents} />;
}
