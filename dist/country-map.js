/* Shared country browser map. All geometry and points load locally. */
function countryMapHTML(sites, countryName='') {
 return `<section class="country-map-section" data-country-map data-site-ids="${sites.map(s=>s.id).join(',')}" data-country-name="${esc(countryName)}"><header><h3>${L('遗产分布','Heritage locations')}</h3><span>${countryName?L('点击地点查看详情','Select a location for details'):L(`${sites.length} 处世界遗产`,`${sites.length} World Heritage properties`)}</span></header><div class="country-map-surface" tabindex="0" role="group" aria-label="${L('遗产地图，可拖动；方向键平移，加减键缩放','Heritage map: drag or use arrow keys to pan; plus and minus to zoom')}"><svg class="country-map-svg" aria-hidden="true"></svg><div class="country-map-pins"></div><div class="country-map-controls"><button type="button" data-country-zoom="in" aria-label="${L('放大','Zoom in')}">+</button><button type="button" data-country-zoom="out" aria-label="${L('缩小','Zoom out')}">−</button><button type="button" data-country-zoom="reset">${L('适应范围','Fit locations')}</button></div></div><div class="country-map-selection" hidden></div><p class="country-map-caption"></p></section>`;
}
const countryMapViews = new Map();
function mountCountryMap(host) {
 host.dataset.ready='true';
 const ids=host.dataset.siteIds.split(',').filter(Boolean), code=COUNTRY_MAP_DATA.countries[host.dataset.countryName];
 const viewKey=JSON.stringify([code||host.dataset.countryName,[...ids].sort()]);
 const sites=ids.map(id=>SITES.find(s=>s.id===id)).filter(Boolean);
 // One representative, verified component per inscription, matching the list count.
 const points=sites.flatMap(s=>{
  const candidates=(COUNTRY_MAP_DATA.points[s.id]||[]).filter(p=>!code||p[2]===code);
  if(!candidates.length)return [];
  const center=candidates.reduce((a,p)=>[a[0]+p[0]/candidates.length,a[1]+p[1]/candidates.length],[0,0]);
  const p=candidates.reduce((a,b)=>Math.hypot(a[0]-center[0],a[1]-center[1])<=Math.hypot(b[0]-center[0],b[1]-center[1])?a:b);
  return [{x:p[0],y:p[1],code:p[2],component:p[3],id:s.id}];
 });
 const missing=sites.filter(s=>!points.some(p=>p.id===s.id));
 const surface=host.querySelector('.country-map-surface'),svg=host.querySelector('svg'),pins=host.querySelector('.country-map-pins'),selection=host.querySelector('.country-map-selection');
 const codes=new Set(points.map(p=>p.code));
 svg.innerHTML=COUNTRY_MAP_DATA.paths.map(([c,d])=>`<path d="${d}" class="${codes.has(c)?'included-country':''}"/>`).join('');
 host.querySelector('.country-map-caption').innerHTML=`${L('每项遗产显示一个代表位置；数字表示附近的遗产项目数。系列遗产的完整范围见详情。','One representative location per heritage property. Numbers count nearby properties; see details for serial properties’ full extent.')} <a href="https://data.unesco.org/explore/dataset/whc001/" target="_blank" rel="noopener">UNESCO</a> · <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener">Natural Earth</a>${missing.length?`<br>${L('暂缺坐标：','Coordinates unavailable: ')}${missing.map(s=>`<button data-open="${s.id}">${esc(s.name)}</button>`).join(' · ')}`:''}`;
 let box,initial,drag=null,moved=false;
 function fit(){
  const xs=points.map(p=>p.x),ys=points.map(p=>p.y),minX=xs.length?Math.min(...xs):400,maxX=xs.length?Math.max(...xs):600,minY=ys.length?Math.min(...ys):100,maxY=ys.length?Math.max(...ys):300;
  const ratio=surface.clientWidth/surface.clientHeight||2;
  let w=Math.max(9,(maxX-minX)*1.3),h=Math.max(7,(maxY-minY)*1.3);
  if(w/h<ratio)w=h*ratio;else h=w/ratio;
  box={x:(minX+maxX-w)/2,y:(minY+maxY-h)/2,w,h};initial={...box};
  const saved=countryMapViews.get(viewKey);
  if(saved){const ratio=surface.clientWidth/surface.clientHeight||2;box={...saved,w:saved.h*ratio};box.x=saved.x+(saved.w-box.w)/2;}
  paint();
 }
 function paint(){
  countryMapViews.set(viewKey,{...box});
  svg.setAttribute('viewBox',`${box.x} ${box.y} ${box.w} ${box.h}`);
  svg.setAttribute('preserveAspectRatio','none');
  const width=surface.clientWidth,height=surface.clientHeight;let groups=[];
  for(const p of points){
   const x=(p.x-box.x)/box.w*width,y=(p.y-box.y)/box.h*height;
   if(x<12||x>width-12||y<12||y>height-12)continue;
   let group=groups.find(g=>Math.hypot(g.x-x,g.y-y)<Math.max(14,32/Math.sqrt(Math.max(1,initial.w/box.w))));
   if(group)group.items.push(p);else groups.push({x,y,items:[p]});
  }
  // At close range, spread overlapping components into individually selectable dots.
  if(initial.w/box.w>=16)groups=groups.flatMap(g=>g.items.length>1&&g.items.length<=16?g.items.map((p,i)=>({x:g.x+Math.cos(i/g.items.length*Math.PI*2)*36,y:g.y+Math.sin(i/g.items.length*Math.PI*2)*36,items:[p],anchorX:g.x,anchorY:g.y})): [g]);
  pins.innerHTML=groups.map((g,i)=>{const s=SITES.find(s=>s.id===g.items[0].id);const label=g.items.length>1?L(`${g.items.length} 项遗产，点击放大`,`${g.items.length} properties, select to zoom`):s.name;return `${g.anchorX===undefined?'':`<span class="map-spread-link" style="left:${g.anchorX}px;top:${g.anchorY}px;width:${Math.hypot(g.x-g.anchorX,g.y-g.anchorY)}px;transform:rotate(${Math.atan2(g.y-g.anchorY,g.x-g.anchorX)}rad)"></span>`}<button class="country-map-pin ${g.items.length>1?'cluster':''}" data-pin="${i}" style="left:${g.x}px;top:${g.y}px" title="${esc(label)}" aria-label="${esc(label)}">${g.items.length>1?g.items.length:'<span></span>'}</button>`;}).join('');
  pins.onclick=e=>{const b=e.target.closest('[data-pin]');if(!b||moved)return;const g=groups[Number(b.dataset.pin)];
   if(g.items.length===1){openDetail(g.items[0].id);return;}
   const xs=g.items.map(p=>p.x),ys=g.items.map(p=>p.y);
   const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
   const ratio=width/height;
   const targetWidth=Math.max(.015,(maxX-minX)*1.6,(maxY-minY)*1.6*ratio);
   if(box.w>.0151&&(maxX-minX>0.0001||maxY-minY>0.0001)){
    const w=Math.max(.015,Math.min(box.w*.5,targetWidth)),h=w/ratio;
    box={x:(minX+maxX-w)/2,y:(minY+maxY-h)/2,w,h};
    selection.hidden=true;paint();surface.focus({preventScroll:true});return;
   }
   selection.hidden=false;
   const unique=[...new Set(g.items.map(p=>p.id))];
   selection.innerHTML=`<div class="country-map-selection-heading"><strong>${L('这一带的遗产','Heritage in this area')}</strong><button data-clear-selection aria-label="${L('关闭地点列表','Close location list')}">×</button></div>${unique.map(id=>{const s=SITES.find(s=>s.id===id);return `<button class="country-map-location" data-open="${id}">${esc(s.name)} <span>↗</span></button>`;}).join('')}`;
   selection.querySelector('[data-clear-selection]').onclick=()=>selection.hidden=true;
  };
 }
 function zoom(f){const w=Math.max(.015,Math.min(1100,box.w*f)),h=w*box.h/box.w;box={x:box.x+(box.w-w)/2,y:box.y+(box.h-h)/2,w,h};paint();}
 host.querySelector('.country-map-controls').onclick=e=>{const action=e.target.closest('button')?.dataset.countryZoom;if(!action)return;if(action==='reset'){box={...initial};selection.hidden=true;paint();}else zoom(action==='in'?0.6:1/0.6);};
 surface.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;moved=false;drag={x:e.clientX,y:e.clientY,box:{...box}};surface.setPointerCapture(e.pointerId);surface.classList.add('dragging');});
 surface.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;moved=Math.abs(dx)+Math.abs(dy)>4;box.x=drag.box.x-dx/surface.clientWidth*box.w;box.y=drag.box.y-dy/surface.clientHeight*box.h;paint();});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])surface.addEventListener(event,()=>{drag=null;surface.classList.remove('dragging');moved=false;});
 surface.addEventListener('keydown',e=>{if(e.target!==surface)return;const shifts={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(shifts[e.key]){e.preventDefault();box.x+=shifts[e.key][0]*box.w*.15;box.y+=shifts[e.key][1]*box.h*.15;paint();}else if(['+','=','-'].includes(e.key)){e.preventDefault();zoom(e.key==='-'?1/0.6:.6);}});
 fit();
 let lastWidth=surface.clientWidth,lastHeight=surface.clientHeight;
 const observer=new ResizeObserver(()=>{
  const w=surface.clientWidth,h=surface.clientHeight;
  if(!host.isConnected||!w||!h||(w===lastWidth&&h===lastHeight))return;
  if(!lastWidth||!lastHeight)fit();else{const nextWidth=box.h*w/h;box.x+=(box.w-nextWidth)/2;box.w=nextWidth;paint();}
  lastWidth=w;lastHeight=h;
 });observer.observe(surface);
 // Disconnect observers belonging to replaced language/country views.
 countryMapObservers.push({host,observer});
}
const countryMapObservers=[];
function hydrateCountryMaps(){
 for(let i=countryMapObservers.length-1;i>=0;i--){if(!countryMapObservers[i].host.isConnected){countryMapObservers[i].observer.disconnect();countryMapObservers.splice(i,1);}}
 document.querySelectorAll('[data-country-map]:not([data-ready])').forEach(mountCountryMap);
}
document.addEventListener('DOMContentLoaded',()=>{hydrateCountryMaps();new MutationObserver(hydrateCountryMaps).observe(document.body,{childList:true,subtree:true});});
