import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HelpArticleTemplate } from '@/components/templates/help';
import help from '@/content/help/articles.json';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return help.lessons.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = help.lessons.find(x => x.slug === slug);
  return a ? { title: `${a.title} | Steps AI Help`, description: a.summary } : {};
}

export default async function HelpArticleRoute({ params }: Props) {
  const slug = (await params).slug;
  if (!help.lessons.some(a => a.slug === slug)) notFound();
  return <HelpArticleTemplate slug={slug} />;
}
