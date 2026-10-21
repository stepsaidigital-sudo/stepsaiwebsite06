// Use-case pages that go live at launch (see the SEO URL map). AI receptionist is held until
// voice calling is live and AI marketing agent is not published, so nothing links to them.
export const publishedUseCases = ['ai-sales-agent', 'ai-support-agent', 'ai-lead-capture-agent', 'ai-booking-agent'];
export const isPublishedUseCase = (slug: string) => publishedUseCases.includes(slug);
