import type { Metadata } from 'next';
import { CompanyShowcase } from '@/components/templates/company-showcase';

export const metadata: Metadata = {
  title: 'Companies using Steps AI',
  description: 'Explore illustrative customer-conversation use cases for companies using Steps AI.',
};

export default function CaseStudiesRoute() {
  return <CompanyShowcase />;
}

