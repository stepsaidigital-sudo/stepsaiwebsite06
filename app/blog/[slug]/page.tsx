import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostTemplate } from '@/components/templates/blog-post';
import { getPost, listPosts, relatedPosts } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: `${post.title} | Steps AI`, description: post.excerpt, openGraph: { images: post.image ? [post.image] : [] } } : {};
}

export default async function BlogPostRoute({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return <BlogPostTemplate post={post} related={relatedPosts(post)} />;
}
