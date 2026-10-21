import type { Metadata } from 'next';
import { CaseStudiesHubClean } from '@/components/templates/case-studies-clean';
import { getCaseStudiesHub, getCaseStudy } from '@/lib/content';

const page = getCaseStudiesHub();
const stories = page.agents.flatMap(a => {
  const cs = getCaseStudy(a.slug);
  return (cs?.stories ?? []).map(story => ({ slug: a.slug, agent: a.label, story }));
});

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function CaseStudiesRoute() {
  return <CaseStudiesHubClean page={page} stories={stories} />;
}

