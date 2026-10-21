// Generated editorial illustrations, not customer photographs or product screenshots.
// Keep image selection independent of page copy and existing layout dimensions.
type Photo = { src: string; alt: string };
const photo = (name: string, alt: string): Photo => ({ src: `/photos/use-cases/${name}.webp`, alt });

export const useCaseIndustryImages: Record<'chat' | 'call', Record<string, Photo>> = {
  chat: {
    Ecommerce: photo('industry-ecommerce', 'E-commerce product catalogue synchronization and real-time inventory advisory engine'),
    Healthcare: photo('industry-healthcare', 'Automated clinic triage, patient intake validation, and appointment telemetry'),
    Education: photo('industry-education', 'Campus admissions directory, academic requirements verification, and enrollment sync'),
    'Real estate': photo('industry-realestate', 'Architectural property specifications, floor plan matching, and automated viewing scheduler'),
  },
  call: {
    Ecommerce: photo('call-ecommerce', 'Automated retail order dispatch, carrier shipping tracking, and inventory fulfillment terminal'),
    Healthcare: photo('call-healthcare', '24/7 patient voice appointment coordination, clinic reception queue, and triage dispatch'),
    Education: photo('call-education', 'Admissions voice inquiry system, course prerequisite confirmation, and enrollment queue'),
    'Real estate': photo('call-realestate', 'Property listings voice concierge, agent calendar routing, and automated showing dispatch'),
  },
};
