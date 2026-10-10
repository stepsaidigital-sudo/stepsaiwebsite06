// Labels that have a real page. Everything not listed here (and not a homepage
// anchor) opens the "Design preview" notice instead of a dead link.
export const builtRoutes: Record<string, string> = {
  Pricing: '/pricing/',
  Integrations: '/integrations/',
  'Case studies': '/case-studies/',
  'Partner with us': '/partners/',
  'Partner program': '/partners/',
  'Partners': '/partners/',
  'Become an affiliate': '/affiliate-program/',
  'Affiliate program': '/affiliate-program/',
  'Hire an agency': '/hire-an-agency/',
  'Compare': '/compare/',
  'vs. Manychat': '/compare/steps-ai-vs-manychat/',
  'vs. Wati': '/compare/steps-ai-vs-wati/',
  'vs. AiSensy': '/compare/steps-ai-vs-aisensy/',
  'vs. Gorgias': '/compare/steps-ai-vs-gorgias/',
  'vs. Chatbase': '/compare/steps-ai-vs-chatbase/',
  'vs. Verifast': '/compare/steps-ai-vs-verifast/',
  'vs. Tidio': '/compare/steps-ai-vs-tidio/',
  'Founder’s note': '/founders-note/',
  'Careers': '/careers/',
  'Team': '/team/',
  'Contact': '/contact/',
  'Security': '/security/',
  'Privacy policy': '/privacy-policy/',
  'Terms of service': '/terms-of-service/',
  'Customer stories': '/case-studies/',
  'All case studies': '/case-studies/',
  'AI sales agent case studies': '/case-studies/ai-sales-agent/',
  'AI support agent case studies': '/case-studies/ai-support-agent/',
  'AI marketing agent case studies': '/case-studies/ai-marketing-agent/',
  'AI receptionist case studies': '/case-studies/ai-receptionist/',
  'AI booking agent case studies': '/case-studies/ai-booking-agent/',
  'AI lead capture agent case studies': '/case-studies/ai-lead-capture-agent/',
  'View all integrations': '/integrations/',
  'Unified inbox': '/features/unified-inbox/',
  'CRM': '/features/crm/',
  'Analytics': '/features/analytics/',
  'Agent skills': '/features/skills/',
  'Workflow builder': '/features/workflow-builder/',
  'Website chatbot': '/channels/website-chatbot/',
  'Instagram chatbot': '/channels/instagram-chatbot/',
  'Messenger chatbot': '/channels/messenger-chatbot/',
  'Chat page': '/channels/chat-page/',
  'AI support agent': '/use-cases/ai-support-agent/',
  'AI lead capture agent': '/use-cases/ai-lead-capture-agent/',
  'AI booking agent': '/use-cases/ai-booking-agent/',
  'AI receptionist': '/use-cases/ai-receptionist/',
  'AI marketing agent': '/use-cases/ai-marketing-agent/',
  'Healthcare': '/industries/healthcare/',
  'Education': '/industries/education/',
  'Real estate': '/industries/real-estate/',
  'Travel and hospitality': '/industries/travel-and-hospitality/',
  'SaaS': '/industries/saas/',
  'Financial services': '/industries/financial-services/',
  'View pricing': '/pricing/',
  About: '/about/',
  Industries: '/industries/',
  'Explore solutions': '/industries/',
  Ecommerce: '/industries/ecommerce/',
  'WhatsApp broadcast': '/features/whatsapp-broadcast/',
  'WhatsApp chatbot': '/channels/whatsapp-chatbot/',
  'AI sales agent': '/use-cases/ai-sales-agent/',
};

// Homepage sections that nav and footer labels point at.
export const homeAnchors: Record<string, string> = {
  Product: '#product',
  Solutions: '#solutions',
  Resources: '#stories',
  Features: '#product',
  Channels: '#top',
  Integrations: '#integrations',
  Industries: '#solutions',
  'Use cases': '#solutions',
  'Customer stories': '#stories',
};

// A built page wins over a homepage anchor. Anchors are prefixed with "/"
// off the homepage so they lead back to the right section.
export function resolveLabel(label: string, onHome: boolean): { href?: string } {
  if (builtRoutes[label]) return { href: builtRoutes[label] };
  const anchor = homeAnchors[label];
  if (anchor) return { href: onHome ? anchor : `/${anchor}` };
  return {};
}
