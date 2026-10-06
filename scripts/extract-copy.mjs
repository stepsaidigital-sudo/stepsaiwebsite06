import fs from 'node:fs';
const source=fs.readFileSync('C:/Users/user/.codex/attachments/c70951a6-703c-46f2-b842-6965d98d804d/Pasted text.txt','utf8');
const copy=source.split('## 19. Canonical website copy')[1].split('## 20.')[0];
const clean=s=>s.replace(/&#x20;/g,'').replace(/\\\r?\n/g,'\n').trim();
function block(s){ const parts=clean(s).split(/\r?\n\s*\r?\n/).map(clean).filter(x=>x&&x!=='---'); return {title:parts.shift()?.replace(/^#+\s*/,''),paragraphs:parts}; }
function section(s){const [intro,...items]=s.split(/^### /m);return {...block(intro),items:items.map(block)};}
const sections=copy.split(/^### (?:\d+\. |Footer)/m).slice(1);
const data={};
const names=['hero','journey','team','setup','business','testimonials','faq','final','footer'];
sections.forEach((s,i)=>{s=s.replace(/^[^\r\n]*\r?\n/,'');if(i===1){const [intro,...stages]=s.split(/^#### /m);data[names[i]]={...section(intro),stages:stages.map(stage=>{const label=stage.split(/\r?\n/)[0];return {label,...section(stage.slice(label.length))};})};}else data[names[i]]=section(s);});
fs.writeFileSync('app/copy.json',JSON.stringify(data,null,2));
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/canonical-copy.md',clean(copy));
console.log(Object.entries(data).map(([k,v])=>[k,v.title,v.items?.length,v.stages?.length]));
