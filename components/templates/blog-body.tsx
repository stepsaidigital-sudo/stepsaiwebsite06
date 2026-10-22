import { PortableText, type PortableTextComponents } from '@portabletext/react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BlogArticle } from '@/lib/blog';

// The article text of /blog/<slug>/, rendered on the server. Posts written in /studio store
// Portable Text; posts published by Unvoro store a Markdown string. Both come out as plain
// elements styled by .bl-prose in globals.css.

type Image = { asset?: { url?: string }; alt?: string; caption?: string };
type Table = { caption?: string; rows?: { cells?: string[]; isHeader?: boolean }[] };

const isInternal = (href = '') => href.startsWith('/') || href.includes('stepsai.co');
const linkProps = (href?: string) => isInternal(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' };

const portable: PortableTextComponents = {
  types: {
    image: ({ value }: { value: Image }) => value.asset?.url ? <figure>
      <img src={value.asset.url} alt={value.alt || ''} loading="lazy" decoding="async" />
      {value.caption && <figcaption>{value.caption}</figcaption>}
    </figure> : null,
    table: ({ value }: { value: Table }) => <figure>
      <div className="bl-table"><table><tbody>{value.rows?.map((row, r) => <tr key={r}>{row.cells?.map((cell, c) =>
        row.isHeader ? <th key={c}>{cell}</th> : <td key={c}>{cell}</td>)}</tr>)}</tbody></table></div>
      {value.caption && <figcaption>{value.caption}</figcaption>}
    </figure>,
  },
  marks: {
    link: ({ children, value }) => <a href={value?.href} {...linkProps(value?.href)}>{children}</a>,
  },
};

const markdown: Components = {
  a: ({ href, children }) => <a href={href} {...linkProps(href)}>{children}</a>,
  // Inline Markdown images are arbitrary remote URLs with no known size.
  img: ({ src, alt }) => typeof src === 'string' && src ? <figure>
    <img src={src} alt={alt || ''} loading="lazy" decoding="async" />
    {alt && <figcaption>{alt}</figcaption>}
  </figure> : null,
  table: ({ children }) => <figure><div className="bl-table"><table>{children}</table></div></figure>,
};

export function BlogBody({ body }: { body: BlogArticle['body'] }) {
  if (!body) return null;
  return <div className="bl-prose">{typeof body === 'string'
    ? <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdown}>{body}</ReactMarkdown>
    : <PortableText value={body as Parameters<typeof PortableText>[0]['value']} components={portable} />}</div>;
}
