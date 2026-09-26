// Geography is an editorial lens; schematic features are not survey geometry.
const GEO_TOPICS=[{id:'river',ids:[]},{id:'desert',ids:['1186']},{id:'coast',ids:[]},{id:'settlement',ids:['88']}];
// A chronological reading sequence, not a uniformly scaled geological axis.
const GEO_STAGES=[
 {topic:'desert',date:['约4300万—4000万年前','c. 43–40 million years ago'],era:['始新世','Eocene'],title:['海洋留下的证据','Traces of an ancient sea'],region:['埃及 · 鲸鱼谷','Egypt · Wadi Al-Hitan'],source:'https://whc.unesco.org/document/117412',text:['鲸鱼谷的始新世海相岩层与早期鲸类化石，保存了这里曾是海洋的证据。今天在沙漠中，可以读到这段环境变迁。','Eocene marine rocks and early whale fossils at Wadi Al-Hitan preserve evidence of a former sea. Today, the desert exposes this environmental record.']},
 {topic:'coast',date:['约3200万—2500万年前','c. 32–25 million years ago'],era:['渐新世','Oligocene'],title:['红海裂谷开始形成','The Red Sea rift develops'],region:['非洲东北部 · 红海','Northeastern Africa · Red Sea'],source:'https://www.usgs.gov/publications/timing-uplift-volcanism-and-rifting-peripheral-red-sea-a-case-passive-rifting',text:['红海区域的断裂与伸展逐步展开，随后经历沉降、海水进入与边缘抬升。今天的海湾与山地，是长期演化的结果。','Rifting and extension developed around the Red Sea, followed by subsidence, marine incursions and uplift along its margins. Today’s gulfs and mountains reflect this long evolution.']},
 {topic:'settlement',date:['1960—1980年','1960–1980'],era:['现代','Modern'],title:['水利工程改变景观','Engineering reshapes the landscape'],region:['埃及、苏丹 · 努比亚','Egypt and Sudan · Nubia'],source:'https://whc.unesco.org/en/list/88/',text:['阿斯旺高坝蓄水改变了努比亚的河谷景观。联合国教科文组织组织国际援救行动，将包括阿布辛贝在内的重要古迹迁往高处。今天看到的地点，也包含现代工程留下的改变。','The Aswan High Dam transformed Nubia’s river landscape. A UNESCO-led international campaign relocated monuments including Abu Simbel to higher ground. Their present settings reflect modern engineering as well as ancient history.']},
 {topic:'river',date:['今天','Today'],era:['当代地貌','Present landscape'],title:['河谷与三角洲','Valley and delta'],region:['埃及 · 尼罗河','Egypt · Nile'],source:'https://science.nasa.gov/earth/earth-observatory/foggy-nile-152302/',text:['沿尼罗河向北，狭长河谷展开为三角洲。把地形、水系与遗产位置放在一起，观察耕地、城市和沙漠边缘之间的关系。','Following the Nile north, the narrow valley opens into a delta. Compare terrain, water and heritage locations to see how farmland and settlements relate to the desert edge.']}
];
const GEO_PLACES={
'88':{heritageType:'cultural',historyId:'88',connection:['高坝蓄水与古迹迁移，是这里环境与历史的直接联系。','Reservoir flooding and monument relocation directly connect this landscape with its history.'],name:['阿布辛贝至菲莱的努比亚遗址','Nubian monuments from Abu Simbel to Philae'],point:[31.63,22.34],text:['以阿布辛贝为代表位置，结合纳赛尔湖与遗产搬迁理解今天的景观。','Shown at Abu Simbel: consider Lake Nasser and the relocation of monuments when reading today’s landscape.']},
'1186':{heritageType:'natural',name:['鲸鱼谷','Wadi Al-Hitan (Whale Valley)'],point:[30.18,29.27],text:['自然遗产：观察鲸类化石与沉积岩，理解沙漠中保存的海洋环境证据。','Natural heritage: whale fossils and sedimentary rocks preserve evidence of a marine environment within today’s desert.']}
};
const GEO_ATLASES={
 africa:{name:['非洲','Africa'],summary:['从古老地壳、海洋沉积到裂谷、沙漠和湿地，沿不同地点阅读大陆的自然过程。','Explore ancient crust, marine deposits, rifts, deserts and wetlands through distinct places across the continent.']},
 europe:{name:['欧洲','Europe'],summary:['海岸岩层、造山构造、冰川与火山，留下了不同时期的地形线索。','Coastal strata, mountain-building structures, glaciers and volcanoes reveal different chapters of the landscape.']},
 north:{name:['北美洲','North America'],summary:['从峡谷暴露的古老岩层，到海洋地壳、地热和沙丘，观察地表与深部过程的联系。','From ancient canyon strata to ocean crust, geothermal features and dunes, explore links between surface and deep-Earth processes.']},
 southamerica:{name:['南美洲','South America'],summary:['沿冰川、瀑布、洪泛森林与火山岛，比较山地、河流和海洋如何塑造环境。','Compare the influence of mountains, rivers and oceans through glaciers, waterfalls, flooded forests and volcanic islands.']},
 oceania:{name:['大洋洲','Oceania'],summary:['砂岩、冰川谷地、珊瑚礁和海湾，呈现侵蚀、冰与生命共同塑造的地貌。','Sandstone, glacial valleys, reefs and bays reveal landscapes shaped by erosion, ice and living organisms.']}
};
const GEO_COUNTRIES={Egypt:'埃及','South Africa':'南非',Namibia:'纳米比亚',Botswana:'博茨瓦纳',Zambia:'赞比亚',Zimbabwe:'津巴布韦',Ethiopia:'埃塞俄比亚',Madagascar:'马达加斯加','France (Réunion)':'法国（留尼汪）',Chad:'乍得',Kenya:'肯尼亚',Tanzania:'坦桑尼亚',Mauritania:'毛里塔尼亚',Senegal:'塞内加尔',Tunisia:'突尼斯','United Kingdom':'英国',Italy:'意大利',Switzerland:'瑞士',Iceland:'冰岛',Croatia:'克罗地亚','United States':'美国',Canada:'加拿大',Mexico:'墨西哥',Argentina:'阿根廷',Brazil:'巴西',Ecuador:'厄瓜多尔',Australia:'澳大利亚','New Zealand':'新西兰'};
const GEO_PERIODS={deep:['前寒武纪记录','Precambrian records'],meso:['中生代记录','Mesozoic records'],ceno:['新生代记录','Cenozoic records'],ice:['冰期地貌','Glacial landscapes'],human:['现代人为改变','Modern human changes'],ongoing:['今天仍可观察的过程','Processes observable today']};
for(const stage of GEO_STAGES){Object.assign(stage,{continent:'africa',countries:['Egypt'],ids:GEO_TOPICS.find(t=>t.id===stage.topic).ids,period:stage.topic==='settlement'?'human':stage.topic==='river'?'ongoing':'ceno',age:stage.topic==='desert'?43:stage.topic==='coast'?32:0});}
Object.assign(GEO_PLACES['1186'],{continent:'africa',countries:['Egypt'],date:GEO_STAGES[0].date});Object.assign(GEO_PLACES['88'],{continent:'africa',countries:['Egypt'],date:GEO_STAGES[2].date});
for(const entry of GEO_ADDITIONS){
 GEO_PLACES[entry.id]={...entry,continent:entry.region};
 GEO_STAGES.push({topic:'geo-'+entry.id,continent:entry.region,countries:entry.countries,ids:[entry.id],date:entry.date,era:GEO_PERIODS[entry.period],title:entry.title,region:[entry.countries.map(c=>GEO_COUNTRIES[c]).join(' / '),entry.countries.join(' / ')],source:entry.source,text:entry.text,period:entry.period,age:entry.age});
}
Object.assign(GEO_PLACES['1186'],{see:['沿开放步道观察鲸类骨骼与周围沉积岩的关系，把化石放回当时的海洋环境中理解。','Along the designated trails, read whale skeletons together with the surrounding sedimentary rocks as evidence of a former marine environment.']});
Object.assign(GEO_PLACES['88'],{see:['对照湖岸、高处神庙与搬迁前的位置，观察蓄水如何改变河谷及古迹的地理环境。','Compare the lake shore and relocated temples with their former settings to understand how impoundment changed the valley.']});
let geoTopic='all',geoPage=1;
const geographyCountryName=c=>L(GEO_COUNTRIES[c]||c,c);
function geographyCountries(region){return [...new Set(GEO_STAGES.filter(s=>s.continent===region).flatMap(s=>s.countries))].sort((a,b)=>a.localeCompare(b,'en'));}
function geographyStages(route){return GEO_STAGES.filter(s=>(route.view==='world'||s.continent===route.region)&&(!route.selectedCountry||route.view==='world'||s.countries.includes(route.selectedCountry))).sort((a,b)=>Object.keys(GEO_PERIODS).indexOf(a.period)-Object.keys(GEO_PERIODS).indexOf(b.period)||b.age-a.age);}
function geographyTimelineHTML(stages){return `<aside class="geo-sequence"><div class="geo-sequence-heading"><h2>${L('景观的形成','Landscape through time')}</h2><p>${L('年代对应所述记录或过程','Dates refer to the record or process described')}</p></div><label class="geo-mobile-picker"><span>${L('选择地理节点','Choose a landscape chapter')}</span><select id="geo-stage-select"><option value="all" ${geoTopic==='all'?'selected':''}>${L('全部地点','All places')}</option>${Object.entries(GEO_PERIODS).map(([period,title])=>{const items=stages.filter(s=>s.period===period);return items.length?`<optgroup label="${L(...title)}">${items.map(s=>`<option value="${s.topic}" ${geoTopic===s.topic?'selected':''}>${L(...s.date)} · ${L(...s.title)}</option>`).join('')}</optgroup>`:'';}).join('')}</select></label><nav class="geo-time-list" aria-label="${L('地理演变时间线','Landscape chronology')}"><button data-geo-topic="all" aria-pressed="${geoTopic==='all'}"><strong>${L('全部地点','All places')}</strong></button>${Object.entries(GEO_PERIODS).map(([period,title])=>{const items=stages.filter(s=>s.period===period);return items.length?`<div class="geo-period-label">${L(...title)}</div>${items.map(s=>`<button data-geo-topic="${s.topic}" aria-pressed="${geoTopic===s.topic}"><span class="geo-time-date">${L(...s.date)}</span><strong>${L(...s.title)}</strong><span class="geo-time-era">${s.countries.map(geographyCountryName).join(' / ')}</span></button>${geoTopic===s.topic?`<p class="timeline-context">${esc(L(...s.text))}</p>`:''}`).join('')}`:'';}).join('')}</nav></aside>`;}
const GEO_OVERVIEW_TEXT={
 deep:['从早期地壳到大型撞击，岩石保存了远早于人类历史的记录。这里的年代对应岩石或事件，不是今天地貌的形成时间。','From early crust to major impacts, rocks preserve records far older than human history. Dates refer to rocks or events, not the age of today’s landforms.'],
 meso:['海洋沉积、碳酸盐台地与化石，记录了中生代的环境。今天可以在海崖和山地中看到这些记录。','Marine sediments, carbonate platforms and fossils record Mesozoic environments. Today, these records are exposed in coastal cliffs and mountains.'],
 ceno:['火山活动、海洋环境变化、裂谷与侵蚀，留下了不同的地质记录。选择地点，查看该过程的具体年代。','Volcanism, changing marine environments, rifting and erosion left distinct records. Select a place to see the dates of the particular process.'],
 ice:['冰川反复推进和退缩，留下峡湾、湖泊和陡峭谷地。地形保留着过去冰川作用的痕迹。','Repeated glacier advances and retreats left fjords, lakes and steep valleys. Their shapes retain evidence of past glaciation.'],
 human:['水利工程能在几十年内改变河谷与湖岸。努比亚的古迹搬迁，连接了现代环境变化与遗产保护。','Water engineering can transform valleys and lake shores within decades. Monument relocation in Nubia connects modern environmental change with heritage conservation.'],
 ongoing:['河流、风、冰川、火山与生物仍在塑造地表。这里汇集今天可观察的过程，不表示这些地点都在同一时期形成。','Rivers, wind, glaciers, volcanoes and living organisms continue to shape the surface. These are processes observable today, not places formed at the same time.']
};
function geographyOverviewHTML(){
 const periods=Object.keys(GEO_PERIODS),fromStage=GEO_STAGES.find(s=>s.topic===geoTopic)?.period;
 const key=geoTopic.startsWith('period-')&&periods.includes(geoTopic.slice(7))?geoTopic.slice(7):fromStage||'deep';geoTopic='period-'+key;
 const index=periods.indexOf(key),stages=GEO_STAGES.filter(s=>s.period===key),ids=[...new Set(stages.flatMap(s=>s.ids))];
 return `<section class="geo-world-time" aria-label="${L('地理时间轴','Geographic timeline')}"><input id="geo-world-time" aria-label="${L('地理时期','Geographic period')}" type="range" min="0" max="${periods.length-1}" step="1" value="${index}" aria-valuetext="${L(...GEO_PERIODS[key])}"><div class="geo-world-ticks">${periods.map(k=>`<button data-geo-topic="period-${k}" aria-pressed="${k===key}">${L(...GEO_PERIODS[k])}</button>`).join('')}</div></section><div class="geo-world-layout"><div class="geo-main-panel">${sharedMapHTML('geography',ids)}</div></div>`;
}
function geographySourceHTML(url,label='UNESCO'){return `<details class="geo-sources"><summary>${L('资料来源','Sources')}</summary><a href="${url}" target="_blank" rel="noopener">${label}</a></details>`;}
function geographyHTML(route){
 if(route.view==='world')return geographyOverviewHTML();
 const byCountry=route.continentMode!=='timeline';if(byCountry)geoTopic='all';
 const world=route.view==='world',config=GEO_ATLASES[route.region],stages=geographyStages(route);
 if(geoTopic!=='all'&&!stages.some(s=>s.topic===geoTopic))geoTopic='all';
 const stage=stages.find(s=>s.topic===geoTopic),ids=[...new Set((stage?[stage]:stages).flatMap(s=>s.ids))];
 const countries=geographyCountries(route.region),pages=Math.max(1,Math.ceil(ids.length/5));geoPage=Math.max(1,Math.min(geoPage,pages));
 const pageIds=ids.slice((geoPage-1)*5,geoPage*5);
 const title=world?L('地理总览','Geographic overview'):route.selectedCountry?geographyCountryName(route.selectedCountry):L(...config.name);
 return `<section class="geo-heading">${!world&&byCountry?`<label class="geo-country-label">${L('国家／地区','Country / territory')}<select id="geo-country"><option value="">${L('整个','All ')}${L(...config.name)}</option>${countries.map(c=>`<option value="${esc(c)}" ${route.selectedCountry===c?'selected':''}>${esc(geographyCountryName(c))}</option>`).join('')}</select></label>`:''}</section>

 <div class="continent-map-layout geo-continent-layout ${byCountry?'':'geo-timeline-layout'}"><div class="continent-map-column">${sharedMapHTML('geography',ids,route.selectedCountry||'')}</div><div class="continent-info-column">${byCountry?'':geographyTimelineHTML(stages)}${stage?`<article class="geo-stage"><div class="geo-stage-meta"><span>${L(...stage.date)}</span><span>${L(...stage.region)}</span></div><h2>${L(...stage.title)}</h2><p>${L(...stage.text)}</p>${stage.ids.length?'':geographySourceHTML(stage.source,new URL(stage.source).hostname)}</article>`:''}
 ${ids.length?`<section class="geo-places"><h2>${L('观察地点','Places to explore')} <span class="geo-result-count">${ids.length}</span></h2>${pageIds.map(id=>{const place=GEO_PLACES[id];return `<article class="site-card" data-card-geography="${id}" tabindex="0" aria-label="${esc(L(...place.name))}"><div class="site-top"><div><span class="world-kicker">${geographyPlaceType(place)} · ${place.countries.map(geographyCountryName).join(' / ')}</span><h3>${esc(L(...place.name))}</h3>${nameLines(geographyNameRecord(id))}</div>${geographyCardStatusHTML(id)}</div>${stage?'':`<p>${esc(L(...place.text))}</p>`}${place.see?`<div class="visit-focus"><div class="visit-focus-label">${L('地理观察','What to observe')}</div><p>${esc(L(...place.see))}</p></div>`:''}</article>`;}).join('')}${pages>1?`<nav class="geo-pagination" aria-label="${L('观察地点分页','Place pages')}"><button data-geo-page="${geoPage-1}" ${geoPage===1?'disabled':''}>${L('上一页','Previous')}</button><span>${geoPage} / ${pages}</span><button data-geo-page="${geoPage+1}" ${geoPage===pages?'disabled':''}>${L('下一页','Next')}</button></nav>`:''}</section>`:''}
 </div></div>`;
}
function mountGeographyMap(){if(typeof hydrateSharedMaps==='function')hydrateSharedMaps();}

