import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChannelPageTemplate } from '@/components/templates/channel-page';
import { getChannel, listChannels } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listChannels().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getChannel((await params).slug);
  return page ? { title: page.seo.title, description: page.seo.description } : {};
}

export default async function ChannelRoute({ params }: Props) {
  const page = getChannel((await params).slug);
  if (!page) notFound();
  return <ChannelPageTemplate page={page} />;
}
