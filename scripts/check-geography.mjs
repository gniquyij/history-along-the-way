import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const c=vm.createContext({URL,document:{addEventListener(){}}});vm.runInContext(`const nameLines=(s)=>'<p>'+s.nameEn+'</p>';const getRecord=id=>({status:'none',note:''});`,c);vm.runInContext(`let lang='zh';const L=(a,b)=>lang==='zh'?a:b;const esc=s=>String(s);function sharedMapHTML(kind,ids){return '<div class="geo-map" data-ids="'+ids.join(',')+'"></div>';}`,c);
for(const file of ['continent-template.js','reading.js','geography-reading.js','geography-data.js','geography.js'])vm.runInContext(fs.readFileSync('dist/'+file,'utf8'),c);
const run=s=>vm.runInContext(s,c),stages=run('GEO_STAGES'),places=run('GEO_PLACES');
assert.equal(new Set(stages.map(s=>s.topic)).size,stages.length);
for(const stage of stages){assert(stage.source.startsWith('https://'));for(const id of stage.ids){assert(places[id]);assert(stage.countries.every(country=>places[id].countries.includes(country)));}}
for(const place of Object.values(places)){assert(place.point.length===2);assert(Math.abs(place.point[0])<=180&&Math.abs(place.point[1])<=90);assert(place.heritageType==='natural'||place.historyId&&place.connection);}
for(const lang of ['zh','en']){run(`lang='${lang}'`);for(const region of Object.keys(run('GEO_ATLASES'))){
 for(const country of ['',...run(`geographyCountries('${region}')`)]){
 const route={view:'continents',region,selectedCountry:country};const scoped=run(`geographyStages(${JSON.stringify(route)})`);assert(scoped.length);
 for(const topic of ['all',...scoped.map(s=>s.topic)]){run(`geoTopic='${topic}';geoPage=1`);const html=run(`geographyHTML(${JSON.stringify(route)})`);assert(html.includes('geo-map'));assert(!html.includes('undefined'));assert((html.match(/class="site-card"/g)||[]).length<=5);if(lang==='en')assert(!/[\u3400-\u9fff]/u.test(html));}
 }
 }
 run("geoTopic='all';geoPage=1");assert(!run("geographyHTML({view:'world'})").includes('geo-region-links'));
}
run("geoTopic='all';geoPage=2");const second=run("geographyHTML({view:'continents',region:'africa'})");assert(second.includes('2 / 4'));assert.equal((second.match(/class="site-card"/g)||[]).length,5);
assert.equal(run("geographyHistoryLink(GEO_PLACES['1186'])"),'');assert(run("geographyHistoryLink(GEO_PLACES['88'])").includes('data-geo-history="88"'));
for(const region of ['europe','north','southamerica','oceania'])assert(!run(`geographyStages({view:'continents',region:'${region}'}).some(s=>s.countries.includes('Egypt'))`));
for(const country of ['Zambia','Zimbabwe'])assert(run(`geographyStages({view:'continents',region:'africa',selectedCountry:'${country}'}).some(s=>s.ids.includes('509'))`));
console.log(`Geography: ${Object.keys(places).length} properties, five continents, bilingual country isolation, sources, chronology, cross-border filtering and five-card pagination passed.`);

for(const period of run('Object.keys(GEO_PERIODS)')){run(`geoTopic='period-${period}'`);const html=run("geographyHTML({view:'world'})");assert(html.includes('geo-world-time'));assert(!html.includes('geo-world-story'));const expected=run(`new Set(GEO_STAGES.filter(s=>s.period==='${period}').flatMap(s=>s.ids)).size`);assert.equal((html.match(/data-ids="([^"]*)"/)?.[1]||'').split(',').filter(Boolean).length,expected);}

for(const language of ['zh','en']){run(`lang='${language}'`);for(const id of Object.keys(places)){const html=run(`geographyDetailHTML('${id}')`);assert(html.includes('visit-focus'));assert(html.includes('detail-section'));assert(!html.includes('undefined'));if(language==='en')assert(!/[\u3400-\u9fff]/u.test(html));}}
for(const book of run('GEOGRAPHY_BOOKS')){assert(book.rating>=4&&book.ratingCount>1000);assert(book.credentialSource.startsWith('https://'));for(const id of Object.keys(book.sites))assert(places[id]);}
assert(run("geographyDetailHTML('1186')").includes('Otherlands'));
assert(!run("geographyDetailHTML('88')").includes('related-reading'));
assert.equal(run("booksForSite('1186',GEOGRAPHY_BOOKS).length"),1);
console.log('All geography details: bilingual context, observations and separate qualified reading catalogue passed.');
