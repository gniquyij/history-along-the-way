import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const {sites,eras,stops}=vm.runInNewContext(readFileSync('dist/data.js','utf8')+';({sites:SITES,eras:ERAS,stops:STOPS})');
assert.equal(new Set(sites.map(s=>s.id)).size,sites.length,'duplicate UNESCO IDs');
for(const s of sites){assert(s.eras.length);for(const e of s.eras)assert(eras.some(x=>x.id===e),`unknown era ${e}`);assert.equal(s.url,`https://whc.unesco.org/en/list/${s.id}/`);for(const field of ['name','country','why','see'])assert(s[field]);}
for(const id of Object.keys(stops))assert(sites.some(s=>s.id===id));
console.log(`${sites.length} heritage properties, ${eras.length} eras, ${Object.values(stops).flat().length} internal visit points. IDs, era associations and official links valid.`);
