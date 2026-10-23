import { asset } from '@/lib/asset';
// Generated photos selected per job and industry; layout remains in the existing template.
const images: Record<string, Record<string, { src: string; alt: string }>> = {
  "ai-receptionist": {
    "Healthcare": {"src":"/images/jobs/ai-booking-agent/consultation-times.webp","alt":"Clinic reception desk with consultation times"},
    "Real estate": {"src":"/images/jobs/ai-booking-agent/sample-flat-visit.webp","alt":"Prepared apartment with a site-visit booking on a phone"},
    "Education": {"src":"/images/jobs/ai-calling-agent/voice-consultation-desk.webp","alt":"Phone, books and headset ready for an admissions enquiry"},
    "Ecommerce": {"src":"/images/jobs/ai-booking-agent/store-styling-session.webp","alt":"An unattended homeware consultation area"}
  },
  "ai-sales-agent": {
    "Ecommerce": {
      "src": "/images/jobs/ai-sales-agent/online-gift-checkout.webp",
      "alt": "online gift checkout"
    },
    "Real estate": {
      "src": "/images/jobs/ai-sales-agent/property-floorplan-selection.webp",
      "alt": "property floorplan selection"
    },
    "Education": {
      "src": "/images/jobs/ai-sales-agent/course-comparison.webp",
      "alt": "course comparison"
    },
    "Healthcare": {
      "src": "/images/jobs/ai-sales-agent/health-package-selection.webp",
      "alt": "health package selection"
    }
  },
  "ai-support-agent": {
    "Ecommerce": {
      "src": "/images/jobs/ai-support-agent/damaged-order-ticket.webp",
      "alt": "damaged order ticket"
    },
    "Healthcare": {
      "src": "/images/jobs/ai-support-agent/clinic-preparation-guide.webp",
      "alt": "clinic preparation guide"
    },
    "Education": {
      "src": "/images/jobs/ai-support-agent/admissions-document-help.webp",
      "alt": "admissions document help"
    },
    "Real estate": {
      "src": "/images/jobs/ai-support-agent/property-maintenance-help.webp",
      "alt": "property maintenance help"
    }
  },
  "ai-lead-capture-agent": {
    "Real estate": {
      "src": "/images/jobs/ai-lead-capture-agent/property-brochure-request.webp",
      "alt": "property brochure request"
    },
    "Education": {
      "src": "/images/jobs/ai-lead-capture-agent/school-interest-form.webp",
      "alt": "school interest form"
    },
    "Ecommerce": {
      "src": "/images/jobs/ai-lead-capture-agent/wholesale-quote-request.webp",
      "alt": "wholesale quote request"
    },
    "Healthcare": {
      "src": "/images/jobs/ai-lead-capture-agent/employee-health-enquiry.webp",
      "alt": "employee health enquiry"
    }
  },
  "ai-booking-agent": {
    "Healthcare": {
      "src": "/images/jobs/ai-booking-agent/consultation-times.webp",
      "alt": "consultation times"
    },
    "Education": {
      "src": "/images/jobs/ai-booking-agent/demo-class-reservation.webp",
      "alt": "demo class reservation"
    },
    "Real estate": {
      "src": "/images/jobs/ai-booking-agent/sample-flat-visit.webp",
      "alt": "sample flat visit"
    },
    "Ecommerce": {
      "src": "/images/jobs/ai-booking-agent/store-styling-session.webp",
      "alt": "store styling session"
    }
  }
};
export const jobIndustryImages = Object.fromEntries(Object.entries(images).map(([slug, entries]) => [slug, Object.fromEntries(Object.entries(entries).map(([industry, image]) => [industry, { ...image, src: asset(image.src) }]))]));
