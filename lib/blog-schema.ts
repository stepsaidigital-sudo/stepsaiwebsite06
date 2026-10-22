import type { BlogArticle } from '@/lib/blog';

// schema.org JSON-LD for a blog post, ported from landing-page-v3 (src/lib/schema.ts).
// Unvoro pre-renders BlogPosting, FAQPage and BreadcrumbList on publish; those win. Posts written
// in Studio have none, so they are built here from the post fields.

type JsonLd = Record<string, unknown>;

const site = 'https://stepsai.co';
const postUrl = (slug: string) => `${site}/blog/${slug}/`;

/** Markdown syntax carries no meaning in schema.org text fields, so drop it. */
function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\|?[\s:|-]+\|[\s:|-]*$/gm, ' ')
    .replace(/\|/g, ' ')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

type Block = { _type?: string; children?: { text?: string }[] };

/** Plain words of the body, Markdown or Portable Text. */
function bodyWords(body: BlogArticle['body']) {
  if (!body) return [];
  const text = typeof body === 'string'
    ? stripMarkdown(body)
    : (body as Block[]).filter(b => b._type === 'block').map(b => (b.children || []).map(c => c.text || '').join('')).join(' ');
  return text.split(/\s+/).filter(Boolean);
}

/** Unvoro stores each schema as a full <script type="application/ld+json"> tag, so strip the wrapper before parsing. */
function parsePrerendered(raw?: string): JsonLd | null {
  const inner = raw?.replace(/<script[^>]*>/i, '').replace(/<\/script>\s*$/i, '').trim();
  if (!inner) return null;
  try {
    const parsed = JSON.parse(inner);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function blogPosting(post: BlogArticle): JsonLd {
  const words = bodyWords(post.body);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || `Read ${post.title} on Steps AI`,
    ...(post.image && { image: { '@type': 'ImageObject', url: post.image, alt: post.imageAlt || post.title } }),
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt || post.publishedAt).toISOString(),
    author: { '@type': 'Person', name: post.author, ...(post.authorImage && { image: { '@type': 'ImageObject', url: post.authorImage } }) },
    publisher: { '@id': `${site}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(post.slug) },
    articleSection: post.topic,
    keywords: (post.keywords?.length ? post.keywords : post.categories).join(', '),
    wordCount: post.wordCount || words.length,
    articleBody: words.length > 500 ? `${words.slice(0, 500).join(' ')}...` : words.join(' '),
  };
}

function faqPage(post: BlogArticle): JsonLd | null {
  const faqs = (post.faqs || []).filter(f => f.question && f.answer);
  return faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  } : null;
}

function breadcrumbList(post: BlogArticle): JsonLd {
  const crumbs = [['Home', `${site}/`], ['Blog', `${site}/blog/`], [post.title, postUrl(post.slug)]];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  };
}

export function postSchemas(post: BlogArticle): JsonLd[] {
  return [
    parsePrerendered(post.jsonLd?.blogPosting) || blogPosting(post),
    parsePrerendered(post.jsonLd?.faqPage) || faqPage(post),
    parsePrerendered(post.jsonLd?.breadcrumbList) || breadcrumbList(post),
  ].filter((s): s is JsonLd => Boolean(s));
}

/** JSON for a <script> tag; escapes `<` so text in a post cannot close the tag early. */
export const serializeJsonLd = (data: JsonLd) => JSON.stringify(data).replace(/</g, '\\u003c');
