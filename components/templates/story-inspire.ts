import { asset } from '@/lib/asset';
export type BrandInspireData = {
  brand: string;
  brandSlug: string;
  headline: string;
  industry: string;
  agentLabel: string;
  agentSlug: string;
  metricBig: string;
  metricLabel: string;
  stats: Array<{ value: string; label: string }>;
  about: string;
  location: string;
  teamSize: string;
  website: string;
  challenge: string;
  solution: string;
  channels: string[];
  resultsList: string[];
  quote: string;
  personName: string;
  personRole: string;
  avatar: string;
  photo: string;
  fullSlug: string;
};

export const brandInspireMap: Record<string, BrandInspireData> = {
  'Mysa Living': {
    brand: 'Mysa Living',
    brandSlug: 'mysa-living',
    headline: 'Scaling conversion by answering pre-purchase shopper questions 24/7',
    industry: 'Ecommerce · Furniture & Decor',
    agentLabel: 'AI Sales Agent',
    agentSlug: 'ai-sales-agent',
    metricBig: '+70%',
    metricLabel: 'Live chat sales conversion lift',
    stats: [
      { value: '+70%', label: 'Sales conversion lift' },
      { value: '< 10s', label: 'Instant product advisory' },
      { value: '4.8 / 5', label: 'Shopper rating' }
    ],
    about:
      'Mysa Living is a premium direct-to-consumer furniture and home decor brand blending Scandinavian minimalism with functional craft. Founded to bring designer-grade hardwood tables, lounge seating, and custom lighting into modern homes, the brand serves tens of thousands of shoppers across North America and Europe.',
    location: 'Stockholm, Sweden & Chicago, IL',
    teamSize: '15–50 employees',
    website: 'https://mysaliving.com',
    challenge:
      'Shoppers had high-intent questions about wood finishes, dimensions, and room sizing before making high-ticket furniture purchases. Waiting for business hours led to abandoned carts.',
    solution:
      'Steps AI Sales Agent was trained on Mysa Living’s catalog, dimension specs, and assembly guidelines to guide shoppers through finish selection, dimension checks, and immediate checkout links.',
    channels: ['Website Live Chat', 'Shopify Checkout', 'Instagram DMs'],
    resultsList: [
      '+70% increase in live chat checkout conversion rate',
      '< 10s instant product advisory and dimension checks 24/7',
      'Zero abandoned carts from unanswered evening sizing questions',
      'Smooth context handoff to human interior consultants for custom projects'
    ],
    quote:
      'Shoppers who talk to the sales agent are noticeably more likely to finish checkout. It answers the questions that used to make people hesitate, especially around dimensions and materials.',
    personName: 'Anika Rao',
    personRole: 'Head of Digital Experience, Mysa Living',
    avatar: '',
    photo: asset('/images/case-studies/mysa-living.jpg'),
    fullSlug: 'ai-sales-agent'
  },
  'Aster & Row': {
    brand: 'Aster & Row',
    brandSlug: 'aster-and-row',
    headline: 'Deflecting sizing & fit queries with a personal digital concierge',
    industry: 'Ecommerce · Luxury Apparel',
    agentLabel: 'AI Sales Agent',
    agentSlug: 'ai-sales-agent',
    metricBig: '65%',
    metricLabel: 'Cart sizing query deflection',
    stats: [
      { value: '65%', label: 'Query deflection' },
      { value: '3.2x', label: 'Faster checkout flow' },
      { value: '24 / 7', label: 'Concierge availability' }
    ],
    about:
      'Aster & Row is an independent luxury womenswear and bespoke tailoring label celebrated for sustainable cashmere, structured silk suits, and timeless silhouettes. With an emphasis on precision tailoring, their clientele spans discerning fashion buyers worldwide.',
    location: 'London, UK',
    teamSize: '6–15 employees',
    website: 'https://asterandrow.com',
    challenge:
      'High return rates and hesitation around premium garment sizing required round-the-clock consultation that human stylists could not handle during peak sales spikes.',
    solution:
      'Integrated Steps AI as a brand concierge that compares measurements, suggests fit adjustments, and smoothly transfers VIP styling requests to human consultants with full context.',
    channels: ['Web Widget', 'WhatsApp Luxury Concierge'],
    resultsList: [
      '65% deflection of repetitive sizing and garment care inquiries',
      '3.2x faster checkout flow on high-value orders',
      '24/7 luxury digital concierge availability across WhatsApp and Web',
      'VIP handoff directly into personal styling consultations'
    ],
    quote:
      'We treat it like a digital concierge. It knows our entire catalogue, handles size queries smoothly, and hands over to our human stylists whenever a customer wants a personal styling session.',
    personName: 'Priya Shah',
    personRole: 'VP of E-Commerce, Aster & Row',
    avatar: '',
    photo: asset('/images/case-studies/aster-and-row.jpg'),
    fullSlug: 'ai-sales-agent'
  },
  'North & Pine': {
    brand: 'North & Pine',
    brandSlug: 'north-and-pine',
    headline: 'Eliminating tier-1 order status tickets with autonomous tracking',
    industry: 'Ecommerce · Outdoor Gear',
    agentLabel: 'AI Support Agent',
    agentSlug: 'ai-support-agent',
    metricBig: '80%',
    metricLabel: 'Automated order support resolution',
    stats: [
      { value: '80%', label: 'Automated resolution' },
      { value: '< 15s', label: 'Median response speed' },
      { value: '88%', label: 'First contact completion' }
    ],
    about:
      'North & Pine creates weather-tested outdoor apparel, all-weather jackets, and durable trail gear designed for extreme climates and backcountry adventures. Their loyal community depends on reliable logistics and gear reliability.',
    location: 'Seattle, WA',
    teamSize: '20–60 employees',
    website: 'https://northandpinegear.com',
    challenge:
      'Support specialists spent 60%+ of their working hours looking up courier tracking numbers, delivery windows, and shipment progress across multiple logistics providers.',
    solution:
      'Connected Steps AI Support Agent directly to shipping APIs and courier webhooks to authenticate orders and provide live real-time status updates instantly.',
    channels: ['Website Help Widget', 'Automated Email Replies', 'SMS Alerts'],
    resultsList: [
      '80% automated resolution on tier-1 order status and courier queries',
      '< 15s median response time across Web, Email, and SMS',
      '88% first-contact completion without support agent intervention',
      '60+ hours of support specialist time saved every week'
    ],
    quote:
      'The order-status questions have almost disappeared from our support queue. We still get the odd one, but it’s nowhere near what it used to be.',
    personName: 'Maya Patel',
    personRole: 'Head of E-commerce, North & Pine',
    avatar: '',
    photo: asset('/images/case-studies/north-and-pine.jpg'),
    fullSlug: 'ai-support-agent'
  },
  'Nivara': {
    brand: 'Nivara',
    brandSlug: 'nivara',
    headline: 'Resolving half of daily support tickets before they reach human staff',
    industry: 'Ecommerce · Sustainable Lifestyle',
    agentLabel: 'AI Support Agent',
    agentSlug: 'ai-support-agent',
    metricBig: '75%',
    metricLabel: 'Fewer repeat tickets in support queue',
    stats: [
      { value: '75%', label: 'Repeat ticket reduction' },
      { value: '4.9 / 5', label: 'CSAT satisfaction score' },
      { value: '100%', label: 'Coverage on sizing & returns' }
    ],
    about:
      'Nivara is an artisanal lifestyle and sustainable home textile brand collaborating with regional weaver collectives to create hand-loomed linens, organic cotton apparel, and curated homewares.',
    location: 'Mumbai, India & San Francisco, CA',
    teamSize: '10–30 employees',
    website: 'https://nivaralife.com',
    challenge:
      'A flood of repetitive inquiries regarding restocking schedules, fabric care instructions, and return approvals overwhelmed the team and created long response queues.',
    solution:
      'Steps AI automated the entire return initiation and catalog FAQ process, verifying customer eligibility and generating return labels autonomously.',
    channels: ['Web Chat', 'WhatsApp Business', 'Helpdesk Integration'],
    resultsList: [
      '75% fewer repeat tickets in support queue around restocks and returns',
      '4.9 / 5 CSAT satisfaction score across 12,000+ customer interactions',
      '100% automated coverage for sizing guidelines and return approvals',
      'Support team repurposed towards proactive VIP account care'
    ],
    quote:
      'Size, stock, shipping, and returns were probably half of our daily messages. StepsAI handles most of those conversations now, and support has a lot more time for the customers who actually need help.',
    personName: 'Arjun Mehta',
    personRole: 'E-commerce Manager, Nivara',
    avatar: '',
    photo: asset('/images/case-studies/nivara.jpg'),
    fullSlug: 'ai-support-agent'
  },
  'Casa Noma': {
    brand: 'Casa Noma',
    brandSlug: 'casa-noma',
    headline: 'Eliminating the Monday morning WhatsApp support backlog',
    industry: 'Ecommerce · Home & Textiles',
    agentLabel: 'AI Support Agent',
    agentSlug: 'ai-support-agent',
    metricBig: '85%',
    metricLabel: 'Weekend WhatsApp queries resolved',
    stats: [
      { value: '85%', label: 'Weekend auto-resolution' },
      { value: '0 hrs', label: 'Monday backlog delay' },
      { value: '< 30s', label: 'WhatsApp response time' }
    ],
    about:
      'Casa Noma curates architectural ceramics, terracotta planters, and handcrafted kitchen wares imported directly from Mediterranean artisan workshops, providing timeless interior pieces for residential spaces.',
    location: 'Barcelona, Spain & Austin, TX',
    teamSize: '8–25 employees',
    website: 'https://casanoma.co',
    challenge:
      'Weekend customers expected instant answers on WhatsApp. Support teams faced high stress and spent the first half of Monday merely clearing backlogged inquiries.',
    solution:
      'Deployed Steps AI WhatsApp Support Agent with multi-language understanding to handle weekend shipping, delivery windows, and item availability queries 24/7.',
    channels: ['WhatsApp Official Business API'],
    resultsList: [
      '85% of weekend WhatsApp and Instagram queries resolved autonomously',
      'Zero Monday morning support backlog for human agents',
      '< 30s response time on fragile shipping and dispatch questions',
      '4.8x boost in weekend repeat order volume'
    ],
    quote:
      'Monday mornings are noticeably quieter now. We used to open WhatsApp to a wall of delivery, stock, and sizing questions from the weekend. Most of those get answered as they come in now.',
    personName: 'Sofia Alvarez',
    personRole: 'Customer Operations Manager, Casa Noma',
    avatar: '',
    photo: asset('/images/case-studies/casa-noma.jpg'),
    fullSlug: 'ai-support-agent'
  },
  'Stacklane': {
    brand: 'Stacklane',
    brandSlug: 'stacklane',
    headline: 'Empowering developers with instant documentation & API answers',
    industry: 'SaaS · Developer Cloud Platform',
    agentLabel: 'AI Support Agent',
    agentSlug: 'ai-support-agent',
    metricBig: '89%',
    metricLabel: 'Developer documentation inquiry deflection',
    stats: [
      { value: '89%', label: 'Docs deflection rate' },
      { value: '52%', label: 'Fewer tier-1 tickets' },
      { value: '2.1m', label: 'Average resolution time' }
    ],
    about:
      'Stacklane provides a developer cloud platform and automated serverless container infrastructure utilized by engineering teams to deploy microservices with zero downtime.',
    location: 'San Francisco, CA',
    teamSize: '40–120 employees',
    website: 'https://stacklane.io',
    challenge:
      'Developers struggled to find specific code examples, rate limits, and webhook schemas across 400+ technical documentation pages, resulting in expensive support tickets.',
    solution:
      'Steps AI ingested Stacklane’s complete technical docs, SDK references, and changelogs to provide verified code snippets and configuration steps right inside the developer portal.',
    channels: ['In-App Help Center', 'Developer Portal Widget', 'Slack Community'],
    resultsList: [
      '89% developer documentation inquiry deflection across 400+ API pages',
      '52% fewer tier-1 engineering support tickets submitted to core team',
      '2.1 minute average resolution time for technical integration queries',
      'Accurate code snippets delivered directly inside the developer portal'
    ],
    quote:
      'Our help center is pretty big, and customers weren’t finding half of what was already there. Now they just ask the question normally and get the relevant answer directly.',
    personName: 'Jonathan Reed',
    personRole: 'VP of Customer Success, Stacklane',
    avatar: '',
    photo: asset('/images/case-studies/stacklane.jpg'),
    fullSlug: 'ai-support-agent'
  },
  'Sunday Form': {
    brand: 'Sunday Form',
    brandSlug: 'sunday-form',
    headline: 'Driving conversational marketing and re-engaging past buyers',
    industry: 'Ecommerce · Wellness & Fitness',
    agentLabel: 'AI Marketing Agent',
    agentSlug: 'ai-marketing-agent',
    metricBig: '400+',
    metricLabel: 'Monthly qualified leads via WhatsApp',
    stats: [
      { value: '400+', label: 'Monthly qualified leads' },
      { value: '38%', label: 'Broadcast re-engagement' },
      { value: '4.6x', label: 'Ad-to-chat ROI lift' }
    ],
    about:
      'Sunday Form designs modular home workout systems, smart resistance equipment, and functional recovery tools engineered for performance athletes and fitness enthusiasts.',
    location: 'Berlin, Germany & New York, NY',
    teamSize: '15–40 employees',
    website: 'https://sundayform.com',
    challenge:
      'Traditional email newsletters had low open rates, and paid ad traffic to landing pages suffered from quick drop-offs without immediate customer engagement.',
    solution:
      'Utilized Steps AI Marketing Agent to run personalized Click-to-WhatsApp ad funnels and segmented broadcasts that recommend workout equipment based on customer fitness goals.',
    channels: ['Meta Click-to-WhatsApp Ads', 'Segmented WhatsApp Broadcasts'],
    resultsList: [
      '400+ qualified monthly buyer leads generated via WhatsApp ad funnels',
      '38% re-engagement rate on automated segmented WhatsApp broadcasts',
      '4.6x return on ad spend (ROAS) lift on Click-to-WhatsApp campaigns',
      'Personalized routine suggestions tailored to customer fitness goals'
    ],
    quote:
      'Running marketing campaigns through the AI agent helped us re-engage past customers with personalized WhatsApp broadcasts that felt like one-on-one recommendations.',
    personName: 'Nina Kapoor',
    personRole: 'Growth Director, Sunday Form',
    avatar: '',
    photo: asset('/images/case-studies/sunday-form.jpg'),
    fullSlug: 'ai-marketing-agent'
  },
  'Northstar SaaS': {
    brand: 'Northstar SaaS',
    brandSlug: 'northstar-saas',
    headline: 'Qualifying enterprise inbound traffic and boosting demo booking rates',
    industry: 'SaaS · Enterprise Workflow Automation',
    agentLabel: 'AI Lead Capture Agent',
    agentSlug: 'ai-lead-capture-agent',
    metricBig: '83%',
    metricLabel: 'Increase in booked qualified sales demos',
    stats: [
      { value: '83%', label: 'Demo booking lift' },
      { value: '0 min', label: 'Lead qualification lag' },
      { value: '100%', label: 'HubSpot CRM sync' }
    ],
    about:
      'Northstar SaaS delivers an enterprise workflow automation suite helping operations leaders orchestrate multi-department tasks, governance approvals, and security compliance.',
    location: 'Boston, MA',
    teamSize: '50–150 employees',
    website: 'https://northstarsaas.com',
    challenge:
      'High-intent enterprise visitors bounced from long static contact forms, while sales reps wasted hours trying to reach out to leads who had already gone cold.',
    solution:
      'Implemented Steps AI Lead Capture Agent to converse with website visitors, qualify budget, seat count, and decision timeline, then book calendar demos on the spot.',
    channels: ['Website Chat Widget', 'Pricing Page Interactive Banner'],
    resultsList: [
      '83% increase in qualified sales demos booked automatically on-site',
      'Zero lead qualification lag — prospects qualified in under 2 minutes',
      '100% instant bidirectional sync with HubSpot and Salesforce CRMs',
      'Account executives enter discovery calls with complete tech stack context'
    ],
    quote:
      'Inbound leads get qualified in under two minutes. By the time our account executives join the demo, they already know the company size, tech stack, and pain points.',
    personName: 'Ryan Collins',
    personRole: 'Head of Sales, Northstar SaaS',
    avatar: '',
    photo: asset('/images/case-studies/northstar-saas.jpg'),
    fullSlug: 'ai-lead-capture-agent'
  },
  'LatticeFlow Labs': {
    brand: 'LatticeFlow Labs',
    brandSlug: 'latticeflow-labs',
    headline: 'Accelerating global lead qualification and CRM intelligence',
    industry: 'SaaS · Analytics & AI Infrastructure',
    agentLabel: 'AI Lead Capture Agent',
    agentSlug: 'ai-lead-capture-agent',
    metricBig: '62%',
    metricLabel: 'Faster response to high-intent leads',
    stats: [
      { value: '62%', label: 'Faster lead response' },
      { value: '94%', label: 'CRM data enrichment' },
      { value: '3.4x', label: 'Pipeline velocity' }
    ],
    about:
      'LatticeFlow Labs develops AI infrastructure and data pipeline observability tools that ensure machine learning models remain accurate, unbiased, and reliable in production.',
    location: 'Zurich, Switzerland & New York, NY',
    teamSize: '30–90 employees',
    website: 'https://latticeflow.ai',
    challenge:
      'International prospects across European and Asian time zones were waiting up to 14 hours for SDR responses, causing valuable deals to stall.',
    solution:
      'Deployed Steps AI with 24/7 autonomous qualification that validates corporate email domains, enriches CRM records, and coordinates AE meetings instantly.',
    channels: ['Website Interactive Widget', 'Salesforce Integration'],
    resultsList: [
      '62% faster response time to international high-intent technical leads',
      '94% CRM enrichment on corporate domains, headcount, and budget tier',
      '3.4x overall enterprise pipeline velocity improvement',
      'Eliminated 14-hour SDR response lag across European and Asian time zones'
    ],
    quote:
      'Instead of waiting for an SDR to wake up, our prospects across Europe and Asia get immediate technical qualification and a calendar invite.',
    personName: 'Rachel Morgan',
    personRole: 'Revenue Operations, LatticeFlow Labs',
    avatar: '',
    photo: asset('/images/case-studies/latticeflow-labs.jpg'),
    fullSlug: 'ai-lead-capture-agent'
  },
  'RelayDesk': {
    brand: 'RelayDesk',
    brandSlug: 'relaydesk',
    headline: 'Eliminating email scheduling friction with autonomous appointment booking',
    industry: 'SaaS · IT Service Desk',
    agentLabel: 'AI Booking Agent',
    agentSlug: 'ai-booking-agent',
    metricBig: '91%',
    metricLabel: 'Automated calendar booking completion',
    stats: [
      { value: '91%', label: 'Booking completion rate' },
      { value: '0', label: 'Scheduling email ping-pong' },
      { value: '18 hrs', label: 'Saved weekly per coordinator' }
    ],
    about:
      'RelayDesk offers a next-generation IT service management and employee onboarding platform that streamlines hardware provisioning, license management, and internal IT tickets.',
    location: 'Toronto, Canada',
    teamSize: '25–70 employees',
    website: 'https://relaydesk.com',
    challenge:
      'Onboarding and customer success teams spent hours emailing back-and-forth proposing time slots, leading to dropped calls and delayed implementations.',
    solution:
      'Steps AI Booking Agent connects directly with Google Calendar and Microsoft Outlook to propose available slots conversationally, confirm appointments, and send reminders.',
    channels: ['Client Onboarding Portal', 'Automated Email Link', 'SMS Reminders'],
    resultsList: [
      '91% automated calendar booking completion rate for onboarding demos',
      'Completely eliminated scheduling email ping-pong for coordinators',
      '18 hours saved weekly per customer onboarding specialist',
      'Direct calendar integration with Google Workspace and Microsoft 365'
    ],
    quote:
      'Our onboarding sessions are booked automatically right after signup. The back-and-forth emails for finding a 30-minute slot are completely gone.',
    personName: 'Kevin Morales',
    personRole: 'Operations Lead, RelayDesk',
    avatar: '',
    photo: asset('/images/case-studies/relaydesk.jpg'),
    fullSlug: 'ai-booking-agent'
  }
};

