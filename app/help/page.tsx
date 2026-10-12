import type { Metadata } from 'next';
import { HelpHubTemplate } from '@/components/templates/help-hub';

export const metadata: Metadata = {
  title: 'Help centre | Steps AI',
  description: 'Step-by-step guides for setting up your Steps AI agent, website widget, WhatsApp, Instagram, Messenger and integrations.',
};

export default function HelpRoute() {
  return <HelpHubTemplate />;
}
