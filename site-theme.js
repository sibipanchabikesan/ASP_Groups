const STORAGE_KEY='asp_site_appearance';
const THEMES=new Set(['royal','sunset','emerald','violet','ocean','rose','forest','charcoal']);
function applyAppearance(value){
 const data=value&&typeof value==='object'?value:{};
 const theme=THEMES.has(data.theme)?data.theme:'royal';
 const mode=data.mode==='dark'?'dark':'light';
 document.body.dataset.theme=theme;
 document.body.dataset.mode=mode;
 try{const serialized=JSON.stringify({theme,mode});if(localStorage.getItem(STORAGE_KEY)!==serialized)localStorage.setItem(STORAGE_KEY,serialized)}catch(error){}
}
try{const cached=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(cached)applyAppearance(cached)}catch(error){}
window.addEventListener('storage',event=>{if(event.key!==STORAGE_KEY||!event.newValue)return;try{applyAppearance(JSON.parse(event.newValue))}catch(error){}});
import('./store.js').then(({watchSiteContent})=>{watchSiteContent(data=>{if(data)applyAppearance(data)}).catch(()=>{})}).catch(()=>{});