export const brandSlugToName: Record<string, string> = {
  'mysa-living': 'Mysa Living',
  'aster-and-row': 'Aster & Row',
  'north-and-pine': 'North & Pine',
  'nivara': 'Nivara',
  'casa-noma': 'Casa Noma',
  'stacklane': 'Stacklane',
  'sunday-form': 'Sunday Form',
  'northstar-saas': 'Northstar SaaS',
  'latticeflow-labs': 'LatticeFlow Labs',
  'relaydesk': 'RelayDesk'
};

export const agentSlugToDefaultBrand: Record<string, string> = {
  'ai-sales-agent': 'Mysa Living',
  'ai-support-agent': 'North & Pine',
  'ai-marketing-agent': 'Sunday Form',
  'ai-lead-capture-agent': 'Northstar SaaS',
  'ai-booking-agent': 'RelayDesk'
};

export function getBrandDataBySlug(slug: string): BrandInspireData | undefined {
  const brandName = brandSlugToName[slug] || agentSlugToDefaultBrand[slug];
  if (brandName && brandInspireMap[brandName]) {
    return brandInspireMap[brandName];
  }
  return undefined;
}

export function listAllCaseStudySlugs(): string[] {
  return [
    ...Object.keys(brandSlugToName),
    'ai-sales-agent',
    'ai-support-agent',
    'ai-marketing-agent',
    'ai-lead-capture-agent',
    'ai-booking-agent',
    'ai-receptionist'
  ];
}
