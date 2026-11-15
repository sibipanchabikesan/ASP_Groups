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
const sharedVideoStates=new WeakMap();
function renderSharedHeaderVideo(settings){
 if(document.querySelector('#hv'))return; // Home has its own video player.
 const file=typeof settings?.vfile==='string'?settings.vfile.trim():'';
 const videos=Array.isArray(settings?.videos)?settings.videos.filter(id=>typeof id==='string'&&/^[\w-]{11}$/.test(id)):[];
 const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 let hosts=[...document.querySelectorAll('body .hero,body .shophero')];
 if(!hosts.length&&document.querySelector('header'))hosts=[document.querySelector('header')];
 const key=(file||'')+'|'+videos.join(',');
 for(const host of hosts){
  const oldLayer=host.querySelector(':scope > .shared-header-video');
  if(!key||reduced){
   if(oldLayer)oldLayer.remove();
   host.classList.remove('shared-video-host');
   sharedVideoStates.delete(host);
   continue;
  }
  if(sharedVideoStates.get(host)===key&&oldLayer)continue;
  const layer=oldLayer||document.createElement('div');
  layer.className='shared-header-video';
  layer.setAttribute('aria-hidden','true');
  layer.replaceChildren();
  if(file){
   const v=document.createElement('video');
   v.src=file;v.autoplay=true;v.muted=true;v.loop=true;v.playsInline=true;
   v.setAttribute('muted','');v.setAttribute('playsinline','');
   v.setAttribute('aria-hidden','true');
   layer.appendChild(v);v.play().catch(()=>{});
  }else if(videos.length){
   const f=document.createElement('iframe');
   const p=new URLSearchParams({autoplay:'1',mute:'1',controls:'0',loop:'1',playlist:videos.join(','),playsinline:'1',modestbranding:'1',rel:'0',iv_load_policy:'3',disablekb:'1'});
   if(/^https?:$/.test(location.protocol))p.set('origin',location.origin);
   f.src='https://www.youtube-nocookie.com/embed/'+videos[0]+'?'+p.toString();
   f.allow='autoplay; encrypted-media';f.referrerPolicy='strict-origin-when-cross-origin';
   f.title='ASP Groups header video';f.tabIndex=-1;f.setAttribute('aria-hidden','true');
   layer.appendChild(f);
  }
  if(!oldLayer)host.prepend(layer);
  host.classList.add('shared-video-host');
  sharedVideoStates.set(host,key);
 }
}

window.addEventListener('storage',event=>{if(event.key!==STORAGE_KEY||!event.newValue)return;try{applyAppearance(JSON.parse(event.newValue))}catch(error){}});
import('./store.js').then(({watchSiteContent})=>{watchSiteContent(data=>{if(data){applyAppearance(data);renderSharedHeaderVideo(data)}}).catch(()=>{})}).catch(()=>{});
