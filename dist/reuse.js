const policyButton=document.getElementById('policy-language');
let policyLanguage=new URLSearchParams(location.search).get('lang')==='en'?'en':'zh';
function renderPolicy(){document.documentElement.lang=policyLanguage==='en'?'en':'zh-CN';document.querySelectorAll('[data-policy-lang]').forEach(el=>el.hidden=el.dataset.policyLang!==policyLanguage);document.querySelectorAll('[data-zh][data-en]').forEach(el=>el.textContent=el.dataset[policyLanguage]);policyButton.textContent=policyLanguage==='en'?'中文':'English';document.title=policyLanguage==='en'?'Reuse and attribution — History Along the Way':'引用与使用说明 — 历史沿线';}
policyButton.addEventListener('click',()=>{policyLanguage=policyLanguage==='en'?'zh':'en';renderPolicy();});renderPolicy();
