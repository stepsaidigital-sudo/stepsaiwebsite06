import type { Metadata } from 'next';
import { CaseStudiesHubTemplate } from '@/components/templates/case-study';
import { getCaseStudiesHub, getCaseStudy } from '@/lib/content';

const page = getCaseStudiesHub();
const stories = page.agents.flatMap(a => getCaseStudy(a.slug)!.stories.map(story => ({ slug: a.slug, agent: a.label, story })));

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function CaseStudiesRoute() {
  return <CaseStudiesHubTemplate page={page} stories={stories} />;
}
