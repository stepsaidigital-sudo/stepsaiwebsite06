import type { Metadata } from 'next';
import { FeaturesHub } from '@/components/templates/features-hub';
import { getHub } from '@/lib/content';

const page = getHub('features');

export const metadata: Metadata = { title: page.seo.title, description: page.seo.description };

export default function FeaturesRoute() {
  return <FeaturesHub page={page} />;
}
