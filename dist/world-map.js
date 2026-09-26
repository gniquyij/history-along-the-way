// Coordinates locate named sites, never the territorial extent of a civilisation.
// Select comparable historical turning points, continuity and visitable evidence.
// Continental counts are not quotas and do not measure historical importance.
const MAP_HISTORY_ITEMS=[
['map-athens','europe',-500,-323,0,'period',['雅典 · 城邦与公共生活','Athens · City-state and public life'],['以古典时期雅典为入口，观察城邦政治、公共建筑与宗教生活。它代表一条希腊历史线索，而非整个欧洲。','Classical Athens offers an entry into city-state politics, public buildings and religious life: one Greek historical thread, not the whole of Europe.'],'greece'],
['map-rome','europe',-27,395,0,'period',['罗马 · 帝国与城市网络','Rome · Empire and urban networks'],['道路、城市、法律与军队把地中海多个地区连接起来。罗马的公共建筑提供理解帝国组织的入口。','Roads, cities, law and armies connected Mediterranean regions. Rome’s public buildings provide an entry into imperial organisation.'],'rome'],
WORLD_ITEMS.find(x=>x[0]==='eu-crown'),
WORLD_ITEMS.find(x=>x[0]==='eu-reform'),
['map-industry','europe',1750,1914,0,'period',['英国 · 工业化与社会变化','Britain · Industrialisation and social change'],['以铁桥峡谷为观察入口，理解煤、铁、生产与运输怎样改变劳动和聚落，并联系更广泛的工业社会。','Ironbridge Gorge offers an entry into how coal, iron, production and transport changed labour and settlements within wider industrial society.'],'industry'],
['map-postwar','europe',1945,1989,0,'period',['柏林 · 战后分裂与重建','Berlin · Postwar division and rebuilding'],['以柏林为入口，理解战争之后的重建、冷战分裂与公共记忆；欧洲同期也在发展不同形式的合作。','Berlin offers an entry into postwar rebuilding, Cold War division and public memory, alongside forms of cooperation elsewhere in Europe.'],'postwar'],
WORLD_ITEMS.find(x=>x[0]==='af-old'),WORLD_ITEMS.find(x=>x[0]==='af-kush'),WORLD_ITEMS.find(x=>x[0]==='af-kairouan'),WORLD_ITEMS.find(x=>x[0]==='af-zimbabwe'),WORLD_ITEMS.find(x=>x[0]==='af-askia'),WORLD_ITEMS.find(x=>x[0]==='af-prison')
];
const MAP_LOCATIONS={
'map-athens':[23.73,37.98,['雅典','Athens']],
'map-rome':[12.49,41.89,['罗马','Rome']],
'eu-crown':[6.08,50.78,['亚琛','Aachen']],
'eu-reform':[12.64,51.87,['维滕贝格','Wittenberg']],
'map-industry':[-2.48,52.63,['铁桥峡谷','Ironbridge Gorge']],
'map-postwar':[13.40,52.52,['柏林','Berlin']],
'af-old':[31.13,29.98,['孟菲斯与金字塔区','Memphis and pyramid fields']],
'af-kush':[31.82,18.53,['杰贝尔巴尔卡尔','Gebel Barkal']],
'af-kairouan':[10.10,35.68,['凯鲁万','Kairouan']],
'af-zimbabwe':[30.93,-20.27,['大津巴布韦','Great Zimbabwe']],
'af-askia':[-0.04,16.29,['加奥','Gao']],
'af-prison':[18.37,-33.81,['罗本岛','Robben Island']]
};
function equalEarthPoint(lon,lat){const m=Math.sqrt(3)/2,t=Math.asin(m*Math.sin(lat*Math.PI/180)),t2=t*t,t6=t2*t2*t2;return [50+17*(lon*Math.PI/180*Math.cos(t)/(m*(1.340264-3*.081106*t2+t6*(7*.000893+9*.003796*t2)))),50-34*t*(1.340264-.081106*t2+t6*(.000893+.003796*t2))];}
let mapZoom=1,mapPanX=0,mapPanY=0;
const mapWindow=500;
let mapYear=1,mapSelected='map-rome';
const mapDate=y=>y<0?L('公元前'+(-y)+'年',(-y)+' BCE'):L('公元'+(y===0?1:y)+'年',(y===0?1:y)+' CE');
function activeMapItems(){return MAP_HISTORY_ITEMS.filter(x=>MAP_LOCATIONS[x[0]]&&x[2]<=mapYear+mapWindow&&x[3]>=mapYear-mapWindow);}
function mapContent(){
 const active=activeMapItems();if(!active.some(x=>x[0]===mapSelected))mapSelected=active[0]?.[0]||null;
 const chosen=active.find(x=>x[0]===mapSelected);
 return `<figure class="map-figure">${sharedMapHTML('world')}</figure>`;
}
function renderWorldMap(){return `<section class="map-explorer"><div id="map-content">${mapContent()}</div><div class="map-time-controls"><input id="map-year" aria-label="${L('年代','Year')}" type="range" min="-3000" max="2026" step="1" value="${mapYear}" aria-valuetext="${mapDate(mapYear)}"><div class="map-scale"><span>${L('前3000','3000 BCE')}</span><span>${L('前2000','2000 BCE')}</span><span>${L('前1000','1000 BCE')}</span><span>${L('公元1','1 CE')}</span><span>1000</span><span>2026</span></div><div class="map-time-options"><label>${L('精确年份（负数为公元前）','Exact year (negative = BCE)')}<input id="map-year-number" type="number" min="-3000" max="2026" value="${mapYear}"></label></div></div></section>`;}
function updateMapContent(){const controls=document.querySelector('.map-time-controls');if(controls)document.querySelector('.map-explorer').append(controls);document.getElementById('map-content').innerHTML=mapContent();if(typeof embedOverviewTimeline==='function')embedOverviewTimeline();const slider=document.getElementById('map-year');slider.value=mapYear;slider.setAttribute('aria-valuetext',mapDate(mapYear));document.getElementById('map-year-number').value=mapYear;}
document.addEventListener('input',e=>{if(e.target.id==='map-year'){mapYear=Number(e.target.value);updateMapContent();}});
document.addEventListener('change',e=>{if(e.target.id==='map-year-number'){const n=Number(e.target.value);if(e.target.value!==''&&Number.isFinite(n))mapYear=Math.max(-3000,Math.min(2026,Math.round(n)));updateMapContent();}});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.mapPlace){mapSelected=b.dataset.mapPlace;if(!activeMapItems().some(x=>x[0]===mapSelected)){const item=MAP_HISTORY_ITEMS.find(x=>x[0]===mapSelected);mapYear=Math.round((item[2]+item[3])/2)||1;}const source='.map-markers';updateMapContent();document.querySelector(source+' [data-map-place="'+mapSelected+'"]')?.focus({preventScroll:true});}if(b.dataset.mapJump){mapYear=Number(b.dataset.mapJump);updateMapContent();}});

