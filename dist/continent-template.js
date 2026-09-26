function heritageCardHTML(s){return `<article class="site-card" data-card-history="${s.id}" tabindex="0" aria-label="${esc(s.name)}"><div class="site-top"><div><div class="location">${esc(s.city)} · ${esc(s.period)}</div><h3>${esc(s.name)}</h3>${nameLines(s)}</div>${statusButtons(s)}</div><div class="badges"><span class="badge unesco">UNESCO ${L('世界遗产','World Heritage')} · ${s.id}</span><span class="badge">${s.relation}</span></div><p class="site-context">${esc(s.why)}</p><div class="visit-focus"><div class="visit-focus-label"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m15 9-2 4-4 2 2-4Z"/></svg><span>${L('参观重点','What to look for')}</span></div><p>${esc(s.see)}</p></div></article>`;}
// All continents provide data to these templates; no continent-specific card markup.
function continentParts(model){
 const {chapters,index,groups=[],sites,selectedCountry='',mode:pageMode}=model;
 const byCountry=pageMode==='country',journal=pageMode==='journal',chapter=chapters[index];
 const countryOptions=`<option value="">${esc(model.allCountries)}</option>`+model.countries.map(c=>`<option value="${esc(c.value)}"${selectedCountry===c.value?' selected':''}>${esc(c.label)}</option>`).join('');
 const option=c=>`<option value="${esc(c.id)}" ${chapter?.id===c.id?'selected':''}>${esc(c.date)} · ${esc(c.title)}</option>`;
 const button=c=>`<button data-chapter-id="${esc(c.id)}" data-chapter-region="${model.region}" aria-pressed="${!byCountry&&chapter?.id===c.id}"><small>${esc(c.date)}</small>${esc(c.title)}</button>${!byCountry&&chapter?.id===c.id?`<p class="timeline-context">${esc(c.summary)}</p>`:''}`;
 const grouped=(render,wrapper)=>groups.length?groups.map(g=>wrapper(g,chapters.filter(c=>g.ids.includes(c.id)).map(render).join(''))).join(''):chapters.map(render).join('');
 const options=grouped(option,(g,body)=>`<optgroup label="${esc(g.title)}">${body}</optgroup>`);
 const timeline=grouped(button,(g,body)=>`<section class="period-group"><div class="period-heading">${esc(g.title)}${g.date?`<small>${esc(g.date)}</small>`:''}</div>${body}</section>`);
 let content='',map='';
 if(byCountry)map=typeof countryMapHTML==='function'?countryMapHTML(sites,model.countryName||''):'';
 else if(journal)content=`<div class="chapter-card"><h2>${L('想去与已到访的地点','Places to visit and visited')}</h2><p>${model.journalSummary||''}</p></div>`;
 else if(chapter)content=`<div class="chapter-card">${chapter.period?`<div class="period-tag">${esc(chapter.period)}</div>`:''}<div class="date">${esc(chapter.date)} · ${L('章节','Chapter')} ${index+1} / ${chapters.length}</div><h2>${esc(chapter.title)}</h2><p class="question">${esc(chapter.question)}</p><p class="summary">${esc(chapter.summary)}</p><p class="next"><strong>${L('历史之间的联系','Connections')}</strong>　${esc(chapter.next)}</p><div class="chapter-actions"><button data-chapter-id="${chapters[Math.max(0,index-1)].id}" data-chapter-region="${model.region}" ${index===0?'disabled':''}>← ${L('上一章','Previous')}</button><button data-chapter-id="${chapters[Math.min(chapters.length-1,index+1)].id}" data-chapter-region="${model.region}" ${index===chapters.length-1?'disabled':''}>${L('下一章','Next')} →</button></div></div>`;
 if(!byCountry&&!journal&&typeof sharedMapHTML==='function')map=sharedMapHTML('country',sites.map(s=>s.id));
 const cards=continentListHTML(model);
 return {countryOptions,options,timeline,content,map,cards,title:journal?L('我的地点与笔记','My places and notes'):L('关联的世界遗产','Related World Heritage'),count:L(`${sites.length} 处遗产`,`${sites.length} properties`)};
}
function continentShellHTML(parts,mode,ids){
 const byCountry=mode==='country',timeline=mode==='timeline';
 return `<section class="intro country-controls" id="${ids.tools}" ${byCountry?'':'hidden'}><div class="tools"><label><span data-zh="国家（显示全部时期）" data-en="Country (all periods)">${L('国家（显示全部时期）','Country (all periods)')}</span><select id="${ids.country}">${parts.countryOptions}</select></label></div></section><div class="workspace ${timeline?'':'without-timeline'}"><aside ${timeline?'':'hidden'}><div class="rail-title"><b data-zh="历史时间轴" data-en="Timeline">${L('历史时间轴','Timeline')}</b><span data-zh="主题分期 · 非等距" data-en="Themes · not to scale">${L('主题分期 · 非等距','Themes · not to scale')}</span></div><label class="mobile-era"><span data-zh="选择历史阶段" data-en="Choose a chapter">${L('选择历史阶段','Choose a chapter')}</span><select id="${ids.mobile}">${parts.options}</select></label><nav class="shared-timeline" id="${ids.timeline}" aria-label="${L('选择历史时代','Choose a historical period')}">${parts.timeline}</nav></aside><div class="content continent-map-layout"><div class="continent-map-column" id="${ids.chapter}-map">${parts.map||''}</div><div class="continent-info-column"><section id="${ids.chapter}" aria-live="polite">${parts.content}</section><section class="results"><div class="result-heading"><h2 id="${ids.title}">${parts.title}</h2><span id="${ids.count}">${parts.count}</span></div><div class="heritage-list" id="${ids.sites}">${parts.cards}</div></section></div></div></div>`;
}
const EUROPE_TEMPLATE_IDS={tools:'country-tools',country:'country',mobile:'era-mobile',timeline:'timeline',chapter:'chapter',title:'result-title',count:'count',sites:'sites'};
function europeViewModel(){
 const chapters=ERAS.map(e=>({...e,period:periodLabel(e.id)}));
 return {region:'europe',chapters,index:Math.max(0,chapters.findIndex(c=>c.id===selected)),groups:PERIODS.map(p=>({title:L(p.zh,p.en),date:L(p.dateZh,p.dateEn),ids:p.eras})),sites:visibleSites(),mode:mode==='era'?'timeline':mode,selectedCountry:country,countryName:COUNTRIES_EN[country]||'',allCountries:L('整个欧洲','All Europe'),countries:countryNames.map(c=>({value:c,label:countryLabel(c)})).sort((a,b)=>a.label.localeCompare(b.label,lang)),journalSummary:L('到访状态与笔记保存在当前浏览器，可通过下方导出备份。','Visit status and notes are saved in this browser. Export a backup below.')};
}

