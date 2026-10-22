import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogBody } from '@/components/templates/blog-body';
import { BlogPostTemplate } from '@/components/templates/blog-post';
import { getPost, listPosts, relatedPosts } from '@/lib/blog';
import { postSchemas, serializeJsonLd } from '@/lib/blog-schema';

type Props = { params: Promise<{ slug: string }> };

// Posts published after the build render on first visit, then are cached like the rest.
export const revalidate = 60;

export async function generateStaticParams() {
  return (await listPosts()).map(p => ({ slug: p.slug }));
}

const slugOf = async (params: Props['params']) => decodeURIComponent((await params).slug);

// Unvoro fills `seo` on publish; posts written in Studio leave it empty and fall back to the post.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(await slugOf(params));
  if (!post) return {};
  const seo = post.seo || {};
  const description = seo.metaDescription || post.excerpt;
  const image = seo.openGraph?.image || post.image;
  return {
    title: seo.metaTitle || `${post.title} | Steps AI`,
    description,
    keywords: [...new Set([...post.categories, ...(post.keywords || []), ...(seo.focusKeyword ? [seo.focusKeyword] : [])])],
    alternates: { canonical: seo.canonicalUrl || `https://stepsai.co/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: seo.openGraph?.title || post.title,
      description: seo.openGraph?.description || description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.categories,
      images: image ? [image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitter?.title || post.title,
      description: seo.twitter?.description || description,
      images: image ? [image] : [],
    },
  };
}

export default async function BlogPostRoute({ params }: Props) {
  const [post, posts] = await Promise.all([getPost(await slugOf(params)), listPosts()]);
  if (!post) notFound();
  const faqs = (post.faqs || []).flatMap(f => f.question && f.answer ? [{ q: f.question, a: f.answer }] : []);
  return <>
    {postSchemas(post).map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />)}
    <BlogPostTemplate post={post} imageAlt={post.imageAlt} body={<BlogBody body={post.body} />} faqs={faqs} related={relatedPosts(posts, post)} />
  </>;
}
