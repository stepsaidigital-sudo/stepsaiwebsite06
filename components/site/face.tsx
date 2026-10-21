import { facePhoto } from './faces';

// Inside an avatar circle: the sample person's photo when there is one, else their initials.
export function Face({ name, initials }: { name: string; initials: string }) {
  const photo = facePhoto(name);
  return photo ? <img className="face-img" src={photo} alt="" width={64} height={64} loading="lazy" decoding="async" /> : <>{initials}</>;
}
