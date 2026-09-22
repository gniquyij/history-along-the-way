/* Same GA4 stream as the author's homepage; basic opt-in, production only. */
(() => {
  const id='G-C8YTF23DH7',key='history-along-the-way-analytics-consent';
  const local=['localhost','127.0.0.1','[::1]','::1'].includes(location.hostname)||location.protocol!=='https:';
  const notice=document.getElementById('analytics-notice');
  // Keep controls outside view-specific containers so every page can reach them.
  if(document.body)document.body.appendChild(notice);
  let loaded=false;
  const read=()=>{try{return localStorage.getItem(key);}catch{return null;}};
  const write=value=>{try{localStorage.setItem(key,value);}catch{}};
  function enable(){
    if(local||loaded)return;
    loaded=true;window['ga-disable-'+id]=false;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent','update',{analytics_storage:'granted'});
    window.gtag('js',new Date());
    // No notes, visit records, identities, query strings or fragments are submitted.
    window.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname,page_referrer:document.referrer?new URL(document.referrer).origin:''});
    window.gtag('event','page_view',{page_title:'History Along the Way',page_location:location.origin+location.pathname,site_name:'history_along_the_way'});
    const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(script);
  }
  function choose(value){write(value);notice.hidden=true;if(value==='granted')enable();else{window['ga-disable-'+id]=true;if(loaded)location.reload();}}
  document.getElementById('analytics-allow').onclick=()=>choose('granted');
  document.getElementById('analytics-decline').onclick=()=>choose('denied');
  document.getElementById('analytics-settings').onclick=()=>{notice.hidden=!notice.hidden;};
  if(!local){if(read()==='granted')enable();else if(read()!=='denied')notice.hidden=false;}
})();
