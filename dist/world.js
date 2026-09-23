// Exploratory world layer. Existing European data and journal remain unchanged.
'use strict';
(() => {
const windows=[['−200—500','公元前200—公元500','200 BCE–500 CE'],['800—1500','公元800—1500','800–1500 CE'],['1500—1800','公元1500—1800','1500–1800 CE']];
const regions=[['asia','亚洲','Asia'],['africa','非洲','Africa'],['north','北美洲','North America'],['southamerica','南美洲','South America'],['oceania','大洋洲','Oceania'],['antarctica','南极洲','Antarctica']];
// Period tags locate a property in a sample window; they do not date every surviving building.
const nodes=[
{id:'1442',r:'asia',w:[0,1],name:['丝绸之路：长安—天山廊道的路网','Silk Roads: Chang’an–Tianshan Corridor'],period:['汉唐都城与中亚交通网络','Han–Tang capitals and Central Asian networks'],date:['前2世纪—16世纪；此处选取两个观察窗口','2nd century BCE–16th century; two sample windows'],why:['城址、驿站和宗教建筑共同记录跨地区交流。此项遗产只是丝路网络中的一段。','Cities, way stations and religious buildings reveal exchange across regions. This property covers one corridor of the wider Silk Roads.'],see:['选择一座城址与一处佛教遗存，比较交通与信仰留下的空间。','Compare a city site and a Buddhist monument: how did travel and belief shape each place?']},
{id:'326',r:'asia',w:[0],name:['佩特拉','Petra'],period:['纳巴泰商贸城市','Nabataean caravan city'],date:['古代商路交汇点；建筑跨越多个时期','An ancient trading crossroads with multiple building phases'],why:['连接阿拉伯、埃及与叙利亚方向的商路；建筑结合当地传统与希腊化形式。','A crossroads towards Arabia, Egypt and Syria, combining local traditions with Hellenistic architectural forms.'],see:['比较岩凿立面的柱式与峡谷中的引水设施。','Compare the columns of rock-cut façades with water-management features in the gorge.']},
{id:'668',r:'asia',w:[1],name:['吴哥','Angkor'],period:['高棉帝国的都城','Capitals of the Khmer Empire'],date:['9—15世纪','9th–15th centuries'],why:['连续发展的都城与寺庙群呈现王权、宗教和城市组织的关系。','Successive capitals and temples reveal relationships between kingship, religion and urban organisation.'],see:['对照吴哥寺与巴戎寺，留意平面、浮雕和不同的宗教表达。','Compare Angkor Wat and Bayon through their plans, reliefs and religious imagery.']},
{id:'364',r:'africa',w:[1],name:['大津巴布韦','Great Zimbabwe'],period:['绍纳社会与石筑城市','Shona society and a stone-built city'],date:['11—15世纪','11th–15th centuries'],why:['石墙围合、居住空间与贸易中心呈现非洲南部的城市和政治组织。','Stone enclosures, residential spaces and a trading centre illuminate urban and political life in southern Africa.'],see:['观察大围场、山丘遗址与通道，思考空间如何组织人群。','Look at the Great Enclosure, Hill Ruins and passages: how did these spaces organise people?']},
{id:'483',r:'north',w:[1],name:['奇琴伊察','Chichen-Itza'],period:['玛雅城市与区域文化交流','Maya city and regional cultural exchange'],date:['本窗口观察其晚期发展；并非城市完整年代','This window considers later development, not the city’s full chronology'],why:['建筑与雕刻反映尤卡坦地区和墨西哥中部文化之间的交流。','Architecture and sculpture reflect exchanges between Yucatán and central Mexican traditions.'],see:['比较库库尔坎金字塔、武士神庙和天文台的形态与用途。','Compare El Castillo, the Warriors’ Temple and El Caracol in form and purpose.']},
{id:'1503',r:'oceania',w:[1],name:['南马都尔','Nan Madol'],period:['绍德雷尔王朝的仪式中心','Saudeleur ceremonial centre'],date:['约1200—1500年','c. 1200–1500'],why:['人工岛与巨石建筑呈现太平洋岛屿社会的政治、宗教与工程组织。','Artificial islets and monumental stone structures reveal political, religious and engineering organisation in Pacific island society.'],see:['观察玄武岩砌筑、岛屿分区与水道的相互关系。','Observe the relationship between basalt construction, distinct islets and waterways.']},
{id:'252',r:'asia',w:[2],name:['泰姬陵','Taj Mahal'],period:['莫卧儿帝国','Mughal Empire'],date:['陵墓主要建于1631—1648年','Mausoleum mainly built 1631–1648'],why:['帝国时期的陵墓建筑，让纪念、工艺与皇室赞助变得可见。','An imperial mausoleum makes commemoration, craftsmanship and royal patronage visible.'],see:['沿中轴比较花园、陵墓与清真寺，并观察石材镶嵌。','Follow the axis through the garden, mausoleum and mosque; examine stone inlay.']}
];
// African views consume the same dataset as records and details.
for(let i=nodes.length-1;i>=0;i--)if(nodes[i].r==='africa')nodes.splice(i,1);
nodes.push(...AFRICA_NODES);
windows.push(['−2700—−2200','约公元前2700—前2200','c. 2700–2200 BCE'],['−1550—−1070','约公元前1550—前1070','c. 1550–1070 BCE'],['1800—今天','1800年至今','1800–present'],['史前','史前（各地年代不同）','Prehistory (regional chronologies vary)']);
let view='world',win=1,region='africa';
const t=a=>L(...a),regionName=r=>{const x=regions.find(a=>a[0]===r);return L(x[1],x[2]);};
const property=n=>`<details class="world-property"><summary>${n.location?`<small>${esc(t(n.location))}</small>`:""}<span class="world-kicker">${esc(t(n.period))}</span><strong>${esc(t(n.name))}</strong>${lang==='zh'?`<small>${esc(n.name[1])}</small>`:''}<span class="world-open">${L('遗产与参观重点','Property & visiting notes')} ↗</span></summary><div class="world-property-body"><small>${esc(t(n.date))}</small><p>${esc(t(n.why))}</p><div class="visit-focus"><div class="visit-focus-label">${L('参观重点','What to look for')}</div><p>${esc(t(n.see))}</p></div><p><a href="https://whc.unesco.org/en/list/${n.id}/" target="_blank" rel="noopener">UNESCO #${n.id} ↗</a> · <a href="${mapSearch(n.name[1])}" target="_blank" rel="noopener">${L('地图','Map')} ↗</a></p></div></details>`;
const europeLink=()=>`<button data-world-era="${['rome','medieval','dynasties','prehistory','bronze','postwar','prehistory'][win]}">${L('打开欧洲对应章节','Open the European chapter')} →</button>`;
const africaChapters=AFRICA_CHAPTERS.map(c=>[...c.title,...c.date,c.ids]);
const chapterSelection={};let continentMode='timeline',selectedCountry='';
const countryOf=n=>n.location?.[1].split(' · ')[0]||'';
const mexico=nodes.find(n=>n.id==='483');mexico.location=['墨西哥 · 北美洲（中美洲文化区域）','Mexico · North America (Mesoamerican cultural region)'];
function continentLayout(){
 const config=REGIONAL_ATLASES[region];
 const chapters=config.chapters.map(c=>({id:c.id,title:t(c.title),date:t(c.date),question:t(c.question),summary:t(c.summary),next:t(c.next),ids:c.ids}));
 const index=Math.min(chapterSelection[region]||0,chapters.length-1);chapterSelection[region]=index;
 const all=SITES.filter(s=>s.continent===region),byCountry=continentMode==='country';
 const countries=[...new Set(all.flatMap(s=>s.country.split(' / ')))].map(c=>({value:COUNTRIES_EN[c],label:countryLabel(c)})).sort((a,b)=>a.label.localeCompare(b.label,lang));
 const sites=all.filter(s=>byCountry?(!selectedCountry||s.country.split(' / ').some(c=>COUNTRIES_EN[c]===selectedCountry)):chapters[index].ids.includes(s.id));
 const model={region,chapters,index,sites,mode:continentMode,selectedCountry,countryName:selectedCountry,allCountries:t(config.all),countries};
 return continentShellHTML(continentParts(model),continentMode,{tools:'continent-country-tools',country:'continent-country',mobile:'continent-era-mobile',timeline:'continent-timeline',chapter:'continent-chapter',title:'continent-result-title',count:'continent-count',sites:'continent-sites'});
}

function draw(){
 document.querySelectorAll('[data-atlas]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.atlas===(view==='europe'?'continents':view)));
 const continentNav=$('continent-nav');continentNav.hidden=!['europe','continents'].includes(view);continentNav.innerHTML=[['europe','欧洲','Europe'],...Object.entries(REGIONAL_ATLASES).map(([id,c])=>[id,...c.name])].sort((a,b)=>a[2].localeCompare(b[2],'en')).map(r=>`<button data-continent="${r[0]}" aria-pressed="${view==='europe'?r[0]==='europe':r[0]===region}">${L(r[1],r[2])}</button>`).join('');
 // One persistent navigation instance for every continent.
 const nav=document.querySelector('.navigation-row');
 nav.hidden=!['europe','continents'].includes(view);
 const isEurope=view==='europe';
 nav.querySelector('.atlas-region').textContent=isEurope?(mode==='journal'?L('跨洲参观记录 / MY VISITS','MY VISITS'):L('欧洲篇 / EUROPE','EUROPE')):L(t(REGIONAL_ATLASES[region].name)+'篇 / '+REGIONAL_ATLASES[region].name[1].toUpperCase(),REGIONAL_ATLASES[region].name[1].toUpperCase());
 $('history').setAttribute('aria-pressed',isEurope?mode==='era':continentMode==='timeline');
 $('browse').setAttribute('aria-pressed',isEurope?mode==='country':continentMode==='country');
 $('journal').setAttribute('aria-pressed',isEurope&&mode==='journal');
 $('total').textContent=SITES.filter(s=>getRecord(s.id).status==='visited').length;
 $('records-tools').hidden=!(isEurope&&mode==='journal');$('europe-main').hidden=!isEurope;$('world-main').hidden=isEurope;if(isEurope)return;
 const heading=view==='world'?L('同一时间，不同历史','Different histories, shared time'):view==='continents'?regionName(region):L('历史如何相遇','Where histories meet');
 let content='';
 if(view==='world')content=renderWorldMap();
 if(view==='continents')content=continentLayout();
 if(view==='connections')content=`<div class="connection-story"><span class="world-kicker">01 / ${L('贸易与宗教传播','Trade and religious exchange')}</span><h2>${L('东亚 ↔ 中亚','East Asia ↔ Central Asia')}</h2><p>${L('长安—天山廊道连接东亚与中亚的城市和交通节点。沿线的城址、驿站与宗教遗存，帮助我们理解商品如何流通，信仰与知识如何随人群往来传播。','The Chang’an–Tianshan corridor connects cities and transport hubs in East and Central Asia. Its city remains, way stations and religious sites help explain how goods circulated and how beliefs and knowledge travelled with people.')}</p>${property(nodes[0])}</div><div class="connection-story"><span class="world-kicker">02 / ${L('商路与建筑交流','Caravan routes and architectural exchange')}</span><h2>${L('阿拉伯 · 埃及 · 东地中海','Arabia · Egypt · Eastern Mediterranean')}</h2><p>${L('以佩特拉为观察点：商路连接不同地区，当地建筑也吸收希腊化形式。它与欧洲古代章节存在主题联系，但不能据此把两处遗产画成已证实的直达路线。','At Petra, trade connected regions and local architecture incorporated Hellenistic forms. This connects thematically with European antiquity, without establishing a direct route between individual properties.')}</p>${property(nodes[1])}<button data-world-era="greece">${L('关联阅读：希腊世界','Related reading: the Greek world')} →</button></div>`;
 $('world-main').innerHTML=`${view==='continents'?'':`<section class="world-heading"><div><span class="world-kicker">${L('世界篇 · 结构预览','WORLD · EXPLORATORY EDITION')}</span><h1>${heading}</h1><p>${L('共用年代，各地保留自己的分期。由节点进入遗产，再回到地区历史。','Shared dates, locally meaningful periods. Move from historical nodes to heritage and regional stories.')}</p></div><span class="preview-label">${L('分洲历史图谱','Regional history atlas')}</span></section>`}${content}`;
 const countrySelect=$('continent-country');if(countrySelect)countrySelect.onchange=e=>{selectedCountry=e.target.value;draw();};
 const mobile=$('continent-era-mobile');if(mobile)mobile.onchange=e=>{chapterSelection[region]=REGIONAL_ATLASES[region].chapters.findIndex(c=>c.id===e.target.value);draw();};
}
const regionalDialog=document.createElement('dialog');regionalDialog.id='regional-detail';regionalDialog.innerHTML='<div class="dialog-toolbar"><button type="button" data-regional-close aria-label="Close">×</button></div><div class="regional-detail-body"></div>';document.body.append(regionalDialog);
function showRegionalDetail(id){const n=nodes.find(x=>x.id===id);if(!n)return;regionalDialog.querySelector('.regional-detail-body').innerHTML=`<div class="location">${n.location?esc(t(n.location)):''}</div><h2 class="detail-title">${esc(t(n.name))}</h2><p class="name-en">${esc(n.name[1])}</p><div class="badges"><span class="badge unesco">UNESCO #${n.id}</span></div><h3>${L('为什么与这段历史有关','Historical connection')}</h3><p>${esc(t(n.why))}</p><h3>${L('现场观察','On-site observations')}</h3><p>${esc(t(n.see))}</p><div class="detail-links"><a href="https://whc.unesco.org/en/list/${n.id}/" target="_blank" rel="noopener">UNESCO ↗</a><a href="${mapSearch(n.name[1])}" target="_blank" rel="noopener">${L('地图搜索','Search maps')} ↗</a></div>`;regionalDialog.showModal();}
regionalDialog.addEventListener('click',e=>{if(e.target===regionalDialog){const r=regionalDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)regionalDialog.close();}});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.chapterId){if($('detail').open)$('detail').close();if(b.dataset.chapterRegion==='europe'){view='europe';navigateEra(b.dataset.chapterId);}else{region=b.dataset.chapterRegion;view='continents';continentMode='timeline';chapterSelection[region]=REGIONAL_ATLASES[region].chapters.findIndex(c=>c.id===b.dataset.chapterId);}draw();}if(b.dataset.worldRange!==undefined){worldRangeIndex=Number(b.dataset.worldRange);draw();}if(b.dataset.worldItem){worldItemId=b.dataset.worldItem;const panel=$('world-main').querySelector('.parallel-scroll');const x=panel?.scrollLeft||0;draw();$('world-main').querySelector('.parallel-scroll').scrollLeft=x;$('world-main').querySelector('[data-world-item="'+worldItemId+'"]').focus({preventScroll:true});}if(b.hasAttribute('data-global-journal')){view='europe';mode='journal';render();draw();}if(b.dataset.status)draw();if(b.hasAttribute('data-regional-close'))regionalDialog.close();if(b.dataset.regionalDetail)showRegionalDetail(b.dataset.regionalDetail);if(b.dataset.atlas){view=b.dataset.atlas;if(view==='continents'&&region==='europe')view='europe';draw();}if(b.dataset.continent){if(region!==b.dataset.continent)selectedCountry='';region=b.dataset.continent;view=region==='europe'?'europe':'continents';draw();}if(b.dataset.continentMode){continentMode=b.dataset.continentMode;draw();}if(b.dataset.continentChapter!==undefined&&!b.disabled){chapterSelection[region]=Number(b.dataset.continentChapter);draw();}if(b.dataset.window!==undefined){win=Number(b.dataset.window);draw();}if(b.dataset.africaChapter){region='africa';view='continents';continentMode='timeline';chapterSelection.africa=AFRICA_CHAPTERS.findIndex(c=>c.id===b.dataset.africaChapter);$('detail').close();draw();}if(b.dataset.worldEra){view='europe';navigateEra(b.dataset.worldEra);draw();window.scrollTo({top:0,behavior:'smooth'});}});
$('home').addEventListener('click',()=>{view='europe';draw();});
// Route the shared controls to the active continent; markup and styling stay shared.
$('history').onclick=()=>{if(view==='continents'){continentMode='timeline';}else{view='europe';mode='era';render();}draw();};
$('browse').onclick=()=>{if(view==='continents'){continentMode='country';}else{view='europe';mode='country';render();}draw();};
$('journal').onclick=()=>{view='europe';mode='journal';country='';render();draw();};
$('journal').addEventListener('click',draw);$('history').addEventListener('click',draw);$('browse').addEventListener('click',draw);$('detail').addEventListener('close',draw);
$('language').addEventListener('click',draw);$('detail-language').addEventListener('click',draw);
window.atlasRoute={
 read(){return {view,region,chapter:REGIONAL_ATLASES[region]?.chapters[chapterSelection[region]||0]?.id,continentMode,selectedCountry};},
 apply(p){view=['world','europe','continents','connections'].includes(p.get('view'))?p.get('view'):'world';region=Object.hasOwn(REGIONAL_ATLASES,p.get('region'))?p.get('region'):'africa';continentMode=p.get('mode')==='country'?'country':'timeline';selectedCountry=SITES.some(s=>s.continent===region&&s.country.split(' / ').some(c=>COUNTRIES_EN[c]===p.get('country')))?p.get('country'):'';chapterSelection[region]=Math.max(0,REGIONAL_ATLASES[region].chapters.findIndex(c=>c.id===p.get('chapter')));draw();}
};
draw();
})();
