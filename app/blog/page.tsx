import type { Metadata } from 'next';
import { BlogHubTemplate } from '@/components/templates/blog-hub';
import blog from '@/content/hubs/blog.json';

export const metadata: Metadata = {
  title: 'Blog: chatbots, WhatsApp and customer support guides | Steps AI',
  description: 'Practical guides on AI agents, WhatsApp, Instagram, ecommerce support and choosing the right tools, from the Steps AI team.',
};

export default function BlogRoute() {
  return <BlogHubTemplate posts={blog.posts} />;
}
