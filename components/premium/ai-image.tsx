'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Camera, Sparkles } from 'lucide-react';

// An image that will be generated with another AI tool. Until the file exists at `src`,
// the slot shows the prompt to generate it with.
// With real, the slot asks for a real photo instead (used for real people, never generated).
// With fallback, a missing file shows that instead of the prompt, so a live page never shows instructions.
export function AiImage({ src, alt, prompt, className = '', real = false, fallback }: { src: string; alt: string; prompt: string; className?: string; real?: boolean; fallback?: ReactNode }) {
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // The image can fail before hydration, when onError is not attached yet.
  useEffect(() => { const el = img.current; if (el?.complete && el.naturalWidth === 0) setMissing(true); }, []);
  if (missing && fallback) return <>{fallback}</>;
  if (missing) return <div className={`ai-slot ${className}`} role="img" aria-label={alt}>
    <span className="ai-slot-tag">{real ? <><Camera size={13} />Real photo needed</> : <><Sparkles size={13} />AI image to generate</>}</span>
    <p>{prompt}</p>
    <small>Save as <code>public{src}</code></small>
  </div>;
  return <img ref={img} className={className} src={src} alt={alt} loading="lazy" decoding="async" onError={() => setMissing(true)} />;
}
