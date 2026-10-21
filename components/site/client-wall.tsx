import { ArrowUpRight } from 'lucide-react';
import clients from '@/content/site/clients.json';

import { asset } from '@/lib/asset';
export type Client = { slug: string; name: string; website: string | null; what: string; category: string; logo: string | null; photo: string };

// Real Steps AI clients (active installs), shown with their permission. No quotes until a client gives one.
// Data: content/site/clients.json. Photos show each client's kind of business; credits in docs/photo-credits.md.
export function ClientWall({ limit, compact = false }: { limit?: number; compact?: boolean }) {
  const list = (clients as Client[]).slice(0, limit);
  return <div className={`cw-grid ${compact ? 'is-compact' : ''}`}>
    {list.map(c => <article key={c.slug} className="cw-card">
      <div className="cw-photo"><img src={asset('/' + c.photo.replace(/^public\//, ''))} alt="" width={640} height={400} loading="lazy" decoding="async" /><span className="cw-cat">{c.category}</span></div>
      <div className="cw-body">
        <span className="cw-logo">{c.logo ? <img src={asset('/' + c.logo.replace(/^public\//, ''))} alt="" width={44} height={44} loading="lazy" /> : <b>{c.name.slice(0, 1)}</b>}</span>
        <h3>{c.name}</h3>
        <p>{c.what}</p>
        {c.website && <a href={c.website} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight size={14} /><span className="cw-sr"> ({c.name}, opens in a new tab)</span></a>}
      </div>
    </article>)}
  </div>;
}
