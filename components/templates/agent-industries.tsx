import { Building2, GraduationCap, ShoppingBag, Stethoscope } from 'lucide-react';
import { convo, type Scenario } from '@/components/premium/kit';

// How each agent works in four industries. Illustrative conversations with fictional businesses;
// every action shown is one the product supports (catalogue, orders, tickets, leads, bookings, calls, campaigns).

const ind = {
  ecommerce: { industry: 'Ecommerce', href: '/industries/ecommerce/', photo: '/photos/industry-ecommerce.jpg', icon: <ShoppingBag size={16} /> },
  healthcare: { industry: 'Healthcare', href: '/industries/healthcare/', photo: '/photos/industry-healthcare.jpg', icon: <Stethoscope size={16} /> },
  education: { industry: 'Education', href: '/industries/education/', photo: '/photos/industry-education.jpg', icon: <GraduationCap size={16} /> },
  realestate: { industry: 'Real estate', href: '/industries/real-estate/', photo: '/photos/industry-realestate.jpg', icon: <Building2 size={16} /> },
};

export const industryScenarios: Record<string, { title: string; intro: string; scenarios: Scenario[] }> = {
  'ai-support-agent': {
    title: 'Support that fits your business.', intro: 'Order questions for stores, appointment questions for clinics, fee and document questions for schools. Pick an industry to see the conversation.',
    scenarios: [
      { ...ind.ecommerce, photo: '/photos/sc-support-ecommerce.jpg', kind: 'WhatsApp', business: 'Lumen Home', did: ['Found order #2087 in Shopify', 'Checked the carrier status', 'Opened a ticket for a damaged item'], lines: convo(
        ['Where is my order 2087?', 'It has shipped and is out for delivery today.'],
        ['One item came broken.', 'Sorry about that. Share a photo and I will open a ticket for our team.']) },
      { ...ind.healthcare, photo: '/photos/sc-support-healthcare.jpg', kind: 'WhatsApp', business: 'City Care Clinic', did: ['Answered from the clinic’s own information', 'Shared preparation steps', 'Passed a medical question to the team'], lines: convo(
        ['Do I need to fast before the blood test?', 'Yes, please do not eat for 10 to 12 hours before. Water is fine.'],
        ['Can the doctor check my old report?', 'I will pass this to the clinic team. Someone will reply shortly.']) },
      { ...ind.education, photo: '/photos/sc-support-education.jpg', kind: 'Website', business: 'Northfield Academy', did: ['Answered fee dates from the help pages', 'Listed the admission documents', 'Saved the parent’s question for the office'], lines: convo(
        ['When is the second term fee due?', 'The second term fee is due by 10 January. You can pay online or at the office.'],
        ['Which documents do I need for admission?', 'Birth certificate, previous report card and two photos.']) },
      { ...ind.realestate, photo: '/photos/sc-support-realestate.jpg', kind: 'WhatsApp', business: 'Skyline Homes', did: ['Answered handover questions', 'Created a maintenance ticket', 'Emailed the site team'], lines: convo(
        ['When is the handover for Tower B?', 'Tower B handover is planned for March. We will message you the exact date.'],
        ['The kitchen tap in B-1204 is leaking.', 'Sorry about that. I have opened a maintenance ticket for the site team.']) },
    ],
  },
  'ai-sales-agent': {
    title: 'A sales agent for what you sell.', intro: 'Products, courses, properties or health packages. The agent recommends from your own list and moves the customer to the next step.',
    scenarios: [
      { ...ind.ecommerce, photo: '/photos/sc-sales-ecommerce.jpg', kind: 'Instagram', business: 'Lumen Home', did: ['Recommended from the catalogue', 'Checked stock in the store', 'Sent a checkout link'], lines: convo(
        ['Gift ideas under 3,000?', 'The ceramic vase and the bowl set are both popular. Want to see them?'],
        ['The vase, in cream.', 'In stock. Here is your checkout link.']) },
      { ...ind.realestate, photo: '/photos/sc-sales-realestate.jpg', kind: 'WhatsApp', business: 'Skyline Homes', did: ['Matched the budget to listings', 'Shared the floor plan', 'Booked a site visit'], lines: convo(
        ['2 BHK near Whitefield under 90 lakh?', 'Skyline Park has 2 BHK homes from 84 lakh. Shall I send the floor plan?'],
        ['Yes, and can I visit Saturday?', 'Sent. Saturday at 11 is booked for your site visit.']) },
      { ...ind.education, photo: '/photos/sc-sales-education.jpg', kind: 'Website', business: 'Northfield Academy', did: ['Asked about the learner’s goal', 'Recommended a course', 'Booked a counselling call'], lines: convo(
        ['Which course for a career in data?', 'The 6-month data analytics course fits. It starts on 3 February.'],
        ['Can I talk to a counsellor?', 'Of course. Thursday at 5 PM is booked for you.']) },
      { ...ind.healthcare, photo: '/photos/sc-sales-healthcare.jpg', kind: 'WhatsApp', business: 'City Care Clinic', did: ['Explained the health packages', 'Compared what each includes', 'Booked a home sample collection'], lines: convo(
        ['What does the full body check include?', 'It covers 60 tests, including thyroid, sugar and cholesterol, for 2,499.'],
        ['Book it for my parents.', 'Done. Sample collection is booked for Sunday, 8 AM.']) },
    ],
  },
  'ai-lead-capture-agent': {
    title: 'Leads from every kind of enquiry.', intro: 'Site visits, admissions, bulk orders and consultations. The agent answers first, then collects what your team needs.',
    scenarios: [
      { ...ind.realestate, photo: '/photos/sc-lead-realestate.jpg', kind: 'WhatsApp', business: 'Skyline Homes', did: ['Answered the pricing question', 'Collected name and phone', 'Saved the lead with its source'], lines: convo(
        ['Price for a 3 BHK at Skyline Park?', '3 BHK homes start at 1.2 crore. May I have your name to send the brochure?'],
        ['Arjun, 98xxx xxx21', 'Thank you Arjun. Our team will call you today.']) },
      { ...ind.education, photo: '/photos/sc-lead-education.jpg', kind: 'Website', business: 'Northfield Academy', did: ['Answered the admissions question', 'Collected parent details', 'Tagged it as an admission lead'], lines: convo(
        ['Are Grade 6 admissions open?', 'Yes, they are open until 31 March. May I have your name and email?'],
        ['Kavya, kavya@example.com', 'Thank you Kavya. The admissions team will reach out.']) },
      { ...ind.ecommerce, photo: '/photos/sc-lead-ecommerce.jpg', kind: 'Instagram', business: 'Lumen Home', did: ['Recognised a bulk enquiry', 'Collected company details', 'Synced the lead to HubSpot'], lines: convo(
        ['Do you do bulk orders for offices?', 'Yes, we do. What is your company name and work email?'],
        ['Fern Studio, ops@fernstudio.in', 'Thanks. Our team will send a quote today.']) },
      { ...ind.healthcare, photo: '/photos/sc-lead-healthcare.jpg', kind: 'Website', business: 'City Care Clinic', did: ['Answered about corporate plans', 'Collected the HR contact', 'Notified the clinic team'], lines: convo(
        ['Do you offer health checks for employees?', 'Yes, for teams of 20 or more. May I have your name and company?'],
        ['Rohan, Brightline Labs', 'Thank you Rohan. We will send the plans by email.']) },
    ],
  },
  'ai-booking-agent': {
    title: 'Bookings for every kind of appointment.', intro: 'Consultations, demo classes, site visits and store appointments, booked straight into your calendar.',
    scenarios: [
      { ...ind.healthcare, photo: '/photos/sc-booking-healthcare.jpg', kind: 'WhatsApp', business: 'City Care Clinic', did: ['Answered the consultation question', 'Offered free times', 'Booked into Google Calendar'], lines: convo(
        ['Is Dr. Nair available this week?', 'Thursday has 11:00 or 3:30 free. Which suits you?'],
        ['3:30 please, I am Priya.', 'You are booked for Thursday at 3:30, Priya.']) },
      { ...ind.education, photo: '/photos/sc-booking-education.jpg', kind: 'Website', business: 'Northfield Academy', did: ['Explained the demo class', 'Offered weekend slots', 'Sent a confirmation'], lines: convo(
        ['Can my son try a demo class?', 'Yes. Saturday at 10 or Sunday at 4 are free.'],
        ['Saturday at 10.', 'Booked. We have sent the details to your email.']) },
      { ...ind.realestate, photo: '/photos/sc-booking-realestate.jpg', kind: 'WhatsApp', business: 'Skyline Homes', did: ['Shared the site location', 'Offered visit times', 'Booked the site visit'], lines: convo(
        ['Can I see the sample flat?', 'Of course. Saturday at 11 or Sunday at 12 are open.'],
        ['Sunday at 12.', 'Your site visit is booked for Sunday at 12.']) },
      { ...ind.ecommerce, photo: '/photos/sc-booking-ecommerce.jpg', kind: 'Instagram', business: 'Lumen Home', did: ['Explained the styling session', 'Offered store times', 'Booked into Calendly'], lines: convo(
        ['Can I book a styling session in store?', 'Yes. Friday at 5 or Saturday at 2 are free.'],
        ['Saturday at 2.', 'You are booked for Saturday at 2. See you then.']) },
    ],
  },
  'ai-receptionist': {
    title: 'A receptionist for every front desk.', intro: 'Clinics, property offices, schools and stores. Calls are answered, booked or transferred, in English, Hindi or Telugu.',
    scenarios: [
      { ...ind.healthcare, photo: '/photos/sc-recep-healthcare.jpg', kind: 'Call', business: 'City Care Clinic', did: ['Answered the call', 'Booked a Saturday visit', 'Confirmation sent'], lines: convo(
        ['Is the clinic open on Saturday?', 'Yes, from 9 to 1. Would you like to book?'],
        ['Yes, around 11.', 'Saturday at 11 is booked. You will get a confirmation.']) },
      { ...ind.realestate, photo: '/photos/sc-recep-realestate.jpg', kind: 'Call', business: 'Skyline Homes', did: ['Answered the project question', 'Booked a site visit', 'Logged the call in the inbox'], lines: convo(
        ['Are there 2 BHK homes left?', 'Yes, a few in Tower C. Would you like to visit?'],
        ['Sunday morning works.', 'Sunday at 11 is booked for your visit.']) },
      { ...ind.education, photo: '/photos/sc-recep-education.jpg', kind: 'Call', business: 'Northfield Academy', did: ['Answered in Hindi', 'Shared admission dates', 'Transferred to the office'], lines: convo(
        ['Admission kab tak open hai?', 'Admissions 31 March tak open hain.'],
        ['Office se baat ho sakti hai?', 'Zaroor, main aapko office se jod rahi hoon.']) },
      { ...ind.ecommerce, photo: '/photos/sc-recep-ecommerce.jpg', kind: 'Call', business: 'Lumen Home', did: ['Answered after hours', 'Took a voicemail', 'Created a callback ticket'], lines: convo(
        ['I want to change my delivery address.', 'Our team is away right now. Please leave your order number.'],
        ['Order 2087, new address is in Indiranagar.', 'Thank you. We will call you back in the morning.']) },
    ],
  },
  'ai-marketing-agent': {
    title: 'Campaigns for every kind of business.', intro: 'New arrivals, admissions, project launches and health camps. Every reply is answered by your agent.',
    scenarios: [
      { ...ind.ecommerce, photo: '/photos/sc-mkt-ecommerce.jpg', kind: 'WhatsApp', business: 'Lumen Home', did: ['Sent to returning customers', 'Answered the reply', 'Shared a checkout link'], lines: [
        { from: 'agent', text: 'Hi Priya, our new collection is in. Reply SIZE and we will help you choose.', at: 400 },
        { from: 'customer', text: 'SIZE. Medium in the linen shirt?', at: 2600 },
        { from: 'agent', text: 'Medium is in stock. Here is the link to check out.', at: 4800 },
      ] },
      { ...ind.realestate, photo: '/photos/sc-mkt-realestate.jpg', kind: 'Instagram', business: 'Skyline Homes', did: ['Matched the keyword PRICE', 'Sent the price list in a DM', 'Offered a site visit'], lines: [
        { from: 'agent', text: 'Thanks for commenting PRICE on our launch Reel. Here is the price list for Skyline Park.', at: 400 },
        { from: 'customer', text: 'Can I visit this weekend?', at: 2800 },
        { from: 'agent', text: 'Saturday at 11 is free. Shall I book it?', at: 5000 },
      ] },
      { ...ind.education, photo: '/photos/sc-mkt-education.jpg', kind: 'WhatsApp', business: 'Northfield Academy', did: ['Sent the admissions campaign', 'Answered the parent', 'Saved an admission lead'], lines: [
        { from: 'agent', text: 'Admissions for 2026 are open. Reply INFO for fees and dates.', at: 400 },
        { from: 'customer', text: 'INFO for Grade 6.', at: 2600 },
        { from: 'agent', text: 'Grade 6 fees and dates are here. May I have your name?', at: 4800 },
      ] },
      { ...ind.healthcare, photo: '/photos/sc-mkt-healthcare.jpg', kind: 'WhatsApp', business: 'City Care Clinic', did: ['Sent the health camp message', 'Answered the question', 'Booked a slot'], lines: [
        { from: 'agent', text: 'Free health camp this Sunday. Reply BOOK to reserve a slot.', at: 400 },
        { from: 'customer', text: 'BOOK for 2 people.', at: 2600 },
        { from: 'agent', text: 'Booked two slots for Sunday at 9 AM.', at: 4800 },
      ] },
    ],
  },
};
