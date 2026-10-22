import type { Metadata } from 'next';
import { BlogHubTemplate } from '@/components/templates/blog-hub';
import { blogConfigured, listPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Chatbot, WhatsApp and support guides | Steps AI',
  description: 'Practical guides on AI agents, WhatsApp, Instagram, ecommerce support and choosing the right tools, from the Steps AI team.',
};

export const revalidate = 60;

export default async function BlogRoute() {
  return <BlogHubTemplate posts={await listPosts()} unavailable={!blogConfigured} />;
}
