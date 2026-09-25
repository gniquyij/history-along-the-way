import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const ctx=vm.createContext({document:{addEventListener(){}},ResizeObserver:class{observe(){}},SITES:[{id:'a',name:'A'},{id:'b',name:'B'}],COUNTRY_MAP_DATA:{countries:{Egypt:'EG'},paths:[],points:{a:[[100,100,'EG']],b:[[120,110,'EG']]}},L:(a)=>a,esc:s=>s,openDetail(){}});
vm.runInContext(fs.readFileSync('dist/country-map.js','utf8'),ctx);
function mount(ids='a,b'){
 const surface={clientWidth:600,clientHeight:300,handlers:{},addEventListener(k,f){this.handlers[k]=f;},classList:{add(){},remove(){}},setPointerCapture(){}};
 const svg={setAttribute(k,v){this[k]=v;}};
 const controls={};const nodes={'.country-map-surface':surface,svg,'.country-map-pins':{},'.country-map-selection':{},'.country-map-caption':{},'.country-map-controls':controls};
 const host={dataset:{siteIds:ids,countryName:'Egypt'},querySelector:s=>nodes[s],isConnected:true};
 ctx.host=host;vm.runInContext('mountCountryMap(host)',ctx);
 return {svg,surface,controls};
}
const first=mount();const initial=first.svg.viewBox;
first.controls.onclick({target:{closest:()=>({dataset:{countryZoom:'in'}})}});
first.surface.handlers.keydown({target:first.surface,key:'ArrowRight',preventDefault(){}});
const adjusted=first.svg.viewBox;assert.notEqual(adjusted,initial);
const remounted=mount();assert(remounted.svg.viewBox.split(' ').every((v,i)=>Math.abs(Number(v)-Number(adjusted.split(' ')[i]))<1e-9),'Same locations retain zoom and pan after redraw');
assert.notEqual(mount('a').svg.viewBox,adjusted,'Different filter fits its own locations');
remounted.controls.onclick({target:{closest:()=>({dataset:{countryZoom:'reset'}})}});
assert.equal(remounted.svg.viewBox,initial,'Fit locations still resets the camera');
assert.equal(mount().svg.viewBox,initial);
console.log('Map camera passed: zoom and pan survive remount, filters stay separate, explicit reset works.');
