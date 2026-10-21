export type BrandInspireData = {
  brand: string;
  headline: string;
  industry: string;
  agentLabel: string;
  agentSlug: string;
  metricBig: string;
  metricLabel: string;
  stats: Array<{ value: string; label: string }>;
  challenge: string;
  solution: string;
  channels: string[];
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
    challenge:
      'Shoppers had high-intent questions about wood finishes, dimensions, and room sizing before making high-ticket furniture purchases. Waiting for business hours led to abandoned carts.',
    solution:
      'Steps AI Sales Agent was trained on Mysa Living’s catalog, dimension specs, and assembly guidelines to guide shoppers through finish selection, dimension checks, and immediate checkout links.',
    channels: ['Website Live Chat', 'Shopify Checkout', 'Instagram DMs'],
    quote:
      'Shoppers who talk to the sales agent are noticeably more likely to finish checkout. It answers the questions that used to make people hesitate, especially around dimensions and materials.',
    personName: 'Anika Rao',
    personRole: 'Head of Digital Experience, Mysa Living',
    avatar: '/photos/avatars/ananya.webp',
    photo: '/photos/in-ecom-hero.jpg',
    fullSlug: 'ai-sales-agent'
  },
  'Aster & Row': {
    brand: 'Aster & Row',
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
    challenge:
      'High return rates and hesitation around premium garment sizing required round-the-clock consultation that human stylists could not handle during peak sales spikes.',
    solution:
      'Integrated Steps AI as a brand concierge that compares measurements, suggests fit adjustments, and smoothly transfers VIP styling requests to human consultants with full context.',
    channels: ['Web Widget', 'WhatsApp Luxury Concierge'],
    quote:
      'We treat it like a digital concierge. It knows our entire catalogue, handles size queries smoothly, and hands over to our human stylists whenever a customer wants a personal styling session.',
    personName: 'Priya Shah',
    personRole: 'VP of E-Commerce, Aster & Row',
    avatar: '/photos/avatars/priya.webp',
    photo: '/photos/cs-sales.jpg',
    fullSlug: 'ai-sales-agent'
  },
  'North & Pine': {
    brand: 'North & Pine',
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
    challenge:
      'Support specialists spent 60%+ of their working hours looking up courier tracking numbers, delivery windows, and shipment progress across multiple logistics providers.',
    solution:
      'Connected Steps AI Support Agent directly to shipping APIs and courier webhooks to authenticate orders and provide live real-time status updates instantly.',
    channels: ['Website Help Widget', 'Automated Email Replies', 'SMS Alerts'],
    quote:
      'The order-status questions have almost disappeared from our support queue. We still get the odd one, but it’s nowhere near what it used to be.',
    personName: 'Maya Patel',
    personRole: 'Head of E-commerce, North & Pine',
    avatar: '/photos/avatars/maya.webp',
    photo: '/photos/ag-ecom-sales.jpg',
    fullSlug: 'ai-support-agent'
  },
  'Nivara': {
    brand: 'Nivara',
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
    challenge:
      'A flood of repetitive inquiries regarding restocking schedules, fabric care instructions, and return approvals overwhelmed the team and created long response queues.',
    solution:
      'Steps AI automated the entire return initiation and catalog FAQ process, verifying customer eligibility and generating return labels autonomously.',
    channels: ['Web Chat', 'WhatsApp Business', 'Helpdesk Integration'],
    quote:
      'Size, stock, shipping, and returns were probably half of our daily messages. StepsAI handles most of those conversations now, and support has a lot more time for the customers who actually need help.',
    personName: 'Arjun Mehta',
    personRole: 'E-commerce Manager, Nivara',
    avatar: '/photos/avatars/arjun.webp',
    photo: '/photos/sc-sales-ecommerce.jpg',
    fullSlug: 'ai-support-agent'
  },
  'Casa Noma': {
    brand: 'Casa Noma',
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
    challenge:
      'Weekend customers expected instant answers on WhatsApp. Support teams faced high stress and spent the first half of Monday merely clearing backlogged inquiries.',
    solution:
      'Deployed Steps AI WhatsApp Support Agent with multi-language understanding to handle weekend shipping, delivery windows, and item availability queries 24/7.',
    channels: ['WhatsApp Official Business API'],
    quote:
      'Monday mornings are noticeably quieter now. We used to open WhatsApp to a wall of delivery, stock, and sizing questions from the weekend. Most of those get answered as they come in now.',
    personName: 'Sofia Alvarez',
    personRole: 'Customer Operations Manager, Casa Noma',
    avatar: '/photos/avatars/sneha.webp',
    photo: '/photos/in-ecom-shopify.jpg',
    fullSlug: 'ai-support-agent'
  },
  'Stacklane': {
    brand: 'Stacklane',
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
    challenge:
      'Developers struggled to find specific code examples, rate limits, and webhook schemas across 400+ technical documentation pages, resulting in expensive support tickets.',
    solution:
      'Steps AI ingested Stacklane’s complete technical docs, SDK references, and changelogs to provide verified code snippets and configuration steps right inside the developer portal.',
    channels: ['In-App Help Center', 'Developer Portal Widget', 'Slack Community'],
    quote:
      'Our help center is pretty big, and customers weren’t finding half of what was already there. Now they just ask the question normally and get the relevant answer directly.',
    personName: 'Jonathan Reed',
    personRole: 'VP of Customer Success, Stacklane',
    avatar: '/photos/avatars/sam.webp',
    photo: '/photos/ag-saas-support.jpg',
    fullSlug: 'ai-support-agent'
  },
  'Sunday Form': {
    brand: 'Sunday Form',
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
    challenge:
      'Traditional email newsletters had low open rates, and paid ad traffic to landing pages suffered from quick drop-offs without immediate customer engagement.',
    solution:
      'Utilized Steps AI Marketing Agent to run personalized Click-to-WhatsApp ad funnels and segmented broadcasts that recommend workout equipment based on customer fitness goals.',
    channels: ['Meta Click-to-WhatsApp Ads', 'Segmented WhatsApp Broadcasts'],
    quote:
      'Running marketing campaigns through the AI agent helped us re-engage past customers with personalized WhatsApp broadcasts that felt like one-on-one recommendations.',
    personName: 'Nina Kapoor',
    personRole: 'Growth Director, Sunday Form',
    avatar: '/photos/avatars/neha.webp',
    photo: '/photos/cs-marketing.jpg',
    fullSlug: 'ai-marketing-agent'
  },
  'Northstar SaaS': {
    brand: 'Northstar SaaS',
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
    challenge:
      'High-intent enterprise visitors bounced from long static contact forms, while sales reps wasted hours trying to reach out to leads who had already gone cold.',
    solution:
      'Implemented Steps AI Lead Capture Agent to converse with website visitors, qualify budget, seat count, and decision timeline, then book calendar demos on the spot.',
    channels: ['Website Chat Widget', 'Pricing Page Interactive Banner'],
    quote:
      'Inbound leads get qualified in under two minutes. By the time our account executives join the demo, they already know the company size, tech stack, and pain points.',
    personName: 'Ryan Collins',
    personRole: 'Head of Sales, Northstar SaaS',
    avatar: '/photos/avatars/rohan.webp',
    photo: '/photos/in-saas-story.jpg',
    fullSlug: 'ai-lead-capture-agent'
  },
  'LatticeFlow Labs': {
    brand: 'LatticeFlow Labs',
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
    challenge:
      'International prospects across European and Asian time zones were waiting up to 14 hours for SDR responses, causing valuable deals to stall.',
    solution:
      'Deployed Steps AI with 24/7 autonomous qualification that validates corporate email domains, enriches CRM records, and coordinates AE meetings instantly.',
    channels: ['Website Interactive Widget', 'Salesforce Integration'],
    quote:
      'Instead of waiting for an SDR to wake up, our prospects across Europe and Asia get immediate technical qualification and a calendar invite.',
    personName: 'Rachel Morgan',
    personRole: 'Revenue Operations, LatticeFlow Labs',
    avatar: '/photos/avatars/kavya.webp',
    photo: '/photos/f-crm.jpg',
    fullSlug: 'ai-lead-capture-agent'
  },
  'RelayDesk': {
    brand: 'RelayDesk',
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
    challenge:
      'Onboarding and customer success teams spent hours emailing back-and-forth proposing time slots, leading to dropped calls and delayed implementations.',
    solution:
      'Steps AI Booking Agent connects directly with Google Calendar and Microsoft Outlook to propose available slots conversationally, confirm appointments, and send reminders.',
    channels: ['Client Onboarding Portal', 'Automated Email Link', 'SMS Reminders'],
    quote:
      'Our onboarding sessions are booked automatically right after signup. The back-and-forth emails for finding a 30-minute slot are completely gone.',
    personName: 'Kevin Morales',
    personRole: 'Operations Lead, RelayDesk',
    avatar: '/photos/avatars/karan.webp',
    photo: '/photos/cs-booking.jpg',
    fullSlug: 'ai-booking-agent'
  }
};
