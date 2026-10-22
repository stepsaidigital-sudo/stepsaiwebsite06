import { ArrowRight, Check, CheckCheck, FileText, Link2, MessageCircle } from 'lucide-react';
import { asset } from '@/lib/asset';

type Story = { benefit: string; photo: string; label: string; name: string; details: [string, string][]; question: string; answer: string; source: string; result: string };
const story = (benefit: string, photo: string, label: string, name: string, details: [string,string][], question: string, answer: string, source: string, result: string): Story => ({benefit,photo,label,name,details,question,answer,source,result});

// Fictional examples illustrate the workflow; they are not customer records or promises.
export const industryStories: Record<string, Story[]> = {
 education: [
  story('Help students find the right course.', 'course-guidance', 'Course brochure', 'Data analytics', [['Duration','6 months'],['Level','Beginner']], 'Can I join without experience?', 'Yes. This course starts with the fundamentals. I can share the syllabus and eligibility details.', 'Your course brochure', 'A course question, answered.'),
  story('Turn course interest into a clear enquiry.', 'student-enquiry-kiosk', 'Admissions enquiry', 'Data analytics enquiry', [['Interest','Weekend classes'],['Next step','Admissions follow-up']], 'I’m interested in weekend classes.', 'Which course are you considering? Share your name and preferred contact details so admissions can follow up.', 'Your enquiry fields', 'The right details for admissions.'),
  story('Make counselling easier to arrange.', 'counselling-session-booking', 'Counsellor calendar', 'Course counselling', [['Thursday','3:00 pm'],['Format','Phone call']], 'Can I speak with a counsellor on Thursday?', 'There’s a 3 pm slot in the connected calendar. Would you like to book it?', 'Your counsellor’s calendar', 'A clear next step towards counselling.'),
  story('Reconnect when the next batch opens.', 'new-batch-announcement', 'Batch announcement', 'Weekend intake', [['Course','Data analytics'],['Audience','Opted-in enquiries']], 'Is the new weekend batch open?', 'Yes, applications for the weekend batch are open. Would you like the schedule or a counselling call?', 'Your updated batch information', 'A follow-up becomes a conversation.'),
 ],
 healthcare: [
  story('Give visitors clear clinic information.', 'clinic-visit-guidance', 'Clinic information', 'Saturday visits', [['Hours','9 am–1 pm'],['Location','Main clinic']], 'Are you open on Saturday?', 'Yes, Saturday hours are 9 am to 1 pm. I can share the location or help you find an appointment.', 'Your clinic information', 'Practical guidance before a visit.'),
  story('Help patients find a suitable appointment.', 'appointment-booking', 'Appointment calendar', 'Clinic consultation', [['Tuesday','10:30 am'],['Status','Available slot']], 'Do you have an appointment on Tuesday?', 'The connected calendar shows a 10:30 am slot. Shall I help you book it?', 'Your appointment calendar', 'An available time, offered clearly.'),
  story('Make routine calls easier to handle.', 'clinic-phone-reception', 'Clinic reception', 'Incoming call', [['Topic','Opening hours'],['Next step','Booking enquiry']], 'What time does the clinic open tomorrow?', 'The clinic opens at 9 am. Would you like help with an appointment?', 'Your reception information', 'Routine information shared on the call.'),
  story('Leave clinical questions with your team.', 'clinic-arrival', 'Team handover', 'Clinical question', [['Topic','Medication question'],['Next step','Clinic team review']], 'Should I change my medication before my visit?', 'Your clinic team needs to answer that. I can pass your question and conversation to them.', 'Your handover rules', 'The clinical question goes to your team.'),
 ],
 'real-estate': [
  story('Help buyers understand the property.', 'floor-plan-guidance', 'Property details', 'Two-bedroom apartment', [['Layout','2 bedrooms'],['Information','Floor plan available']], 'Can you share the two-bedroom layout?', 'Here’s the floor plan from the property information. Would you also like the location or a site visit?', 'Your property information', 'Property details without the wait.'),
  story('Understand what each buyer is looking for.', 'buyer-requirements', 'Buyer requirements', 'New property enquiry', [['Preference','2 bedrooms'],['Area','Near the city centre']], 'I’m looking for a two-bedroom home near the centre.', 'What budget range and moving timeline do you have in mind? I’ll include those details for your team.', 'Your qualification questions', 'A useful brief for your sales team.'),
  story('Turn interest into a scheduled site visit.', 'site-visit-confirmation', 'Site visit calendar', 'Property viewing', [['Sunday','12:00 pm'],['Location','Sales office']], 'Can I visit on Sunday?', 'The connected calendar has a noon slot. Would you like to book it? I can also share the meeting location.', 'Your viewing calendar', 'A site visit with a clear time and place.'),
  story('Give your team the context to follow up.', 'buyer-brief-summary', 'Sales handover', 'Buyer enquiry summary', [['Looking for','2-bedroom home'],['Request','Talk to sales']], 'I’d like to discuss the next steps with sales.', 'I’ll pass your preferences and this conversation to the sales team so you can continue from here.', 'Your CRM and handover rules', 'A buyer brief, ready for your team.'),
 ],
 'travel-and-hospitality': [
  story('Help guests plan with confidence.', 'guest-guide-support', 'Guest guide', 'Weekend stay', [['Breakfast','Included'],['Check-in','2:00 pm']], 'Is breakfast included in this package?', 'Yes, breakfast is included. Check-in starts at 2 pm. Would you like the full package details?', 'Your package information', 'The details guests need before booking.'),
  story('Capture the details of the next stay.', 'stay-enquiry-planning', 'Stay enquiry', 'Weekend getaway', [['Guests','2 adults'],['Nights','2']], 'We’re planning a two-night stay for two.', 'Which dates are you considering? I’ll include them with your guest count for the reservations team.', 'Your booking enquiry fields', 'A complete enquiry for reservations.'),
  story('Keep special requests connected to your team.', 'reservation-enquiry-ledger', 'Reservations handover', 'Group stay request', [['Rooms','4 requested'],['Next step','Team confirmation']], 'Can you arrange four rooms together?', 'Your reservations team can confirm that. I’ll pass along your dates, room request and this conversation.', 'Your reservations workflow', 'The request reaches the right team.'),
  story('Turn a stay offer into a useful conversation.', 'return-guest-offer', 'Guest campaign', 'Weekend package', [['Audience','Opted-in guests'],['Details','Approved offer']], 'Can you tell me more about the weekend offer?', 'I can share the package inclusions and terms. What dates would you like the team to check?', 'Your approved campaign details', 'An offer with a helpful next step.'),
 ],
 saas: [
  story('Make your documentation easier to use.', 'documentation-support', 'Help documentation', 'Workspace setup', [['Guide','Invite your team'],['Step','Workspace settings']], 'How do I invite a teammate?', 'Open workspace settings, choose Members, then Invite. Here’s the setup guide with the full steps.', 'Your connected documentation', 'A clear answer from your own docs.'),
  story('Understand the team behind an enquiry.', 'team-requirements-enquiry', 'Demo enquiry', 'Team requirements', [['Team size','12 people'],['Interest','Shared customer inbox']], 'We need a shared inbox for our team of twelve.', 'Which channels do you use today, and what would you like to improve? I’ll include this in your demo enquiry.', 'Your lead qualification fields', 'Context for a relevant sales conversation.'),
  story('Move a product question towards a demo.', 'product-demo-scheduled', 'Demo calendar', 'Product walkthrough', [['Wednesday','2:00 pm'],['Format','Online demo']], 'Can I see a demo on Wednesday?', 'There’s a 2 pm slot in the connected calendar. Shall I help you book a walkthrough?', 'Your demo calendar', 'A product conversation with a next step.'),
  story('Give support the details they need.', 'qualified-team-brief', 'Support ticket', 'Import issue', [['Category','Data import'],['Status','Ready for team review']], 'My import keeps failing. Can someone help?', 'What error message do you see? I can create a support ticket with the details and this conversation.', 'Your ticket workflow', 'A support request with useful context.'),
 ],
 'financial-services': [
  story('Make application information easier to find.', 'product-information-enquiry', 'Application guide', 'Home loan enquiry', [['Information','Document checklist'],['Review','Handled by your team']], 'What documents do I need to apply?', 'I can share the document checklist from your application guide. Your adviser can confirm what applies to you.', 'Your application guide', 'Process information from your own guide.'),
  story('Collect the right details for a follow-up.', 'home-loan-enquiry-record', 'Customer enquiry', 'Home loan information', [['Interest','Application process'],['Next step','Adviser follow-up']], 'I’d like to know more about applying.', 'I can explain the process. If you’d like a follow-up, share your name and preferred contact details.', 'Your approved enquiry fields', 'An enquiry ready for your team.'),
  story('Make it easier to speak with an adviser.', 'adviser-call-confirmation', 'Adviser calendar', 'Introductory call', [['Friday','11:00 am'],['Format','Phone call']], 'Can an adviser call me on Friday?', 'The connected calendar shows an 11 am slot. Would you like to book it?', 'Your adviser’s calendar', 'A clear route to a personal conversation.'),
  story('Keep personal advice with your advisers.', 'document-checklist-guidance', 'Adviser handover', 'Personal eligibility question', [['Topic','Individual circumstances'],['Next step','Adviser review']], 'Would I qualify based on my circumstances?', 'Your adviser needs to review that with you. I can pass your question to the team or help arrange a call.', 'Your adviser handover rules', 'Personal questions reach a qualified person.'),
 ],
};

