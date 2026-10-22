import { asset } from '@/lib/asset';
import styles from './company-cases.module.css';

export function CompanyLogo({ name, logo }: { name: string; logo: string | null }) {
  const needsDarkBackground = logo && /brooklane|theshroom-collective|rimple-and-harpreet/.test(logo);
  return <div className={`${styles.logo} ${needsDarkBackground ? styles.darkLogo : ''}`}>{logo ? <img src={asset(logo)} alt={`${name} logo`} loading="lazy" /> : <span className={styles.wordmark}>{name}</span>}</div>;
}
