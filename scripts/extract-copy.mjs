import fs from 'node:fs';
const source=fs.readFileSync('docs/seo-homepage-source.md','utf8');
// Only the explicitly marked website-copy region becomes marketing copy.
// Strip Markdown presentation syntax, never rewrite words or punctuation.
const website=source.split('# **Website copy**')[1].split('# **Customer evidence: placement and use**')[0];
const copy=website.replace(/\*\*/g,'').replace(/\\\./g,'.')
  .replace(/^## (Navigation|[1-8]\. [^\r\n]+|Footer)$/gm,'### $1')
  .replace(/^### (Engage|Convert|Support|Bring customers back)$/gm,'#### $1')
  .replace(/  \r?\n(?=Account:|Company:)/g,'\n\n');
const clean=s=>s.replace(/&#x20;/g,'').replace(/\\\r?\n/g,'\n').trim();
function block(s){ const parts=clean(s).split(/\r?\n\s*\r?\n/).map(clean).filter(x=>x&&x!=='---'); return {title:parts.shift()?.replace(/^#+\s*/,''),paragraphs:parts}; }
function section(s){const [intro,...items]=s.split(/^### /m);return {...block(intro),items:items.map(block)};}
const sections=copy.split(/^### (?:\d+\. |Footer)/m).slice(1);
const data={};
const names=['hero','journey','team','setup','business','testimonials','faq','final','footer'];
sections.forEach((s,i)=>{s=s.replace(/^[^\r\n]*\r?\n/,'');if(i===1){const [intro,...stages]=s.split(/^#### /m);data[names[i]]={...section(intro),stages:stages.map(stage=>{const label=stage.split(/\r?\n/)[0];return {label,...section(stage.slice(label.length))};})};}else data[names[i]]=section(s);});
const previous=JSON.parse(fs.readFileSync('app/copy.json','utf8'));
if(process.argv.includes('--check')){
  if(JSON.stringify(previous)!==JSON.stringify(data))throw new Error('Marketing copy differs from the SEO specialist source. Run extraction only for an approved source update.');
  const page=fs.readFileSync('app/page.tsx','utf8');
  if(data.journey.stages.length!==4||data.journey.stages.some(s=>s.items.length!==4)||data.business.items.length!==7||data.testimonials.items.length!==4||data.faq.items.length!==7)throw new Error('Required homepage content is missing.');
  if(!page.includes('<Journey/>')||!page.includes('<Industries onOpen={onOpen}/>'))throw new Error('Shared journey or visible industry grid missing.');
  const components=['<Hero onOpen','<ProductJourney','<BusinessFit onOpen','<TeamOverview/>','<Setup onOpen','<Testimonials onOpen','<FAQ onOpen','<section className="final-section"','<Footer onOpen'];
  let last=-1;for(const name of components){const position=page.indexOf(name,last+1);if(position<last||position<0)throw new Error('Homepage section order changed: '+name);last=position;}
  console.log('PASS: exact SEO copy and required section order. 16 features, 7 industries, 4 main testimonials, 7 FAQs.');
  process.exit(0);
}
fs.writeFileSync('app/copy.json',JSON.stringify(data,null,2));
fs.writeFileSync('qa/seo-source-comparison.json',JSON.stringify({source:'docs/seo-homepage-source.md',sectionOrder:names,marketingCopyMatchesPrevious:JSON.stringify(previous)===JSON.stringify(data),normalization:'Markdown heading/strong syntax and escaped heading periods only; words and punctuation preserved'},null,2));
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/canonical-copy.md',clean(copy));
console.log(Object.entries(data).map(([k,v])=>[k,v.title,v.items?.length,v.stages?.length]));
