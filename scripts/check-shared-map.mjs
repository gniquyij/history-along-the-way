import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const ctx=vm.createContext({document:{addEventListener(){}},window:{addEventListener(){}}});
const source=fs.readFileSync('dist/world-map.js','utf8');
vm.runInContext(source.slice(source.indexOf('function equalEarthPoint'),source.indexOf('let mapZoom')),ctx);
vm.runInContext("const L=(a,b)=>b,esc=String;let mode='country',country='埃及';const COUNTRIES_EN={'埃及':'Egypt'};",ctx);
vm.runInContext(fs.readFileSync('dist/shared-map.js','utf8'),ctx);
const run=s=>vm.runInContext(s,ctx);
for(const lens of ['history','geography']){
 assert.equal(run(`sharedMapKey({view:'continents',region:'africa',continentMode:'country',selectedCountry:'Egypt',lens:'${lens}'})`),'country:Egypt');
 assert.equal(run(`sharedMapKey({view:'world',lens:'${lens}'})`),'world');
}
assert.notEqual(run("sharedMapKey({view:'continents',region:'africa',continentMode:'country',selectedCountry:'Egypt'})"),run("sharedMapKey({view:'continents',region:'africa',continentMode:'country',selectedCountry:'Morocco'})"));
for(const [lon,lat]of [[31,30],[-120,50],[151,-34],[0,0]]){const result=run(`(()=>{const p=equalEarthPoint(${lon},${lat});return inverseAtlasPoint(p[0]*10,p[1]*5)})()`);assert(Math.abs(result[0]-lat)<1e-7);assert(Math.abs(result[1]-lon)<1e-7);}
const rivers=JSON.parse(fs.readFileSync('dist/world-rivers.json','utf8'));assert(rivers.features.length>0);assert(rivers.features.every(f=>['MultiLineString','LineString'].includes(f.geometry.type)));
assert(!fs.readFileSync('dist/index.html','utf8').includes('class="lens-switch"'));
assert(fs.readFileSync('dist/index.html','utf8').includes('id="atlas-perspective"'));assert(run("sharedMapHTML('geography')").includes('Terrain & water'));
console.log('Shared maps: perspective-independent cameras, separate country contexts, coordinate conversion, river geometry and map-local controls passed.');

assert.equal(rivers.features.length,462);
for(const name of ['Nile','Danube','Amazonas','Mississippi','Murray'])assert(rivers.features.some(f=>f.properties.name_en===name||f.properties.name===name),name);
assert(!fs.readFileSync('dist/shared-map.js','utf8').includes('showNile'));
