import { asset } from '@/lib/asset';

// Site fonts, rendered in the root layout so the files load from the asset host like other assets.
export const fontFaces = [
  `@font-face{font-family:Manrope;src:url('${asset('/fonts/manrope.ttf')}') format('truetype');font-weight:200 800;font-display:swap}`,
  `@font-face{font-family:'DM Sans';src:url('${asset('/fonts/dm-sans.ttf')}') format('truetype');font-weight:100 1000;font-display:swap}`,
  `@font-face{font-family:'Inter';src:url('${asset('/fonts/inter-variable.woff2')}') format('woff2');font-weight:100 900;font-style:normal;font-display:swap}`,
  `@font-face{font-family:'Newsreader';src:url('${asset('/fonts/newsreader-variable.ttf')}') format('truetype');font-weight:200 800;font-style:normal;font-display:swap}`,
].join('');
