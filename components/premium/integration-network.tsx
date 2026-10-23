'use client';

import { useEffect, useId, useRef } from 'react';
import { Globe } from 'lucide-react';
import { asset } from '@/lib/asset';
import styles from './integration-network.module.css';

const inputs = [
  { name: 'WhatsApp', logo: '/brands/whatsapp.png' },
  { name: 'Instagram', logo: '/brands/instagram-icon.png' },
  { name: 'Facebook', logo: '/brands/facebook.svg' },
  { name: 'Website', logo: '' },
];
const outputs = [
  { name: 'Shopify', logo: 'shopify' },
  { name: 'WooCommerce', logo: 'woocommerce' },
  { name: 'Google Calendar', logo: 'google-calendar' },
  { name: 'HubSpot', logo: 'hubspot' },
  { name: 'Shiprocket', logo: 'shiprocket' },
  { name: 'Notion', logo: 'notion' },
];

function Diagram({ compact, paused }: { compact: boolean; paused: boolean }) {
  const id = useId().replace(/:/g, '');
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      if (paused || reduce.matches || !visible || document.hidden) svg.pauseAnimations();
      else svg.unpauseAnimations();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(svg);
    reduce.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => { observer.disconnect(); reduce.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, [paused]);

  const width = compact ? 800 : 1600;
  const height = compact ? 760 : 640;
  const cx = width / 2, cy = height / 2;
  const cardWidth = compact ? 265 : 295, cardHeight = compact ? 76 : 72;
  const left = compact ? 10 : 110, right = compact ? 525 : 1200;
  const hub = compact ? 106 : 180;
  const leftY = compact ? [112, 266, 420, 574] : [128, 238, 348, 458];
  const rightY = compact ? [58, 174, 290, 406, 522, 638] : [44, 140, 236, 332, 428, 524];
  const paths = [
    ...leftY.map(y => `M ${left + cardWidth} ${y + cardHeight / 2} C ${compact ? left + cardWidth + 35 : cx - 190} ${y + cardHeight / 2}, ${compact ? cx - hub / 2 - 30 : cx - 180} ${cy}, ${cx - hub / 2} ${cy}`),
    ...rightY.map(y => `M ${cx + hub / 2} ${cy} C ${compact ? cx + hub / 2 + 30 : cx + 240} ${cy}, ${compact ? right - 35 : right - 150} ${y + cardHeight / 2}, ${right} ${y + cardHeight / 2}`),
  ];
  return <svg ref={ref} className={compact ? styles.mobile : styles.desktop} viewBox={compact ? `0 40 ${width} ${height - 40}` : `0 0 ${width} ${height}`} role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>Steps AI connects WhatsApp, Instagram, Facebook and your website with Shopify, WooCommerce, Google Calendar, HubSpot, Shiprocket and Notion.</title>
    <defs>
      <linearGradient id={`${id}-line`}><stop stopColor="#6577ff"/><stop offset=".5" stopColor="#9edfff"/><stop offset="1" stopColor="#7098ff"/></linearGradient>
    </defs>
    {paths.map((d, i) => <g key={i}>
      <path d={d} fill="none" stroke={`url(#${id}-line)`} strokeWidth="2"/>
      <circle className={styles.particle} r="5" fill="#5a96ff" stroke="white" strokeWidth="2"><animateMotion path={d} dur="6s" begin={`${-i * .7}s`} repeatCount="indefinite" calcMode="linear"/></circle>
    </g>)}
    <rect x={cx - hub / 2} y={cy - hub / 2} width={hub} height={hub} rx={compact ? 27 : 48} fill="white" stroke="#dceaff" strokeWidth="2"/>
    <image href={asset('/brands/steps-mark.png')} x={cx - hub * .32} y={cy - hub * .22} width={hub * .64} height={hub * .44} preserveAspectRatio="xMidYMid meet"/>
    {inputs.map((item, i) => <g key={item.name}>
      <rect x={left} y={leftY[i]} width={cardWidth} height={cardHeight} rx="26" fill="white" stroke="#dceaff" strokeWidth="1"/>
      {item.logo ? <image href={asset(item.logo)} x={left + (compact ? 16 : 24)} y={leftY[i] + (compact ? 16 : 19)} width={compact ? 44 : 36} height={compact ? 44 : 36} preserveAspectRatio="xMidYMid meet"/> : <Globe x={left + (compact ? 16 : 24)} y={leftY[i] + (compact ? 16 : 19)} width={compact ? 44 : 36} height={compact ? 44 : 36} color="#0C3474" strokeWidth="1.7"/>}
      <text x={left + (compact ? 72 : 80)} y={leftY[i] + cardHeight / 2 + 8} className={styles.label}>{item.name}</text>
      {!compact && <circle cx={left + cardWidth - 22} cy={leftY[i] + cardHeight / 2} r="6" fill={i === 0 ? '#00bc87' : '#79b1ff'}/>}
    </g>)}
    {outputs.map((item, i) => <g key={item.name}>
      <rect x={right} y={rightY[i]} width={cardWidth} height={cardHeight} rx="26" fill="white" stroke="#dceaff" strokeWidth="1"/>
      <image href={asset(`/brands/integrations/${item.logo === 'woocommerce' ? 'woocommerce-icon' : item.logo}.svg`)} x={right + (compact ? 16 : 23)} y={rightY[i] + (compact ? 16 : 18)} width={compact ? 44 : 38} height={compact ? 44 : 38} preserveAspectRatio="xMidYMid meet"/>
      <text x={right + (compact ? 72 : 78)} y={rightY[i] + cardHeight / 2 + (compact && (item.logo === 'google-calendar' || item.logo === 'woocommerce') ? -7 : 8)} className={styles.label}>{compact && (item.logo === 'google-calendar' || item.logo === 'woocommerce') ? <><tspan x={right + (compact ? 72 : 78)}>{item.logo === 'woocommerce' ? 'Woo' : 'Google'}</tspan><tspan x={right + (compact ? 72 : 78)} dy="34">{item.logo === 'woocommerce' ? 'Commerce' : 'Calendar'}</tspan></> : item.name}</text>
      {!compact && <circle cx={right + cardWidth - 21} cy={rightY[i] + cardHeight / 2} r="6" fill={i === 0 ? '#00bc87' : '#79b1ff'}/>}
    </g>)}
  </svg>;
}

export function IntegrationNetwork() {

  return <div className={styles.network}>
    <Diagram compact={false} paused={false}/><Diagram compact paused={false}/>
  </div>;
}
