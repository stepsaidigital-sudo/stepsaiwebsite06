import type { MetadataRoute } from 'next';
import { helpLessons } from '@/components/templates/help-data';
import { listPosts } from '@/lib/blog';
import { listChannels, listCompares, listFeatures, listIndustries, listIntegrations, listUseCases } from '@/lib/content';
import companyCases from '@/content/company-use-cases.json';

const site = 'https://stepsai.co';

// Pages marked "In sitemap.xml at launch: Yes" on the SEO URL map that exist on the site.
// Held and unpublished pages are left out; add new pages here when they are built.
const pages = [
  '/channels/ai-calling-agent/',
  '/', '/pricing/', '/book-a-demo/', '/about/', '/careers/', '/team/', '/note/', '/contact/', '/security/',
  '/partners/', '/partners/meta/', '/affiliate-program/', '/hire-an-agency/', '/privacy-policy/', '/terms-of-service/',
  '/features/', '/channels/', '/solutions/', '/case-studies/', '/compare/', '/integrations/', '/help/', '/help/faqs/', '/blog/',
];

// Blog posts come from Sanity, so new posts join the sitemap without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts().catch(() => []);
  const paths = [
    ...pages,
    ...companyCases.map(company => `/case-studies/${company.slug}/`),
    ...listFeatures().map(s => `/features/${s}/`),
    ...listChannels().map(s => `/channels/${s}/`),
    ...listIndustries().map(s => `/solutions/${s}/`),
    ...listUseCases().map(s => `/use-cases/${s}/`),
    ...listCompares().map(s => `/compare/steps-ai-vs-${s}/`),
    ...listIntegrations().map(s => `/integrations/${s}/`),
    ...helpLessons.map(l => `/help/${l.slug}/`),
    ...posts.map(p => `/blog/${p.slug}/`),
  ];
  return [...new Set(paths)].map(path => ({ url: site + path }));
}
