import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  BrandCaseStudyDetail,
  CaseStudyClean,
} from '@/components/templates/case-studies-clean';
import {
  getBrandDataBySlug,
  listAllCaseStudySlugs,
  brandInspireMap,
} from '@/components/templates/story-inspire';
import { getCaseStudiesHub, getCaseStudy } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandDataBySlug(slug);
  if (brand) {
    return {
      title: `${brand.brand} Case Study: ${brand.headline} | Steps AI`,
      description: brand.challenge,
    };
  }
  const page = getCaseStudy(slug);
  return page ? { title: page.seo.title, description: page.seo.description } : {};
}

export default async function CaseStudyRoute({ params }: Props) {
  const { slug } = await params;

  // AI Receptionist voice demo view
  if (slug === 'ai-receptionist') {
    const page = getCaseStudy(slug);
    if (!page) notFound();
    return <CaseStudyClean page={page} agents={getCaseStudiesHub().agents} />;
  }

  // Dedicated Brand Case Study View (Zoko-inspired in-depth layout)
  const brand = getBrandDataBySlug(slug);
  if (brand) {
    const related = Object.values(brandInspireMap).filter(
      (b) => b.brand !== brand.brand
    );
    return <BrandCaseStudyDetail story={brand} relatedStories={related.slice(0, 3)} />;
  }

  const page = getCaseStudy(slug);
  if (!page) notFound();
  return <CaseStudyClean page={page} agents={getCaseStudiesHub().agents} />;
}
