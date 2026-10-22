import { asset } from '@/lib/asset';

const animals = ['fox', 'owl', 'whale', 'rabbit', 'turtle', 'cat', 'bear', 'penguin', 'hummingbird'];
const samples: Record<string, number> = { anu: 0, rahul: 1, meera: 2, karan: 3, priya: 4, dev: 5, ananya: 6, alex: 7, neha: 8 };

// Fictional sample identities retain the same illustrated profile across dashboards.
export function illustratedProfile(name = '') {
  const first = name.trim().split(/\s+/)[0].toLowerCase();
  const index = samples[first] ?? [...first].reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % animals.length;
  return asset(`/images/features/avatars/${animals[index]}.webp`);
}

export function IllustratedFace({ name }: { name: string; initials: string }) {
  return <img className="face-img" src={illustratedProfile(name)} alt="" width={64} height={64} loading="lazy" decoding="async" />;
}
