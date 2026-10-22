// Labels that have a real page. Everything not listed here (and not a homepage
// anchor) opens the "Design preview" notice instead of a dead link.
// Demo booking: every "Book a demo" goes to the form, which sends the request to the webhook
// (app/api/demo-request). After it is sent, the visitor can pick a time on Calendly.
export const DEMO_URL = '/book-a-demo/';
export const CALENDLY_URL = 'https://calendly.com/reshmanth-stepsai/demo';

export const builtRoutes: Record<string, string> = {
  'Book a demo': DEMO_URL,
  'Log in': 'https://app.stepsai.co/login',
  'Sign up': 'https://app.stepsai.co/signup',
  'Start free': 'https://app.stepsai.co/signup',
  'Developer docs': 'https://docs.stepsai.co',
  Blog: '/blog/',
  Features: '/features/',
  Channels: '/channels/',
  'Help centre': '/help/',
  // In-app setup actions go to sign-up, where they happen.
  'Connect HubSpot': 'https://app.stepsai.co/signup',
  'Connect Instagram': 'https://app.stepsai.co/signup',
  'Connect Messenger': 'https://app.stepsai.co/signup',
  'Connect WhatsApp': 'https://app.stepsai.co/signup',
  'Connect a phone number': 'https://app.stepsai.co/signup',
  'Connect your calendar': 'https://app.stepsai.co/signup',
  'Connect your store': 'https://app.stepsai.co/signup',
  'Create your page': 'https://app.stepsai.co/signup',
  'Get the script': 'https://app.stepsai.co/signup',
  'Request an integration': '/contact/',
  'See analytics in a demo': DEMO_URL,
  'See customer stories': '/case-studies/',
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
  'Founder’s note': '/note/',
  'Careers': '/careers/',
  'Team': '/team/',
  'Contact': '/contact/',
  'Security': '/security/',
  'Privacy policy': '/privacy-policy/',
  'Terms of service': '/terms-of-service/',
  'Customer stories': '/case-studies/',
  'All case studies': '/case-studies/',
  'View all integrations': '/integrations/',
  'Unified inbox': '/features/unified-inbox/',
  'CRM': '/features/crm/',
  'Analytics': '/features/analytics/',
  'Agent skills': '/features/skills/',
  'Workflow builder': '/features/workflow-builder/',
  'Website chatbot': '/channels/website-ai-agent/',
  'Instagram chatbot': '/channels/instagram-ai-agent/',
  'Messenger chatbot': '/channels/messenger-ai-agent/',
  'AI support agent': '/use-cases/ai-support-agent/',
  'AI lead capture agent': '/use-cases/ai-lead-capture-agent/',
  'AI booking agent': '/use-cases/ai-booking-agent/',
  'Healthcare': '/solutions/healthcare/',
  'Education': '/solutions/education/',
  'Real estate': '/solutions/real-estate/',
  'Travel and hospitality': '/solutions/travel-and-hospitality/',
  'SaaS': '/solutions/saas/',
  'Financial services': '/solutions/financial-services/',
  'View pricing': '/pricing/',
  About: '/about/',
  Industries: '/solutions/',
  'Explore solutions': '/solutions/',
  Ecommerce: '/solutions/ecommerce/',
  'WhatsApp broadcast': '/features/whatsapp-broadcasting/',
  'WhatsApp chatbot': '/channels/whatsapp-ai-agent/',
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
