import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import cases from '@/content/company-use-cases.json';
import { CompanyUseCase } from '@/components/templates/company-use-case';

export const dynamicParams = false;
export function generateStaticParams() { return cases.map(company => ({ slug: company.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = cases.find(item => item.slug === slug);
  if (!company) return {};
  const title = `${company.name}: ${company.title} | Steps AI`;
  const description = `Explore an illustrative ${company.industry.toLowerCase()} conversation for ${company.name}. ${company.challenge} See the proposed workflow and team handoff.`;
  return { title, description, alternates: { canonical: `/case-studies/${company.slug}/` }, openGraph: { title, description, type: 'article' }, robots: company.researched ? undefined : { index: false, follow: true } };
}
export default async function CompanyCaseRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = cases.find(item => item.slug === slug);
  if (!company) notFound();
  return <CompanyUseCase company={company} />;
}
