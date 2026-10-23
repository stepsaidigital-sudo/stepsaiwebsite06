import { asset } from '@/lib/asset';
import styles from './official-partners.module.css';

export function OfficialPartners() {
  return <section id="official-partners" className={styles.strip} aria-label="Official partners">
    <p className={styles.label}>Official partners</p>
    <div className={styles.partners}>
      <div className={styles.partner}><img src={asset('/brands/meta.svg')} width="44" height="32" alt=""/><div><strong>Meta</strong><span>Business Partner</span></div></div>
      <div className={styles.partner}><img src={asset('/brands/integrations/shopify.svg')} width="34" height="38" alt=""/><div><strong className={styles.shopify}>Shopify</strong><span>Partner</span></div></div>
    </div>
    <p className={styles.caption}>Building the future of conversational commerce together.</p>
  </section>;
}
