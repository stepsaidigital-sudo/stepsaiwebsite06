import type { Metadata } from 'next';
import { MetaPartnerPage } from '@/components/templates/meta-partner-page';

export const metadata: Metadata = {
  title: 'Meta Business Partner | Steps AI',
  description: 'Connect WhatsApp, Instagram and Messenger with Steps AI. Explore AI replies, shared conversations and human handoff for your business.',
};

export default function MetaPartnerRoute() {
  return <MetaPartnerPage />;
}
