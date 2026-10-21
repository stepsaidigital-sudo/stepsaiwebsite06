// Profile photos for the fictional customers and team members in product mockups.
// Keyed by first name; credited stock portraits in public/photos/avatars (docs/photo-credits.md).
// Never use these for real people (testimonial authors, the Steps AI team): those keep initials.
// Only names whose photo file exists are listed. Empty until public/photos/avatars is filled,
// so every avatar shows initials until then. Planned: priya, meera, anu, neha, kavya, maya, ananya,
// sneha, pooja, divya, rahul, karan, dev, arjun, ravi, vikram, amit, sam, alex, rohan.
const FACES = new Set<string>([]);

/** The photo for a sample person's name, or undefined when there is none (show initials then). */
export function facePhoto(name?: string): string | undefined {
  const first = name?.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
  return first && FACES.has(first) ? `/photos/avatars/${first}.webp` : undefined;
}
