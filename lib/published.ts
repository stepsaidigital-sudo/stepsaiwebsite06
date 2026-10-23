// Voice calling is live in the supplementary product update dated 2026-10-07.
// AI marketing remains unpublished.
export const publishedUseCases = ['ai-receptionist', 'ai-sales-agent', 'ai-support-agent', 'ai-lead-capture-agent', 'ai-booking-agent'];
export const isPublishedUseCase = (slug: string) => publishedUseCases.includes(slug);
