import fs from 'node:fs';
import vm from 'node:vm';
const ctx=vm.createContext({localStorage:{getItem(){return null;}}});
vm.runInContext(['data.js','content-en.js','i18n.js','africa-records.js','additional-atlases.js','reading.js'].map(f=>fs.readFileSync('dist/'+f,'utf8')).join('\n'),ctx);
const data=vm.runInContext(`(()=>{const result={author:'Yuqing Ji',title:'History Along the Way',scope:'Regional history across Europe, Africa, North America, South America and Oceania; curated, not comprehensive',rights:'See reuse.html; third-party licences remain applicable',reading:READING_BOOKS,languages:{}};for(const code of ['zh','en']){lang=code;result.languages[code]={chapters:[...ERAS.map(e=>({...e})),...AFRICA_CHAPTERS.map(c=>({id:c.id,title:L(...c.title),date:L(...c.date),question:L(...c.question),summary:L(...c.summary),next:L(...c.next),continent:'africa',sites:c.ids})),...Object.entries(ADDITIONAL_ATLASES).flatMap(([continent,config])=>config.chapters.map(c=>({id:c.id,title:L(...c.title),date:L(...c.date),question:L(...c.question),summary:L(...c.summary),next:L(...c.next),continent,sites:c.ids})))],sites:SITES.map(s=>({...s,country:countryLabel(s.country)}))};}return result;})()`,ctx);
fs.writeFileSync('dist/heritage-data.json',JSON.stringify(data,null,2)+'\n');
console.log('Public bilingual heritage dataset generated (no personal records).');
