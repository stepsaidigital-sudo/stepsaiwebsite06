import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { createHash } from 'node:crypto';

// Import only saved, reviewed source HTML. Never execute scripts from the old site.
const report = [];
for (const slug of ['privacy-policy', 'terms-of-service']) {
  const raw = fs.readFileSync(`docs/legal-source/${slug}.html`, 'utf8');
  const doc = new JSDOM(raw).window.document;
  const outer = doc.querySelector('main');
  const sections = [...outer.children].filter(node => node.tagName === 'SECTION');
  const article = outer.querySelector('main');
  const clean = node => {
    const clone = node.cloneNode(true);
    clone.querySelectorAll('script,style,svg').forEach(el => el.remove());
    for (const el of [clone, ...clone.querySelectorAll('*')]) {
      for (const attr of [...el.attributes]) if (!['id', 'href'].includes(attr.name)) el.removeAttribute(attr.name);
      if (el.tagName === 'A' && !/^(https?:|mailto:|#|\/)/.test(el.getAttribute('href') ?? '')) el.removeAttribute('href');
      if (el.getAttribute('href') === '/why-stepsai/security/') el.setAttribute('href', '/security/');
    }
    return clone;
  };
  const hero = clean(sections[0]);
  const body = clean(article);
  const footer = clean(sections[2]);
  const nav = [...sections[1].querySelectorAll('aside nav a')].map(a => ({ href: a.getAttribute('href'), label: a.textContent }));
  const data = { title: hero.querySelector('h1').textContent, heroHtml: hero.innerHTML, bodyHtml: body.innerHTML, footerHtml: footer.innerHTML, navLabel: slug === 'privacy-policy' ? 'Privacy Sections' : 'Terms Sections', nav };
  for (const [original, imported] of [[sections[0], hero], [article, body], [sections[2], footer]]) {
    if (original.textContent !== imported.textContent) throw new Error(`${slug}: source text mismatch`);
  }
  fs.mkdirSync('content/legal', { recursive: true });
  fs.writeFileSync(`content/legal/${slug}.json`, JSON.stringify(data, null, 2) + '\n');
  report.push({ slug, source: `https://stepsai.co/${slug}/`, captured: '2026-10-22', articleCharacters: article.textContent.length, articleSha256: createHash('sha256').update(article.textContent).digest('hex'), sections: [...article.children].length, exactTextMatch: true });
}
fs.writeFileSync('docs/legal-source/import-verification.json', JSON.stringify(report, null, 2) + '\n');
console.log(report);
