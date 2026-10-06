import { chromium } from 'file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync('app/copy.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'qa/mobile-hero.png'});
await page.locator('#engage').scrollIntoViewIfNeeded();await page.screenshot({path:'qa/mobile-engage.png'});
let actual=await page.locator('body').textContent();for(let s=0;s<4;s++)for(let i=0;i<4;i++){await page.locator(`#feature-${s}-${i}`).click();actual+=' '+await page.locator(`.stage-${s}`).textContent();}
const norm=s=>s.replace(/^#+\s*/,'').replace(/\s+/g,' ').trim();actual=norm(actual);
const missing=[];for(const key of ['hero','journey','team','setup','business','testimonials','faq','final']){const section=c[key];const verify=s=>{if(!actual.includes(norm(s)))missing.push(s)};verify(section.title);if(key==='hero'){verify(section.paragraphs[0]);verify(section.paragraphs[1]);verify(section.paragraphs[4]);}else section.paragraphs.forEach(verify);for(const item of section.items){verify(item.title);item.paragraphs.filter(p=>!p.includes(' | ')||p.startsWith('“')||p.split(' | ').length===3).forEach(verify);}for(const stage of section.stages??[]){verify(stage.title);stage.paragraphs.forEach(verify);for(const item of stage.items){verify(item.title);item.paragraphs.forEach(verify);}}}
fs.writeFileSync('qa/copy-check.json',JSON.stringify({missing},null,2));console.log({missing});await browser.close();if(missing.length)process.exitCode=1;
