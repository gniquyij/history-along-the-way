// Public navigation only: never encode notes, consent or visit status in URLs.
(() => {
 let restoring=false;
 function stateHash(){
  const a=window.atlasRoute.read(),p=new URLSearchParams({view:a.view,lang});
  if(a.view==='world'){p.set('year',mapYear);if(mapSelected)p.set('place',mapSelected);}
  if(a.view==='europe'){p.set('mode',mode==='country'?'country':'era');p.set('era',selected);if(mode==='country'&&country)p.set('country',country);}
  if(a.view==='continents'){p.set('region','africa');p.set('mode',a.continentMode);if(a.continentMode==='country'){if(a.selectedCountry)p.set('country',a.selectedCountry);}else p.set('chapter',a.chapter);}
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
  setTimeout(()=>{restoring=false;},0);
 }
 const navSelector='[data-atlas],[data-continent],[data-era],[data-step],[data-world-era],[data-africa-chapter],[data-continent-chapter],[data-map-place],[data-id].read,#language,#detail-language,#history,#browse,#home';
 document.addEventListener('click',e=>{if(e.target.closest(navSelector))queueMicrotask(()=>sync());});
 document.addEventListener('change',e=>{if(['country','continent-country','era-mobile','continent-era-mobile','map-year-number'].includes(e.target.id))queueMicrotask(()=>sync());});
 document.addEventListener('input',e=>{if(e.target.id==='map-year')queueMicrotask(()=>sync(true));});
 $('detail').addEventListener('close',()=>queueMicrotask(()=>sync()));
 // Capture every detail opening, independent of continent-specific card markup.
 const observer=new MutationObserver(()=>{if($('detail').open)sync();});observer.observe($('detail'),{attributes:true,attributeFilter:['open']});
 window.addEventListener('hashchange',restore);
 async function shareCurrent(){sync(true);try{await navigator.clipboard.writeText(location.href);return L('链接已复制','Link copied');}catch{return L('请复制地址栏中的链接','Copy the link from the address bar');}}
 const shareButton=document.createElement('button');shareButton.type='button';shareButton.className='detail-share';shareButton.dataset.zh='分享此地点';shareButton.dataset.en='Share this place';shareButton.textContent=L('分享此地点','Share this place');shareButton.onclick=async()=>{shareButton.textContent=await shareCurrent();};$('detail').querySelector('.dialog-toolbar').prepend(shareButton);
 if(location.hash)restore();
})();
