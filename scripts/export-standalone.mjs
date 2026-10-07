import fs from 'node:fs/promises';
import path from 'node:path';
import {build} from 'esbuild';
const root=process.cwd();
const mime={'.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ttf':'font/ttf','.woff2':'font/woff2'};
const assets={};
async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else if(mime[path.extname(p)]){const key='/'+path.relative(path.join(root,'public'),p).replaceAll('\\','/');assets[key]=`data:${mime[path.extname(p)]};base64,${(await fs.readFile(p)).toString('base64')}`;}}}
await walk(path.join(root,'public'));
const result=await build({stdin:{contents:"import React from 'react';import {createRoot} from 'react-dom/client';import Home from './app/page';createRoot(document.getElementById('root')).render(<Home/>);",resolveDir:root,loader:'tsx'},bundle:true,write:false,format:'iife',platform:'browser',minify:true,jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},plugins:[{name:'inline-images',setup(b){b.onLoad({filter:/app[\\/].*\.tsx$/},async args=>{let s=await fs.readFile(args.path,'utf8');s=s.replace(/src="(\/[^"\n]+)"/g,(_,v)=>`src={window.__stepsAsset(${JSON.stringify(v)})}`).replace(/src=\{(`[^`]+`)\}/g,(_,v)=>`src={window.__stepsAsset(${v})}`);return {contents:s,loader:'tsx'};});}}]});
const layout=await fs.readFile('app/layout.tsx','utf8');let css='';for(const m of layout.matchAll(/import\s+["']\.\/([^"']+\.css)["']/g)){css+='\n'+await fs.readFile('app/'+m[1],'utf8');}
css=css.replace(/url\(['"]?(\/[^)'"\s]+)['"]?\)/g,(_,v)=>`url("${assets[v]||v}")`);
css=css.replaceAll('.integration-tile img[src$="calendly.svg"]','.integration-tile[title="Calendly"] img').replaceAll('.integration-tile img[src$="woocommerce.svg"]','.integration-tile[title="WooCommerce"] img');
const used=Object.fromEntries(Object.entries(assets).filter(([k])=>!k.startsWith('/fonts/')));
const js=`window.__stepsAssets=${JSON.stringify(used)};window.__stepsAsset=p=>window.__stepsAssets[p]||p;`+result.outputFiles[0].text;
const interLicense=await fs.readFile('public/fonts/Inter-LICENSE.txt','utf8');
const html=`<!doctype html><!-- ${interLicense} --><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Steps AI — Your AI agent for marketing, sales and support"><title>Steps AI — Standalone</title><style>${css.replaceAll('</style','<\\/style')}</style></head><body><div id="root"></div><noscript>Please enable JavaScript to view this interactive page.</noscript><script>${js.replaceAll('</script','<\\/script')}</script></body></html>`;
await fs.mkdir('exports',{recursive:true});await fs.writeFile('exports/Steps-AI-Standalone.html',html);console.log(`Created exports/Steps-AI-Standalone.html (${(Buffer.byteLength(html)/1048576).toFixed(1)} MB), with embedded fonts, imagery and React interactions.`);
