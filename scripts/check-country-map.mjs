import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context=vm.createContext({});
vm.runInContext(fs.readFileSync('dist/country-map-data.js','utf8'),context);
const data=vm.runInContext('COUNTRY_MAP_DATA',context);
const sites=JSON.parse(fs.readFileSync('dist/heritage-data.json','utf8')).languages.en.sites;
const unavailable=new Set(['1567']);
for(const s of sites){
 assert(Array.isArray(data.points[s.id]),`Missing record ${s.id}`);
 for(const p of data.points[s.id]){assert(p.slice(0,2).every(Number.isFinite));assert(p[0]>=0&&p[0]<=1000&&p[1]>=0&&p[1]<=500);}
 for(const name of s.country.split(' / ')){
  const code=data.countries[name];assert(code,`Unmapped country ${name}`);
  if(!unavailable.has(s.id))assert(data.points[s.id].some(p=>p[2]===code),`Missing ${name} component of ${s.id}`);
 }
}
assert(data.points['430'].some(p=>p[2]==='DE'));
assert(data.points['430'].some(p=>p[2]==='GB'));
assert(data.points['1567'].length===0,'Do not fabricate unavailable coordinates');
console.log(`Country map: ${sites.length} property records, cross-border components and country filters checked; 1 explicit coordinate gap.`);
