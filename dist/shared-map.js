// A single geographic camera model for historical and geographic perspectives.
const ATLAS_CAMERAS=new Map();
const ATLAS_MAPS=new Map();
let atlasLandPromise,atlasRiverPromise;
function mapPerspectiveHTML(lens){return `<div class="map-perspective" role="group" aria-label="${L('地图视角','Map perspective')}"><span>${L('视角','View')}</span><button data-lens="history" aria-pressed="${lens==='history'}">${L('历史','History')}</button><button data-lens="geography" aria-pressed="${lens==='geography'}">${L('地理','Geography')}</button></div>`;}
function sharedMapKey(route){if(route.view==='world')return 'world';if(route.lens==='geography')return route.selectedCountry?'country:'+route.selectedCountry:'continent:'+route.region;const r=route.view==='europe'?'europe':route.region;const c=route.view==='europe'?(mode==='country'?COUNTRIES_EN[country]:''):(route.continentMode==='country'?route.selectedCountry:'');return c?'country:'+c:'continent:'+r;}
function sharedMapHTML(kind,ids=[],name=''){return `<section class="atlas-map-shell" data-shared-map="${kind}" data-map-ids="${ids.join(',')}" data-country-name="${esc(name)}"><div class="atlas-map-toolbar"><span class="atlas-map-label">${kind==='geography'?L('地形与水系','Terrain & water'):L('历史地点','Historical places')}</span><button data-fit-map>${L('适应范围','Fit view')}</button></div><div class="atlas-map-canvas" aria-label="${L('交互地图，可拖动和缩放','Interactive map: drag and zoom')}"></div><div class="atlas-map-legend"></div><p class="atlas-map-error" role="status" hidden></p></section>`;}
function inverseAtlasPoint(x,y){
 let lo=-90,hi=90;for(let i=0;i<40;i++){const mid=(lo+hi)/2;if(equalEarthPoint(0,mid)[1]*5>y)lo=mid;else hi=mid;}
 const lat=(lo+hi)/2,one=(equalEarthPoint(1,lat)[0]-50)*10;return [lat,(x-500)/one];
}
function sharedCountryPoints(ids,name){const code=COUNTRY_MAP_DATA.countries[name];return ids.flatMap(id=>{const s=SITES.find(s=>s.id===id);const ps=(COUNTRY_MAP_DATA.points[id]||[]).filter(p=>!code||p[2]===code);if(!s||!ps.length)return [];const center=ps.reduce((a,p)=>[a[0]+p[0]/ps.length,a[1]+p[1]/ps.length],[0,0]);const p=ps.reduce((a,b)=>Math.hypot(a[0]-center[0],a[1]-center[1])<=Math.hypot(b[0]-center[0],b[1]-center[1])?a:b);return [{id,label:s.name,ll:inverseAtlasPoint(p[0],p[1]),open:()=>openDetail(id)}];});}
function embedOverviewTimeline(){
 const controls=document.querySelector('.geo-world-time,.map-time-controls');
 const host=document.querySelector('.geo-world-layout .atlas-map-shell,.map-figure .atlas-map-shell');
 if(!controls||!host||controls.parentElement===host)return;
 host.classList.add('overview-map-with-time');
 host.insertBefore(controls,host.querySelector('.atlas-map-canvas'));
 const date=document.querySelector('.map-date-heading');if(date){date.classList.add('map-date-inline');controls.prepend(date);}
}
function syncCountryToolbar(){
 const nav=document.querySelector('.atlas-views');if(!nav)return;
 let dock=document.getElementById('country-toolbar');if(!dock){dock=document.createElement('label');dock.id='country-toolbar';nav.append(dock);}
 const picker=document.getElementById('continent-picker');if(picker&&picker.nextElementSibling!==dock)picker.after(dock);
 const main=document.querySelector('main:not([hidden])');
 const source=main?.querySelector('#geo-country,#continent-country,#country');
 const active=source&&!source.closest('[hidden]');dock.hidden=!active;
 let result=document.getElementById('country-result-count');if(!result){result=document.createElement('span');result.id='country-result-count';result.setAttribute('role','status');result.setAttribute('aria-live','polite');dock.after(result);}
 if(dock.nextElementSibling!==result)dock.after(result);
 result.hidden=!active;
 if(!active)return;
 const geoCount=main.querySelector('.geo-places .geo-result-count');
 const historicalCount=main.querySelector('#count,#continent-count');
 const countText=geoCount?L(geoCount.textContent.trim()+' 处遗产',geoCount.textContent.trim()+' properties'):(historicalCount?.textContent||'');
 if(result.textContent!==countText)result.textContent=countText;

 const key=source.id+'|'+source.innerHTML+'|'+source.value;
 if(dock.dataset.state===key)return;dock.dataset.state=key;
 dock.replaceChildren();
 const select=source.cloneNode(true);select.removeAttribute('id');select.value=source.value;select.setAttribute('aria-label',L('国家／地区','Country / territory'));
 select.onchange=()=>{source.value=select.value;source.dispatchEvent(new Event('change',{bubbles:true}));};dock.append(select);
}
function layoutTimelinePanes(){
 const geo=document.querySelector('.geo-timeline-layout');
 if(geo){const info=geo.querySelector('.continent-info-column'),sequence=geo.querySelector('.geo-sequence'),column=geo.querySelector('.continent-map-column');
 if(window.innerWidth>900){if(sequence&&sequence.parentElement!==geo)geo.prepend(sequence);if(column&&column.parentElement!==info)info.prepend(column);}
 else{if(column&&column.parentElement!==geo)geo.prepend(column);if(sequence&&sequence.parentElement!==geo)geo.prepend(sequence);}}
 document.querySelectorAll('.geo-timeline-layout,.workspace:not(.without-timeline)').forEach(pane=>{
 if(window.innerWidth<=900){pane.style.removeProperty('--timeline-pane-height');return;}
 const footer=document.querySelector('.atlas-footer');const footerSpace=footer?.getBoundingClientRect().height||72;
 const main=pane.closest('main');const bottomPadding=main?parseFloat(getComputedStyle(main).paddingBottom)||0:12;
 const top=pane.getBoundingClientRect().top+window.scrollY;
 const value=Math.max(180,Math.floor(window.innerHeight-top-footerSpace-bottomPadding-2))+'px';
 if(pane.style.getPropertyValue('--timeline-pane-height')!==value)pane.style.setProperty('--timeline-pane-height',value);
 });
}
window.addEventListener('resize',layoutTimelinePanes);
function hydrateSharedMaps(){
 layoutTimelinePanes();
 syncCountryToolbar();
 embedOverviewTimeline();
 if(!window.AtlasLeaflet||!window.atlasRoute)return;
 for(const [host,entry]of ATLAS_MAPS){if(!host.isConnected){entry.resize.disconnect();entry.map.remove();ATLAS_MAPS.delete(host);}}
 document.querySelectorAll('[data-shared-map]:not([data-mounted])').forEach(host=>{if(host.closest('[hidden]'))return;mountSharedMap(host);});
}
function fitAtlasToViewport(host){
 const canvas=host.querySelector('.atlas-map-canvas');if(!canvas)return;
 if(window.innerWidth<=900){canvas.style.removeProperty('--fit-map-height');host.closest('.continent-map-layout')?.style.removeProperty('--country-panel-height');return;}
 const box=canvas.getBoundingClientRect(),frame=host.getBoundingClientRect();
 const main=host.closest('main'),footer=document.querySelector('.atlas-footer');
 const mainStyle=main?getComputedStyle(main):null;
 const bottomPadding=mainStyle?parseFloat(mainStyle.paddingBottom)||0:24;
 const footerHeight=footer?.getBoundingClientRect().height||72;
 const contentTop=box.top+(main?.scrollTop||0);
 const remaining=window.innerHeight-contentTop-(frame.bottom-box.bottom)-bottomPadding-footerHeight-2;
 const height=Math.round(Math.max(180,remaining));
 if(canvas.style.getPropertyValue('--fit-map-height')!==height+'px')canvas.style.setProperty('--fit-map-height',height+'px');
 const layout=host.closest('.continent-map-layout');if(layout){const panelHeight=Math.round(host.getBoundingClientRect().height);if(layout.style.getPropertyValue('--country-panel-height')!==panelHeight+'px')layout.style.setProperty('--country-panel-height',panelHeight+'px');}
}
window.addEventListener('resize',()=>document.querySelectorAll('[data-shared-map]').forEach(fitAtlasToViewport));
function mountSharedMap(host){
 const F=window.AtlasLeaflet,route=window.atlasRoute.read(),kind=host.dataset.sharedMap,isGeo=kind==='geography',key=sharedMapKey(route);
 host.dataset.mounted='true';
 host.querySelector('.atlas-map-toolbar').hidden=true;
 fitAtlasToViewport(host);
 const map=F.map(host.querySelector('.atlas-map-canvas'),{zoomControl:false,scrollWheelZoom:false,minZoom:0,zoomSnap:.25,maxZoom:17,worldCopyJump:true,attributionControl:true});
 F.control.zoom({zoomInTitle:L('放大地图','Zoom in'),zoomOutTitle:L('缩小地图','Zoom out')}).addTo(map);map.attributionControl.setPrefix(false);map.createPane('landBase').style.zIndex=150;
 const geoOptions=window.atlasGeoOptions||(window.atlasGeoOptions={rivers:true,terrain:true});
 const attribution='<a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener">Natural Earth</a>';
 map.attributionControl.addAttribution(attribution);
 const save=()=>{const p=map.getCenter();ATLAS_CAMERAS.set(key,{center:[p.lat,p.lng],zoom:map.getZoom()});host.dataset.camera=JSON.stringify([p.lat,p.lng,map.getZoom()]);};
 let points=isGeo?host.dataset.mapIds.split(',').filter(id=>GEO_PLACES[id]).map(id=>({id,label:L(...GEO_PLACES[id].name),ll:[GEO_PLACES[id].point[1],GEO_PLACES[id].point[0]],open:()=>openGeographyPlace(id)})):kind==='world'?activeMapItems().map(item=>{const [lon,lat,name]=MAP_LOCATIONS[item[0]];return {id:item[0],label:L(...name),ll:[lat,lon],open:()=>{mapSelected=item[0];updateMapContent();document.dispatchEvent(new Event('atlas-map-selection'));}};}):sharedCountryPoints(host.dataset.mapIds.split(','),host.dataset.countryName);
 const fit=()=>{if(key==='world')map.fitBounds([[-60,-180],[75,180]],{padding:[8,8],maxZoom:2});else if(key==='country:Egypt')map.fitBounds([[21.5,24],[32.5,37]],{padding:[24,24],maxZoom:7});else if(key==='continent:africa')map.fitBounds([[-35,-18],[37,52]],{padding:[20,20]});else if(!points.length&&key.startsWith('continent:')){const bounds={europe:[[34,-25],[72,45]],north:[[5,-170],[72,-50]],southamerica:[[-56,-82],[13,-34]],oceania:[[-48,110],[20,179]]}[key.split(':')[1]];bounds?map.fitBounds(bounds,{padding:[20,20]}):map.setView([20,15],2); }else if(points.length)map.fitBounds(F.latLngBounds(points.map(p=>p.ll)),{padding:[35,35],maxZoom:isGeo?7:9});else map.setView([20,15],3);};
 const saved=ATLAS_CAMERAS.get(key);if(saved)map.setView(saved.center,saved.zoom);else fit();map.on('moveend',save);save();host.querySelector('[data-fit-map]').onclick=fit;
 {
 const toolbar=host.querySelector('.atlas-map-toolbar');toolbar.hidden=true;
 host.querySelector('[data-fit-map]').hidden=true;
 const Reset=F.Control.extend({options:{position:'topleft'},onAdd(){const box=F.DomUtil.create('div','leaflet-bar atlas-reset-control');const button=document.createElement('button');button.type='button';button.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1.8 7.2M4 4v6h6"/></svg>';button.title=L('还原视图','Reset view');button.setAttribute('aria-label',button.title);button.onclick=fit;box.append(button);F.DomEvent.disableClickPropagation(box);F.DomEvent.disableScrollPropagation(box);return box;}});
 new Reset().addTo(map);
 }

 const resize=new ResizeObserver(()=>{fitAtlasToViewport(host);map.invalidateSize({pan:false});});requestAnimationFrame(()=>fitAtlasToViewport(host));resize.observe(host.querySelector('.atlas-map-canvas'));ATLAS_MAPS.set(host,{map,resize});
 atlasLandPromise ||=fetch('land-geographic.json').then(r=>{if(!r.ok)throw Error('land');return r.json();});
 atlasLandPromise.then(data=>{if(!host.isConnected)return;F.geoJSON(data,{pane:'landBase',interactive:false,style:{fillColor:'#e2dfd2',fillOpacity:1,color:'#c1c6bb',weight:.7}}).addTo(map).bringToBack();}).catch(()=>{if(!isGeo){const e=host.querySelector('.atlas-map-error');e.hidden=false;e.textContent=L('底图未能加载，请刷新重试。','The basemap could not load. Refresh to retry.');}});
 const layer=F.layerGroup().addTo(map);
 let popupOpen=false;map.on('popupopen',()=>{popupOpen=true;});map.on('popupclose',()=>{popupOpen=false;});
 function paintMarkers(){if(popupOpen)return;layer.clearLayers();const groups=[];for(const p of points){const xy=map.latLngToContainerPoint(p.ll);if(xy.x<0||xy.y<0||xy.x>map.getSize().x||xy.y>map.getSize().y)continue;let g=groups.find(g=>g.xy.distanceTo(xy)<28);if(g)g.items.push(p);else groups.push({xy,items:[p]});}
 for(const g of groups){const many=g.items.length>1;const icon=F.divIcon({className:'atlas-leaflet-marker',html:many?`<span class="atlas-cluster">${g.items.length}</span>`:`<span class="atlas-dot ${kind==='world'&&g.items[0].id===mapSelected?'selected':''}"></span>`,iconSize:[30,30],iconAnchor:[15,15]});const title=many?L(`${g.items.length} 个地点，点击展开`,`${g.items.length} places; select to expand`):g.items[0].label;
 const marker=F.marker(g.items[0].ll,{icon,title,alt:title,keyboard:true}).addTo(layer);marker.on('click',()=>{if(!many){const point=g.items[0];if(route.view!=='world'){point.open();return;}
 const panel=document.createElement('div');panel.className='atlas-overview-popup';
 const item=kind==='world'?MAP_HISTORY_ITEMS.find(item=>item[0]===point.id):null;
 const place=isGeo?GEO_PLACES[point.id]:null;
 panel.innerHTML=`<h3>${esc(place?L(...place.name):L(...item[6]))}</h3><p>${esc(place?L(...place.text):L(...item[7]))}</p>`;
 if(place){const button=document.createElement('button');button.textContent=L('查看遗产详情','View heritage details');button.onclick=()=>openGeographyPlace(point.id);panel.append(button);}
 else{const sites=SITES.filter(s=>s.eras?.includes(item[8])||s.africaChapters?.includes(item[8])||s.regionalChapters?.includes(item[8]));for(const site of sites){const button=document.createElement('button');button.textContent=site.name;button.onclick=()=>openDetail(site.id);panel.append(button);}if(!sites.length){const button=document.createElement('button');button.textContent=L('查看历史章节','Explore chapter');if(item[1]==='europe')button.dataset.worldEra=item[8];else{button.dataset.chapterId=item[8];button.dataset.chapterRegion=item[1];}panel.append(button);}}
 marker.bindPopup(panel,{maxWidth:320,maxHeight:280}).openPopup();return;}if(map.getZoom()<16){map.fitBounds(F.latLngBounds(g.items.map(p=>p.ll)),{padding:[60,60],maxZoom:Math.min(17,map.getZoom()+3)});return;}const menu=document.createElement('div');menu.className='atlas-place-menu';for(const p of g.items){const b=document.createElement('button');b.textContent=p.label;b.onclick=()=>{map.closePopup();p.open();};menu.append(b);}marker.bindPopup(menu).openPopup();});}}
 map.on('moveend',paintMarkers);map.on('popupclose',()=>requestAnimationFrame(paintMarkers));paintMarkers();
 const legend=host.querySelector('.atlas-map-legend');
 if(!isGeo){if(kind==='world'){legend.hidden=true;const controls=host.querySelector('.map-time-controls');if(controls)controls.title=L('地点对应所选年代；底图为现代陆地轮廓。','Places reflect the selected dates; the basemap shows modern land outlines.');}else{legend.hidden=true;const Info=F.Control.extend({options:{position:'topright'},onAdd(){const panel=F.DomUtil.create('div','atlas-layer-control atlas-marker-info');panel.innerHTML=`<details class="map-layer-info"><summary aria-label="${L('地图标记说明','About map markers')}">i</summary><p>${L('圆点表示遗产地点；数字表示聚合的地点数量，点击可展开。','Dots mark heritage locations; numbers show how many locations are grouped together. Select a group to expand it.')}</p></details>`;F.DomEvent.disableClickPropagation(panel);F.DomEvent.disableScrollPropagation(panel);return panel;}});new Info().addTo(map);}return;}


 const topo=F.tileLayer('https://a.tile.opentopomap.org/{z}/{x}/{y}.png',{maxZoom:17,maxNativeZoom:17,attribution:'© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>, SRTM · © <a href="https://opentopomap.org" target="_blank" rel="noopener">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA</a>)'});
 let errors=0;topo.on('tileerror',()=>{if(++errors<2)return;const e=host.querySelector('.atlas-map-error');e.hidden=false;e.textContent=L('地形服务暂时未能加载，地点仍可查看。','Terrain tiles are temporarily unavailable; places remain accessible.');});topo.on('tileload',()=>{errors=0;host.querySelector('.atlas-map-error').hidden=true;});if(geoOptions.terrain)topo.addTo(map);
 const rivers=F.layerGroup();if(geoOptions.rivers)rivers.addTo(map);
 atlasRiverPromise ||=fetch('world-rivers.json').then(r=>{if(!r.ok)throw Error('river');return r.json();});
 atlasRiverPromise.then(data=>{if(!host.isConnected)return;
 function paintRivers(){rivers.clearLayers();F.geoJSON(data,{filter:f=>map.getZoom()+2>=Math.min(5,Number(f.properties.min_zoom)||0),style:{color:'#277596',weight:1.8,opacity:.8},onEachFeature:(feature,line)=>{const name=feature.properties.name_en||feature.properties.name;if(name)line.bindTooltip(name,{sticky:true});}}).addTo(rivers);}
 map.on('zoomend',paintRivers);paintRivers();
 }).catch(()=>{if(!host.isConnected)return;const e=host.querySelector('.atlas-map-error');e.hidden=false;e.textContent=L('河流图层未能加载，请刷新重试。','The river layer could not load. Refresh to retry.');});
 legend.hidden=true;
 const Layers=F.Control.extend({options:{position:'topright'},onAdd(){const panel=F.DomUtil.create('div','atlas-layer-control');F.DomEvent.disableClickPropagation(panel);F.DomEvent.disableScrollPropagation(panel);return panel;}});
 const layersControl=new Layers().addTo(map),layerPanel=layersControl.getContainer();
 layerPanel.innerHTML=`<div class="terrain-switches"><label><input type="checkbox" data-terrain ${geoOptions.terrain?'checked':''}>${L('地形与等高线','Terrain & contours')}</label><label><input type="checkbox" data-rivers ${geoOptions.rivers?'checked':''}>${L('主要河流','Major rivers')}</label><details class="map-layer-info"><summary aria-label="${L('地图说明','About this map')}">i</summary><p>${L('底图显示现今地形；圆点标示遗产的代表位置。','The basemap shows present-day terrain; dots mark representative heritage locations.')}</p></details></div>`;
 layerPanel.querySelector('[data-terrain]').onchange=e=>{geoOptions.terrain=e.target.checked;e.target.checked?topo.addTo(map):map.removeLayer(topo);};layerPanel.querySelector('[data-rivers]').onchange=e=>{geoOptions.rivers=e.target.checked;e.target.checked?rivers.addTo(map):map.removeLayer(rivers);};
}
let atlasLayoutFrame=0;
function refreshAtlasLayout(){
 cancelAnimationFrame(atlasLayoutFrame);
 atlasLayoutFrame=requestAnimationFrame(()=>{
  layoutTimelinePanes();
  for(const [host,entry]of ATLAS_MAPS){if(host.isConnected&&!host.closest('[hidden]')){fitAtlasToViewport(host);entry.map.invalidateSize({pan:false});}}
 });
}
document.addEventListener('DOMContentLoaded',()=>{
 hydrateSharedMaps();
 new MutationObserver(()=>{hydrateSharedMaps();refreshAtlasLayout();}).observe(document.body,{childList:true,subtree:true});
 const chromeResize=new ResizeObserver(refreshAtlasLayout);
 for(const element of document.querySelectorAll('.top,.atlas-footer'))chromeResize.observe(element);
 document.fonts?.ready.then(refreshAtlasLayout);
 refreshAtlasLayout();
});
window.addEventListener('load',refreshAtlasLayout);

