import type { Metadata } from 'next';
import { CallingAgentPage } from '@/components/templates/calling-agent-page';
import { getCallingAgent } from '@/lib/content';

export function generateMetadata(): Metadata {
  const page = getCallingAgent();
  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: '/channels/ai-calling-agent/' },
  };
}

export default function CallingChannelRoute() {
  return <CallingAgentPage page={getCallingAgent()} />;
}