// Add a curated continent here; the shared renderer owns its presentation.
const REGIONAL_ATLASES={africa:{name:['非洲','Africa'],all:['整个非洲','All Africa'],chapters:typeof AFRICA_CHAPTERS==='undefined'?[]:AFRICA_CHAPTERS},...(typeof ADDITIONAL_ATLASES==='undefined'?{}:ADDITIONAL_ATLASES)};

const CONTINENT_PAGE_SIZE=5;
const continentListState=new Map();
function continentListHTML(model){
 const key=model.mode+'|'+(model.selectedCountry||'');
 let state=continentListState.get(model.region);
 if(!state||state.key!==key)state={key,page:1};
 state.model=model;continentListState.set(model.region,state);
 const isCountry=model.mode==='country';
 if(isCountry&&!model.selectedCountry)return ''; 
 const total=model.sites.length,pages=isCountry?Math.max(1,Math.ceil(total/CONTINENT_PAGE_SIZE)):1;
 state.page=Math.max(1,Math.min(state.page,pages));
 const start=isCountry?(state.page-1)*CONTINENT_PAGE_SIZE:0;
 const shown=isCountry?model.sites.slice(start,start+CONTINENT_PAGE_SIZE):model.sites;
 const groups={};for(const site of shown)(groups[site.country]??=[]).push(site);
 const cards=Object.entries(groups).map(([country,sites])=>(isCountry?'':`<h3 class="country-heading">${esc(countryLabel(country))}</h3>`)+sites.map(heritageCardHTML).join('')).join('')||`<div class="empty">${L('暂无匹配的遗产','No matching heritage')}</div>`;
 const pagination=pages>1?`<nav class="heritage-pagination" aria-label="${L('遗产列表分页','Heritage pagination')}"><span>${L(`第 ${start+1}–${Math.min(start+CONTINENT_PAGE_SIZE,total)} 处，共 ${total} 处`,`${start+1}–${Math.min(start+CONTINENT_PAGE_SIZE,total)} of ${total} properties`)}</span><div><button data-heritage-page="${state.page-1}" data-page-region="${model.region}" ${state.page===1?'disabled':''}>← ${L('上一页','Previous')}</button><span aria-live="polite">${state.page} / ${pages}</span><button data-heritage-page="${state.page+1}" data-page-region="${model.region}" ${state.page===pages?'disabled':''}>${L('下一页','Next')} →</button></div></nav>`:'';
 return `<div class="paged-heritage-list" data-list-region="${model.region}" tabindex="-1">${cards}${pagination}</div>`;
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-heritage-page]');if(!button||button.disabled)return;
 const state=continentListState.get(button.dataset.pageRegion);if(!state)return;
 state.page=Number(button.dataset.heritagePage);
 const container=button.closest('.heritage-list');if(!container)return;
 container.innerHTML=continentListHTML(state.model);
 const list=container.querySelector('.paged-heritage-list');list.focus({preventScroll:true});const panel=container.closest('.continent-info-column');if(panel&&window.innerWidth>900)panel.scrollTop=0;else container.scrollIntoView({block:'start',behavior:'instant'});
});