function geographyPlaceType(place){return place.heritageType==='natural'?L('世界自然遗产','Natural World Heritage'):L('相关文化遗产 · 环境与历史','Related cultural heritage · environment & history');}
function geographyHistoryLink(place){return place.historyId&&place.connection?`<p>${esc(L(...place.connection))}</p><button data-geo-history="${place.historyId}">${L('查看相关历史','Explore the historical connection')}</button>`:'';}
function geographyNameRecord(id){const p=GEO_PLACES[id];return {id,nameEn:p.name[1]};}
function geographyDetailHTML(id){
 const place=GEO_PLACES[id];if(!place)return '';
 const stage=GEO_STAGES.find(s=>s.ids.includes(String(id)));
 return `<div class="dialog-toolbar"><button data-geo-close aria-label="${L('关闭详情','Close details')}">×</button></div><div class="geo-detail-body">${heritageDetailHTML({lens:'geography',id,location:place.countries.map(geographyCountryName).join(' / '),name:L(...place.name),names:nameLines(geographyNameRecord(id),true),date:L(...place.date),contextTitle:stage?L(...stage.title):L('景观与形成','Landscape and formation'),context:L(...place.text),observation:L(...place.see),map:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(place.point[1]+','+place.point[0]),reading:readingHTML(id,GEOGRAPHY_BOOKS),extra:geographyHistoryLink(place)})}</div>`;
}
function openGeographyPlace(id){
 const place=GEO_PLACES[id];if(!place)return;
 let dialog=document.getElementById('geo-detail');
 if(!dialog){dialog=document.createElement('dialog');dialog.id='geo-detail';dialog.setAttribute('aria-labelledby','geo-detail-title');document.body.append(dialog);}
 dialog.dataset.site=id;
 dialog.onclose=()=>document.dispatchEvent(new Event('atlas-detail-change'));
 dialog.innerHTML=geographyDetailHTML(id);
 dialog.querySelector('[data-geo-close]').onclick=()=>dialog.close();
 const history=dialog.querySelector('[data-geo-history]');if(history)history.onclick=()=>{dialog.close();openDetail(place.historyId);};
 dialog.onclick=e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}};
 const feedback=()=>{dialog.querySelector('#geo-note-status').textContent=save()?L('已保存到当前浏览器。','Saved in this browser.'):L('保存失败，请导出备份。','Saving failed. Please export a backup.');};
 dialog.querySelectorAll('[data-geo-status]').forEach(button=>{button.onclick=()=>{const value=button.dataset.geoStatus;records[id]={...getRecord(id),status:getRecord(id).status===value?'none':value};feedback();dialog.querySelectorAll('[data-geo-status]').forEach(b=>b.setAttribute('aria-pressed',getRecord(id).status===b.dataset.geoStatus));};});
 dialog.querySelector('#geo-note').addEventListener('input',event=>{records[id]={...getRecord(id),note:event.target.value};feedback();});
 dialog.showModal();document.dispatchEvent(new Event('atlas-detail-change'));
}

function geographyCardStatusHTML(id){return `<div class="status">${['wish','visited'].map(value=>`<button data-geo-card-status="${value}" data-id="${id}" aria-pressed="${getRecord(id).status===value}">${value==='wish'?L('想去','Want to visit'):L('已到访','Visited')}</button>`).join('')}</div>`;}
document.addEventListener('click',event=>{const button=event.target.closest('[data-geo-card-status]');if(!button)return;const id=button.dataset.id,value=button.dataset.geoCardStatus;records[id]={...getRecord(id),status:getRecord(id).status===value?'none':value};const ok=save();button.closest('.status').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',getRecord(id).status===b.dataset.geoCardStatus));if(!ok)button.title=storageMessage();});
