import { chromium } from 'file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
fs.mkdirSync('qa',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle',timeout:90000});await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:'qa/desktop.png',fullPage:false});
const typography=[];
for(const font of ['Manrope','DM Sans']){typography.push(await page.evaluate(font=>{const h=document.querySelector('h1');h.style.fontFamily=font;return {font,width:h.getBoundingClientRect().width,height:h.getBoundingClientRect().height,text:h.textContent}},font));await page.screenshot({path:`qa/type-${font.replace(' ','-')}.png`});}await page.evaluate(()=>document.querySelector('h1').style.fontFamily='');
const viewports=[];
for(const [width,height] of [[1440,900],[1366,768],[1280,800],[1024,768],[768,1024],[390,844],[360,800],[320,800]]){await page.setViewportSize({width,height});await page.evaluate(()=>window.scrollTo(0,0));viewports.push(await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,heading:document.querySelector('h1').getBoundingClientRect().height,ctaBottom:document.querySelector('.hero .button').getBoundingClientRect().bottom})));if(width===390||width===320)await page.screenshot({path:`qa/mobile-${width}.png`,fullPage:true});}
await page.setViewportSize({width:1440,height:900});
for(let s=0;s<4;s++){for(let i=0;i<4;i++){await page.locator(`#feature-${s}-${i}`).click();await page.locator(`#feature-panel-${s}-${i}`).waitFor({state:'visible'});if(await page.locator(`.stage-${s} [aria-expanded=true]`).count()!==1)throw Error('Accordion state mismatch');if(await page.locator(`.stage-${s} .demo-content`).count()!==1)throw Error('Missing visual');}await page.locator(`#feature-${s}-0`).click();}
await page.locator('#engage').scrollIntoViewIfNeeded();await page.screenshot({path:'qa/engage.png'});
await page.locator('#convert').scrollIntoViewIfNeeded();await page.screenshot({path:'qa/convert.png'});
await page.getByRole('button',{name:'Take over',exact:true}).click();if(!await page.getByText('You’re in control. AI replies are paused.').isVisible())throw Error('Takeover failed');await page.getByRole('button',{name:'Return to AI'}).click();
await page.getByRole('button',{name:'Test workflow',exact:true}).click();if(!await page.getByText('Preview complete · sample enquiry routed to your team').isVisible())throw Error('Workflow failed');await page.getByRole('button',{name:'Reset preview'}).click();
for(let i=0;i<7;i++){await page.locator('.industry-list button').nth(i).click();if(!await page.locator(`#industry-panel-${i}`).isVisible())throw Error('Industry failed');}await page.locator('.industry-list button').first().click();
for(const el of await page.locator('.faq-list summary').all()){await el.click();}if(await page.locator('.faq-list details[open]').count()!==7)throw Error('FAQ failed');
await page.locator('.hero .button').click();await page.locator('dialog').waitFor({state:'visible'});await page.keyboard.press('Escape');await page.locator('dialog').waitFor({state:'detached'});
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.getByRole('button',{name:'Open navigation',exact:true}).click();await page.keyboard.press('Escape');if(await page.getByRole('button',{name:'Open navigation',exact:true}).getAttribute('aria-expanded')!=='false')throw Error('Menu failed');
await page.emulateMedia({reducedMotion:'reduce'});const motion=await page.locator('.sequence-item').first().evaluate(el=>getComputedStyle(el).animationName);if(motion!=='none')throw Error('Reduced motion failed');
await page.setViewportSize({width:640,height:800});await page.evaluate(()=>document.documentElement.style.fontSize='200%');const zoomOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);await page.evaluate(()=>document.documentElement.style.fontSize='');
fs.writeFileSync('qa/results.json',JSON.stringify({viewports,errors,typography,motion,zoomOverflow,interactions:'16 features; 7 industries; 7 FAQs; takeover; workflow; dialog; mobile menu'},null,2));
console.log(fs.readFileSync('qa/results.json','utf8'));await browser.close();
