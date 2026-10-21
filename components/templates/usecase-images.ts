// Generated editorial illustrations, not customer photographs or product screenshots.
// Keep image selection independent of page copy and existing layout dimensions.
type Photo = { src: string; alt: string };
const photo = (name: string, alt: string): Photo => ({ src: `/photos/use-cases/${name}.webp`, alt });

export const useCaseIndustryImages: Record<'chat' | 'call', Record<string, Photo>> = {
  chat: {
    Ecommerce: photo('industry-ecommerce', 'A shopper using a phone to enquire about ceramic homeware in a boutique'),
    Healthcare: photo('industry-healthcare', 'A customer messaging a clinic from its waiting area'),
    Education: photo('industry-education', 'A parent and daughter researching school admissions on a laptop'),
    'Real estate': photo('industry-realestate', 'A couple enquiring about a property beside an architectural model'),
  },
  call: {
    Ecommerce: photo('call-ecommerce', 'A homeware store owner speaking to a customer on the phone beside a packing table'),
    Healthcare: photo('call-healthcare', 'A customer making an appointment call from a clinic waiting area'),
    Education: photo('call-education', 'A parent calling a school admissions office from home'),
    'Real estate': photo('call-realestate', 'A prospective buyer calling to arrange a property viewing'),
  },
};
