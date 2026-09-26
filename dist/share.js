// Public navigation only: never encode notes, consent or visit status in URLs.
(() => {
 let restoring=false;
 function stateHash(){
  const a=window.atlasRoute.read(),p=new URLSearchParams({view:a.view,lang});
  if(a.lens==='geography'){p.set('lens','geography');p.set('topic',a.geoTopic);}
  if(a.view==='world'&&a.lens!=='geography'){p.set('year',mapYear);if(mapSelected)p.set('place',mapSelected);}
  if(a.view==='europe'){p.set('mode',mode==='country'?'country':'era');p.set('era',selected);if(mode==='country'&&country)p.set('country',country);}
  if(a.view==='continents'){p.set('region',a.region);p.set('mode',a.continentMode);if(a.continentMode==='country'){if(a.selectedCountry)p.set('country',a.selectedCountry);}else if(a.lens!=='geography')p.set('chapter',a.chapter);}
  if(document.getElementById('geo-detail')?.open)p.set('geoSite',document.getElementById('geo-detail').dataset.site);
  if($('detail').open&&$('detail').dataset.site)p.set('site',$('detail').dataset.site);
  return '#'+p.toString();
 }
 function sync(replace=false){if(restoring)return;const hash=stateHash();if(hash!==location.hash)history[replace?'replaceState':'pushState'](null,'',location.pathname+location.search+hash);}
 function restore(){
  restoring=true;const p=new URLSearchParams(location.hash.slice(1));
  if(['en','zh'].includes(p.get('lang')))lang=p.get('lang');
  selected=ERAS.some(e=>e.id===p.get('era'))?p.get('era'):ERAS[0].id;
  mode=p.get('mode')==='country'?'country':'era';country=countryNames.includes(p.get('country'))?p.get('country'):'';
  const year=Number(p.get('year'));mapYear=p.has('year')&&Number.isFinite(year)?Math.max(-3000,Math.min(2026,Math.round(year))):1;
  mapSelected=MAP_HISTORY_ITEMS.some(x=>x[0]===p.get('place'))?p.get('place'):'map-rome';
  render();window.atlasRoute.apply(p);
  const site=p.get('site');if(SITES.some(s=>s.id===site)){if($('detail').open)renderDetail(site);else openDetail(site);}else if($('detail').open)$('detail').close();
  const geoSite=p.get('geoSite'),geoDialog=document.getElementById('geo-detail');if(p.get('lens')==='geography'&&GEO_PLACES[geoSite]){if(geoDialog?.open)geoDialog.close();openGeographyPlace(geoSite);}else if(geoDialog?.open)geoDialog.close();
  setTimeout(()=>{restoring=false;},0);
 }
 const navSelector='[data-lens],[data-geo-enter],[data-geo-topic],[data-geo-place],[data-chapter-id],[data-atlas],[data-continent],[data-era],[data-step],[data-world-era],[data-africa-chapter],[data-continent-chapter],[data-map-place],[data-id].read,#language,#history,#browse,#home';
 document.addEventListener('click',e=>{if(e.target.closest(navSelector))queueMicrotask(()=>sync());});
 document.addEventListener('change',e=>{if(['geo-world-time','geo-stage-select','geo-country','country','continent-country','era-mobile','continent-era-mobile','map-year-number'].includes(e.target.id))queueMicrotask(()=>sync());});
 document.addEventListener('input',e=>{if(e.target.id==='map-year')queueMicrotask(()=>sync(true));});
 document.addEventListener('atlas-map-selection',()=>sync());
 $('detail').addEventListener('close',()=>queueMicrotask(()=>sync()));
 // Capture every detail opening, independent of continent-specific card markup.
 const observer=new MutationObserver(()=>{if($('detail').open)sync();});observer.observe($('detail'),{attributes:true,attributeFilter:['open']});
 window.addEventListener('hashchange',restore);
 async function shareCurrent(){sync(true);try{await navigator.clipboard.writeText(location.href);return L('链接已复制','Link copied');}catch{return L('请复制地址栏中的链接','Copy the link from the address bar');}}
 document.addEventListener('atlas-detail-change',()=>sync());
 document.addEventListener('click',async event=>{const button=event.target.closest('[data-share-place]');if(button)button.textContent=await shareCurrent();});
 if(location.hash)restore();
})();
