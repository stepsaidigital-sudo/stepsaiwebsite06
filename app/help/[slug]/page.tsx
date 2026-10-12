import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HelpArticleTemplate } from '@/components/templates/help';
import { helpLessons } from '@/components/templates/help-data';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return helpLessons.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = helpLessons.find(x => x.slug === slug);
  return a ? { title: `${a.title} | Steps AI Help`, description: a.summary } : {};
}

export default async function HelpArticleRoute({ params }: Props) {
  const slug = (await params).slug;
  if (!helpLessons.some(a => a.slug === slug)) notFound();
  return <HelpArticleTemplate slug={slug} />;
}
