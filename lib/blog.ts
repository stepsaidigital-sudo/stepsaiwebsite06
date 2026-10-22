import { client } from '@/sanity/lib/client';

// Blog posts from Sanity (project and dataset in sanity/env.ts), newest first. Posts are written in
// /studio or published by Unvoro straight to the dataset; `slug` is the URL: /blog/<slug>/.
// Fetches are cached by Next for REVALIDATE seconds, so a published post shows up within a minute.

export const REVALIDATE = 60;

export type BlogPost = { id: string; slug: string; title: string; excerpt: string; image: string; author: string; date: string; topic: string };

export type BlogArticle = BlogPost & {
  publishedAt: string;
  updatedAt?: string;
  imageAlt?: string;
  authorImage?: string;
  categories: string[];
  /** Portable Text for posts authored in Studio, Markdown string for posts published by Unvoro. */
  body: unknown[] | string | null;
  wordCount?: number;
  keywords?: string[];
  faqs?: { question?: string; answer?: string }[];
  jsonLd?: { blogPosting?: string; faqPage?: string; breadcrumbList?: string };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    focusKeyword?: string;
    openGraph?: { title?: string; description?: string; image?: string };
    twitter?: { title?: string; description?: string };
  };
};

// Fields every card needs. Unvoro hosts some hero images elsewhere and sets mainImage.url instead of an asset.
const CARD = `"id": _id, "slug": slug.current, title, "excerpt": coalesce(excerpt, ""), publishedAt,
  "image": coalesce(mainImage.asset->url, mainImage.url, ""),
  "author": coalesce(author->name, "Steps AI Team"),
  "topic": coalesce(categories[0]->title, "Guides")`;

const LIST = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${CARD} }`;

const ONE = `*[_type == "post" && slug.current == $slug][0] { ${CARD},
  "updatedAt": _updatedAt, "imageAlt": mainImage.alt, "authorImage": author->image.asset->url,
  "categories": coalesce(categories[]->title, []),
  "body": coalesce(body[]{ ..., _type == "image" => { ..., asset-> { _id, url } } }, body),
  wordCount, keywords, faqs[]{ question, answer }, jsonLd, seo
}`;

const cache = { next: { revalidate: REVALIDATE, tags: ['post'] } };

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '';

const withDate = <T extends { publishedAt?: string }>(p: T) => ({ ...p, date: formatDate(p.publishedAt) });

export async function listPosts(): Promise<BlogPost[]> {
  const rows = await client.fetch<(Omit<BlogPost, 'date'> & { publishedAt?: string })[]>(LIST, {}, cache);
  return rows.map(withDate);
}

export async function getPost(slug: string): Promise<BlogArticle | null> {
  const row = await client.fetch<Omit<BlogArticle, 'date'> | null>(ONE, { slug }, cache);
  return row && withDate(row);
}

/** Up to `count` other posts, same topic first, then the newest of the rest. */
export function relatedPosts(posts: BlogPost[], post: BlogPost, count = 3) {
  const others = posts.filter(p => p.id !== post.id);
  return [...others.filter(p => p.topic === post.topic), ...others.filter(p => p.topic !== post.topic)].slice(0, count);
}
