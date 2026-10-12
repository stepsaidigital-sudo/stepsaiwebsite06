// How pages connect. Every subpage shows "Works well with" cards from this
// graph, so a reader on one page can always reach the closely related ones:
// a channel, the features that run on it, the integrations that power it, the
// agents that use it and the industries that need it.
import type { RelatedLink } from '@/components/v2/sections';

const N: Record<string, RelatedLink> = {
  // Features
  broadcast: { label: 'WhatsApp broadcast', href: '/features/whatsapp-broadcast/', body: 'Send approved WhatsApp campaigns your agent follows up.', logo: 'whatsapp' },
  inbox: { label: 'Unified inbox', href: '/features/unified-inbox/', body: 'Every conversation from every channel in one place.' },
  crm: { label: 'CRM', href: '/features/crm/', body: 'Customers, tickets and live requests from every chat.' },
  analytics: { label: 'Analytics', href: '/features/analytics/', body: 'See what customers ask and when they message.' },
  skills: { label: 'Agent skills', href: '/features/skills/', body: 'Bookings, tickets, leads and handoff with plain-English rules.' },
  workflows: { label: 'Workflow builder', href: '/features/workflow-builder/', body: 'Cart recovery, COD confirmation and follow-ups without code.', logo: 'webhook' },
  // Channels
  whatsapp: { label: 'WhatsApp chatbot', href: '/channels/whatsapp-chatbot/', body: 'Answer customers on WhatsApp, day and night.', logo: 'whatsapp' },
  instagram: { label: 'Instagram chatbot', href: '/channels/instagram-chatbot/', body: 'Reply to DMs and turn comments into conversations.', logo: 'instagram' },
  messenger: { label: 'Messenger chatbot', href: '/channels/messenger-chatbot/', body: 'Answer customers who message your Facebook page.', logo: 'messenger' },
  website: { label: 'Website chatbot', href: '/channels/website-chatbot/', body: 'A chat widget that answers every visitor.' },
  chatpage: { label: 'Chat page', href: '/channels/chat-page/', body: 'A branded agent page you can share. No website needed.', logo: 'steps' },
  // Agents
  sales: { label: 'AI sales agent', href: '/use-cases/ai-sales-agent/', body: 'Recommend products and share checkout in the chat.' },
  support: { label: 'AI support agent', href: '/use-cases/ai-support-agent/', body: 'Answer order and policy questions, hand over cleanly.' },
  leads: { label: 'AI lead capture agent', href: '/use-cases/ai-lead-capture-agent/', body: 'Collect lead details while visitors are talking.' },
  booking: { label: 'AI booking agent', href: '/use-cases/ai-booking-agent/', body: 'Book appointments from the chat into your calendar.' },
  marketing: { label: 'AI marketing agent', href: '/use-cases/ai-marketing-agent/', body: 'Campaigns and comment-to-DM, with every reply answered.' },
  receptionist: { label: 'AI receptionist', href: '/use-cases/ai-receptionist/', body: 'Answer phone calls in English, Hindi and Telugu.' },
  // Industries
  ecommerce: { label: 'Ecommerce', href: '/industries/ecommerce/', body: 'Help shoppers choose, buy and track orders.' },
  healthcare: { label: 'Healthcare', href: '/industries/healthcare/', body: 'Answer patients and fill your appointment book.' },
  education: { label: 'Education', href: '/industries/education/', body: 'Turn course enquiries into admissions.' },
  realestate: { label: 'Real estate', href: '/industries/real-estate/', body: 'Qualify buyers and book site visits.' },
  travel: { label: 'Travel and hospitality', href: '/industries/travel-and-hospitality/', body: 'Answer guests before they book elsewhere.' },
  saas: { label: 'SaaS', href: '/industries/saas/', body: 'Answer product questions and book more demos.' },
  finance: { label: 'Financial services', href: '/industries/financial-services/', body: 'Answer enquiries without giving advice.' },
  // Integrations
  shopify: { label: 'Shopify', href: '/integrations/shopify/', body: 'Orders, stock, discounts and checkout in the chat.', logo: 'shopify' },
  woocommerce: { label: 'WooCommerce', href: '/integrations/woocommerce/', body: 'Your catalogue, stock and order status.', logo: 'woocommerce' },
  shiprocket: { label: 'Shiprocket', href: '/integrations/shiprocket/', body: 'Live delivery status in the chat.', logo: 'shiprocket' },
  delhivery: { label: 'Delhivery', href: '/integrations/delhivery/', body: 'Delivery status answered in the chat.', logo: 'delhivery' },
  dtdc: { label: 'DTDC', href: '/integrations/dtdc/', body: 'Parcel status without waiting for your team.', logo: 'dtdc' },
  ithink: { label: 'iThink Logistics', href: '/integrations/ithink-logistics/', body: 'Shipment status on every channel.', logo: 'ithink-logistics' },
  wareiq: { label: 'WareIQ', href: '/integrations/wareiq/', body: 'Status for orders fulfilled through WareIQ.', logo: 'wareiq' },
  gcal: { label: 'Google Calendar', href: '/integrations/google-calendar/', body: 'Book appointments from the conversation.', logo: 'google-calendar' },
  calendly: { label: 'Calendly', href: '/integrations/calendly/', body: 'Book customers into your Calendly.', logo: 'calendly' },
  outlookcal: { label: 'Outlook Calendar', href: '/integrations/outlook-calendar/', body: 'Bookings in the calendar your team uses.', logo: 'outlook-calendar' },
  calcom: { label: 'Cal.com', href: '/integrations/cal-com/', body: 'Bookings from WhatsApp, Instagram and web.', logo: 'cal-com' },
  square: { label: 'Square Appointments', href: '/integrations/square-appointments/', body: 'Bookings for salons and studios.', logo: 'square-appointments' },
  sheets: { label: 'Google Sheets', href: '/integrations/google-sheets/', body: 'Answer from a sheet and sync orders from it.', logo: 'google-sheets' },
  drive: { label: 'Google Drive', href: '/integrations/google-drive/', body: 'Policies and guides become answers.', logo: 'google-drive' },
  notion: { label: 'Notion', href: '/integrations/notion/', body: 'Help articles and notes become answers.', logo: 'notion' },
  airtable: { label: 'Airtable', href: '/integrations/airtable/', body: 'Answer from your tables and lists.', logo: 'airtable' },
  hubspot: { label: 'HubSpot', href: '/integrations/hubspot/', body: 'Leads from the chat saved to HubSpot.', logo: 'hubspot' },
  zendesk: { label: 'Zendesk', href: '/integrations/zendesk/', body: 'Tickets for what the agent cannot solve.', logo: 'zendesk' },
  slack: { label: 'Slack', href: '/integrations/slack/', body: 'Alerts for handoffs, leads and orders.', logo: 'slack' },
  outlook: { label: 'Outlook', href: '/integrations/outlook/', body: 'Keep your team informed by email.', logo: 'outlook' },
  klaviyo: { label: 'Klaviyo', href: '/integrations/klaviyo/', body: 'Bring chat customers into your marketing.', logo: 'klaviyo' },
  integrations: { label: 'All integrations', href: '/integrations/', body: 'See every app Steps AI connects with.' },
  pricing: { label: 'Pricing', href: '/pricing/', body: 'Plans, credits and what each plan includes.' },
  stories: { label: 'Customer stories', href: '/case-studies/', body: 'How businesses use Steps AI, in their own words.' },
};