// Resize the SVG viewport to redraw at zoom resolution; markers retain their CSS size.
function mapCameraStyle(){return `width:${mapZoom*100}%;height:${mapZoom*100}%;left:calc(${(1-mapZoom)*50}% + ${mapPanX}px);top:calc(${(1-mapZoom)*50}% + ${mapPanY}px)`;}
function applyMapCamera(){const camera=document.querySelector('.map-camera');if(!camera)return;const box=camera.parentElement;const limitX=box.clientWidth*(mapZoom-1)/2,limitY=box.clientHeight*(mapZoom-1)/2;mapPanX=Math.max(-limitX,Math.min(limitX,mapPanX));mapPanY=Math.max(-limitY,Math.min(limitY,mapPanY));camera.style.cssText=mapCameraStyle();box.querySelector('.map-zoom span').textContent=Math.round(mapZoom*100)+'%';}
document.addEventListener('click',e=>{const b=e.target.closest('[data-map-zoom]');if(!b)return;mapZoom=b.dataset.mapZoom==='reset'?1:Math.max(1,Math.min(8,mapZoom*(b.dataset.mapZoom==='in'?1.5:1/1.5)));if(mapZoom===1)mapPanX=mapPanY=0;applyMapCamera();});
let mapDrag=null;
document.addEventListener('pointerdown',e=>{const box=e.target.closest('.history-map');if(!box||e.target.closest('button')||mapZoom===1)return;mapDrag={box,id:e.pointerId,x:e.clientX,y:e.clientY,px:mapPanX,py:mapPanY};box.setPointerCapture(e.pointerId);e.preventDefault();});
document.addEventListener('pointermove',e=>{if(!mapDrag||mapDrag.id!==e.pointerId)return;mapPanX=mapDrag.px+e.clientX-mapDrag.x;mapPanY=mapDrag.py+e.clientY-mapDrag.y;applyMapCamera();});
function stopMapDrag(e){if(!mapDrag||mapDrag.id!==e.pointerId)return;const d=mapDrag;mapDrag=null;if(d.box.hasPointerCapture(d.id))d.box.releasePointerCapture(d.id);}
document.addEventListener('pointerup',stopMapDrag);document.addEventListener('pointercancel',stopMapDrag);
