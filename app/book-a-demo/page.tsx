import type { Metadata } from 'next';
import { BookDemoTemplate } from '@/components/templates/book-demo';

export const metadata: Metadata = {
  title: 'Book a demo | Steps AI',
  description: 'See Steps AI answer questions from your own website, store and channels. Book a demo with our team.',
};

export default function BookDemoRoute() {
  return <BookDemoTemplate />;
}