// Most relevant first. Each page shows the first few that exist.
const G: Record<string, string[]> = {
  broadcast: ['whatsapp', 'marketing', 'shopify', 'workflows', 'inbox', 'crm'],
  inbox: ['crm', 'skills', 'support', 'whatsapp', 'analytics', 'zendesk'],
  crm: ['inbox', 'hubspot', 'leads', 'analytics', 'skills'],
  analytics: ['inbox', 'crm', 'broadcast', 'website'],
  skills: ['booking', 'workflows', 'gcal', 'zendesk', 'hubspot', 'inbox'],
  workflows: ['shopify', 'broadcast', 'whatsapp', 'skills', 'woocommerce'],
  whatsapp: ['broadcast', 'shopify', 'workflows', 'sales', 'support', 'instagram'],
  instagram: ['marketing', 'whatsapp', 'messenger', 'sales', 'inbox'],
  messenger: ['instagram', 'whatsapp', 'inbox', 'support'],
  website: ['chatpage', 'shopify', 'woocommerce', 'leads', 'sales', 'analytics'],
  chatpage: ['website', 'instagram', 'leads', 'whatsapp'],
  sales: ['shopify', 'whatsapp', 'woocommerce', 'ecommerce', 'workflows', 'crm'],
  support: ['inbox', 'shiprocket', 'zendesk', 'shopify', 'skills', 'ecommerce'],
  leads: ['crm', 'hubspot', 'website', 'booking', 'saas'],
  booking: ['gcal', 'calendly', 'skills', 'healthcare', 'receptionist', 'outlookcal'],
  marketing: ['broadcast', 'instagram', 'workflows', 'shopify', 'klaviyo'],
  receptionist: ['booking', 'healthcare', 'gcal', 'inbox', 'support'],
  ecommerce: ['sales', 'shopify', 'broadcast', 'support', 'shiprocket', 'woocommerce'],
  healthcare: ['receptionist', 'booking', 'gcal', 'whatsapp'],
  education: ['leads', 'booking', 'broadcast', 'sheets', 'drive'],
  realestate: ['leads', 'booking', 'airtable', 'sheets', 'hubspot'],
  travel: ['whatsapp', 'leads', 'broadcast', 'drive'],
  saas: ['leads', 'support', 'hubspot', 'zendesk', 'notion', 'website'],
  finance: ['leads', 'booking', 'receptionist', 'hubspot'],
  shopify: ['whatsapp', 'broadcast', 'workflows', 'sales', 'ecommerce', 'shiprocket'],
  woocommerce: ['website', 'sales', 'whatsapp', 'workflows', 'ecommerce'],
  shiprocket: ['support', 'shopify', 'whatsapp', 'delhivery', 'ecommerce'],
  delhivery: ['support', 'shopify', 'whatsapp', 'shiprocket'],
  dtdc: ['support', 'shopify', 'whatsapp', 'shiprocket'],
  ithink: ['support', 'shopify', 'whatsapp', 'shiprocket'],
  wareiq: ['support', 'shopify', 'whatsapp', 'shiprocket'],
  gcal: ['booking', 'skills', 'receptionist', 'calendly', 'healthcare'],
  calendly: ['booking', 'skills', 'gcal', 'leads'],
  outlookcal: ['booking', 'skills', 'gcal', 'outlook'],
  calcom: ['booking', 'skills', 'gcal'],
  square: ['booking', 'skills', 'gcal'],
  sheets: ['education', 'realestate', 'website', 'drive'],
  drive: ['website', 'support', 'notion', 'sheets'],
  notion: ['support', 'saas', 'drive'],
  airtable: ['realestate', 'sheets', 'drive'],
  hubspot: ['leads', 'crm', 'saas', 'skills'],
  zendesk: ['support', 'inbox', 'skills', 'saas'],
  slack: ['inbox', 'workflows', 'skills'],
  outlook: ['inbox', 'workflows', 'outlookcal'],
  klaviyo: ['marketing', 'broadcast', 'shopify'],
};

const keyOf = (href: string) => Object.keys(N).find(k => N[k].href === href);

/** Related pages for a page path, most relevant first. */
export function relatedFor(href: string, count = 3): RelatedLink[] {
  const key = keyOf(href);
  return (key && G[key] ? G[key] : ['integrations', 'stories', 'pricing']).slice(0, count).map(k => N[k]);
}

/** Look up any node, e.g. to link an integration from a feature page. */
export const linkTo = (key: keyof typeof N) => N[key];
export const integrationLink = (slug: string) => Object.values(N).find(n => n.href === `/integrations/${slug}/`);
