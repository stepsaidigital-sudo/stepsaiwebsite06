import type { Metadata } from 'next';
import { ChannelsHub } from '@/components/templates/channels-hub';
import { getHub } from '@/lib/content';

const page = getHub('channels');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function ChannelsRoute() {
  return <ChannelsHub page={page} />;
}
