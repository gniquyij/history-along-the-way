import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const ctx=vm.createContext({});
vm.runInContext(`let lang='zh';function L(a,b){return lang==='zh'?a:b;}function esc(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');}`,ctx);
vm.runInContext(fs.readFileSync('dist/reading.js','utf8'),ctx);
const run=s=>vm.runInContext(s,ctx);
const catalogue=run('READING_BOOKS');
const heritage=JSON.parse(fs.readFileSync('dist/heritage-data.json','utf8')).languages.en.sites;
assert.equal(new Set(catalogue.map(b=>b.id)).size,catalogue.length);
for(const b of catalogue){
 assert(b.rating>=4.0&&b.ratingCount>1000);
 assert(b.credential.length===2&&b.credential.every(Boolean));
 assert.equal(new URL(b.goodreads).hostname,'www.goodreads.com');
 assert(new URL(b.credentialSource).protocol==='https:');
 for(const [id,text] of Object.entries(b.sites)){
  assert(heritage.some(s=>String(s.id)===id),`Unknown site ${id}`);
  assert(text.length===2&&text.every(Boolean));
 }
}
assert.equal(run("readingHTML('missing')"),'');
run("lang='en'");
assert(!/[\u3400-\u9fff]/u.test(run("readingHTML('86')")));
assert(run("readingHTML('91')").indexOf('The Fall of Carthage')<run("readingHTML('91')").indexOf('SPQR'));
const result=run(`booksForSite('x',[4.2,4.5,4.9,4.8,4.7].map((rating,i)=>({title:String(i),rating,ratingCount:1001,sites:{x:['a','b']}})))`);
assert.deepEqual(Array.from(result,b=>b.rating),[4.9,4.8,4.7]);
assert.equal(run("booksForSite('x',[{rating:4.9,ratingCount:1000,sites:{x:[]}}]).length"),0);
console.log('Reading checks passed: eligibility, site links, ranking, three-book limit, hidden empty state and bilingual rendering.');

assert.equal(run("booksForSite('x',[{title:'below',rating:3.99,ratingCount:2000,sites:{x:[]}}]).length"),0);
assert.equal(run("booksForSite('x',[{title:'boundary',rating:4.0,ratingCount:1001,sites:{x:[]}}]).length"),1);
assert.equal(run("readingHTML('174')"),'','Previous low-count recommendation must disappear');