export function IndustryCapability({industry,story:s}:{industry:string;story:Story}) {
 const businessLabel: Record<string,string> = {education:'Your institute',healthcare:'Your clinic','real-estate':'Your property team','travel-and-hospitality':'Your reservations team',saas:'Your product team','financial-services':'Your adviser team'};
 return <div className="cc-composition ic-composition">
  <div className="cc-source">
   <div className="cc-source-bar"><FileText size={17}/>{s.label}<span>Sample</span></div>
   <img className="cc-product-photo ic-photo" src={asset(`/images/industries/${industry}/${s.photo}.webp`)} alt={s.name} loading="lazy"/>
   <div className="ic-details"><strong>{s.name}</strong><dl>{s.details.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>
   <div className="cc-source-footer"><Check size={16}/>Your business information</div>
  </div>
  <div className="cc-bridge" aria-hidden="true"><span/><ArrowRight size={22}/></div>
  <div className="cc-conversation"><header><MessageCircle size={24}/><div><strong>{businessLabel[industry]}</strong><span>Example conversation</span></div></header><div className="cc-messages"><div className="cc-question">{s.question}<CheckCheck size={14}/></div><div className="cc-agent-label"><img src={asset('/brands/steps-original.png')} width="28" height="17" alt=""/>Your AI agent</div><div className="cc-answer">{s.answer}</div><span className="cc-source-cite"><Link2 size={13}/>{s.source}</span></div><div className="cc-result"><span><Check size={16}/></span><strong>{s.result}</strong></div></div>
 </div>;
}
