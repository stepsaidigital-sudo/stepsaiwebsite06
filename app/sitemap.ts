import type { MetadataRoute } from 'next';
import { helpLessons } from '@/components/templates/help-data';
import { listPosts } from '@/lib/blog';
import { listChannels, listCompares, listFeatures, listIndustries, listIntegrations, listUseCases } from '@/lib/content';

const site = 'https://stepsai.co';

// Pages marked "In sitemap.xml at launch: Yes" on the SEO URL map that exist on the site.
// Held and unpublished pages are left out; add new pages here when they are built.
const pages = [
  '/', '/pricing/', '/book-a-demo/', '/about/', '/careers/', '/team/', '/note/', '/contact/', '/security/',
  '/partners/', '/affiliate-program/', '/hire-an-agency/', '/privacy-policy/', '/terms-of-service/',
  '/features/', '/channels/', '/solutions/', '/case-studies/', '/compare/', '/integrations/', '/help/', '/help/faqs/', '/blog/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...pages,
    ...listFeatures().map(s => `/features/${s}/`),
    ...listChannels().map(s => `/channels/${s}/`),
    ...listIndustries().map(s => `/solutions/${s}/`),
    ...listUseCases().map(s => `/use-cases/${s}/`),
    ...listCompares().map(s => `/compare/steps-ai-vs-${s}/`),
    ...listIntegrations().map(s => `/integrations/${s}/`),
    ...helpLessons.map(l => `/help/${l.slug}/`),
    ...listPosts().map(p => `/blog/${p.slug}/`),
  ];
  return [...new Set(paths)].map(path => ({ url: site + path }));
}
