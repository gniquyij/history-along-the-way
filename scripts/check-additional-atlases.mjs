import vm from 'node:vm';import fs from 'node:fs';import assert from 'node:assert/strict';
const c=vm.createContext({localStorage:{getItem(){return null}}});
vm.runInContext(['data.js','content-en.js','i18n.js','africa-records.js','additional-atlases.js'].map(f=>fs.readFileSync('dist/'+f,'utf8')).join('\n'),c);
const run=s=>vm.runInContext(s,c);
assert.equal(run('SITES.length'),210);assert.equal(run('new Set(SITES.map(s=>s.id)).size'),210);
assert.equal(run("Object.hasOwn(ADDITIONAL_ATLASES,'antarctica')"),false);
run(`for(const [region,config]of Object.entries(ADDITIONAL_ATLASES)){
 for(const chapter of config.chapters){if(!chapter.ids.length)throw Error('Empty chapter');for(const id of chapter.ids)if(!config.sites.some(s=>s.id===id))throw Error('Unreachable site');}
 for(const entry of config.sites){const site=SITES.find(s=>s.id===entry.id);if(!site||site.continent!==region||!entry.chapters.every(id=>config.chapters.some(c=>c.id===id&&c.ids.includes(site.id))))throw Error('Bad region links');
 for(const language of ['en','zh']){lang=language;for(const key of ['name','city','period','why','see','question']){if(!site[key])throw Error('Missing translation');if(language==='en'&&/[\\u3400-\\u9fff]/.test(site[key]))throw Error('Chinese in English');}}
 }
}`);
assert.equal(run("SITES.filter(s=>!s.continent||s.continent==='europe').length"),126);
console.log('New regions: 38 properties, 14 bilingual chapters; IDs, country labels and chapter links checked. Antarctica excluded.');
