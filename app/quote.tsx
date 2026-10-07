'use client';
import originals from './testimonials.json';
export function CustomerQuote({paragraphs,className=''}:{paragraphs:string[];className?:string}){
  const full=originals.find(item=>item.attribution===paragraphs[1]);
  return <figure className={`quote ${className}`}><blockquote>{paragraphs[0]}</blockquote><figcaption>{paragraphs[1]}</figcaption>{full&&full.quote!==paragraphs[0]&&<details className="full-quote"><summary>Read full quote</summary><blockquote>{full.quote}</blockquote></details>}</figure>
}