// Cards share one click target, while nested controls retain their own actions.
document.addEventListener('click',event=>{
 const card=event.target.closest('[data-card-history],[data-card-geography]');
 if(!card||event.target.closest('button,a,input,textarea,select,summary,label')||window.getSelection()?.toString())return;
 if(card.dataset.cardHistory)openDetail(card.dataset.cardHistory);
 else openGeographyPlace(card.dataset.cardGeography);
});

document.addEventListener('keydown',event=>{const card=event.target;if(!card.matches('[data-card-history],[data-card-geography]')||!['Enter',' '].includes(event.key))return;event.preventDefault();if(card.dataset.cardHistory)openDetail(card.dataset.cardHistory);else openGeographyPlace(card.dataset.cardGeography);});


// Both lenses supply content to this single detail component.
function heritageDetailHTML(model){
 const geo=model.lens==='geography',noteId=geo?'geo-note':'note',feedbackId=geo?'geo-note-status':'note-status';
 const status=getRecord(model.id);
 return `<header class="heritage-detail-header"><div class="heritage-detail-identity"><div class="location">${esc(model.location)}</div><h2 id="${geo?'geo-detail-title':'history-detail-title'}">${esc(model.name)}</h2>${model.names}<div class="detail-date">${esc(model.date||'')}</div><p ${geo?'data-copy-feedback':'id="copy-feedback"'} class="credit" role="status" aria-live="polite"></p><input ${geo?'data-copy-fallback':'id="copy-fallback"'} class="copy-fallback" aria-label="${L('可手动复制的地点名称','Place name for manual copying')}" readonly hidden></div><div class="status">${['wish','visited'].map(value=>`<button ${geo?`data-geo-status="${value}"`:`data-status="${value}" data-id="${model.id}"`} aria-pressed="${status.status===value}">${value==='wish'?L('想去','Want to visit'):L('已到访','Visited')}</button>`).join('')}</div></header><div class="detail-content"><section class="detail-section"><h3>${esc(model.contextTitle)}</h3><p>${esc(model.context)}</p></section><section class="detail-section visit-focus"><h3>${L('现场观察','On-site observations')}</h3><p>${esc(model.observation)}</p></section>${model.extra||''}${model.reading||''}</div><section class="heritage-detail-personal"><h3><label for="${noteId}">${L('我的观察与笔记','My observations and notes')}</label></h3><textarea id="${noteId}" maxlength="20000">${esc(status.note)}</textarea><p class="credit" id="${feedbackId}" role="status">${L('笔记自动保存在当前浏览器。','Notes save automatically in this browser.')}</p></section><footer class="detail-links heritage-detail-resources"><a href="${esc(model.map)}" target="_blank" rel="noopener">${L('地图搜索','Search maps')}</a><a href="https://whc.unesco.org/en/list/${model.id}/" target="_blank" rel="noopener">${L('UNESCO 官方条目','Official UNESCO entry')}</a><a href="https://whc.unesco.org/en/list/${model.id}/maps/" target="_blank" rel="noopener">${L('遗产范围地图','Property boundary maps')}</a><button type="button" class="detail-share" data-share-place>${L('分享此地点','Share this place')}</button><p class="credit resource-note">${L('地图位置供参考，请确认具体参观点。','Map locations are a guide; confirm the particular stop.')}</p></footer>`;
}
