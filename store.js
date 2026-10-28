import {firebase as F,web3formsKey as WK} from './config.js';
export const isDemo=!F.apiKey;
const LS=(k,v)=>v===undefined?JSON.parse(localStorage.getItem(k)||'null'):localStorage.setItem(k,JSON.stringify(v));
let fb;
async function init(){if(fb||isDemo)return;const B='https://www.gstatic.com/firebasejs/10.12.2/';const [a,f,u]=await Promise.all(['firebase-app.js','firebase-firestore.js','firebase-auth.js'].map(x=>import(B+x)));const app=a.initializeApp(F);fb={f,u,db:f.getFirestore(app),auth:u.getAuth(app)}}
const D=(c,i)=>fb.f.doc(fb.db,c,i),all=async c=>(await fb.f.getDocs(fb.f.collection(fb.db,c))).docs.map(d=>({...d.data(),id:d.id}));
export async function products(){await init();return isDemo?(LS('p')||await fetch('products.json').then(r=>r.json()).catch(()=>[])):all('products')}
export async function saveProduct(p){await init();if(isDemo){const l=await products(),i=l.findIndex(x=>x.id===p.id);i<0?l.push(p):l[i]=p;return LS('p',l)}await fb.f.setDoc(D('products',p.id),p)}
export async function delProduct(id){await init();if(isDemo)return LS('p',(await products()).filter(x=>x.id!==id));await fb.f.deleteDoc(D('products',id))}
export async function settings(){await init();if(isDemo)return LS('s')||{};const s=await fb.f.getDoc(D('settings','main'));return s.exists()?s.data():{}}
export async function saveSettings(s){await init();if(isDemo)return LS('s',s);await fb.f.setDoc(D('settings','main'),s)}
export async function placeOrder(o){await init();if(isDemo)LS('o',[...(LS('o')||[]),o]);else await fb.f.setDoc(D('orders',o.id),o);
 if(WK)fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({access_key:WK,subject:'New order '+o.id,name:o.name,phone:o.phone,address:o.address,notes:o.notes,total:o.total,items:o.items.map(i=>i.name+' x'+i.qty+' @ '+i.price).join('\n')})}).catch(()=>{})}
export async function orders(){await init();return(isDemo?LS('o')||[]:await all('orders')).sort((a,b)=>b.created-a.created)}
export async function setStatus(id,status){await init();if(isDemo)return LS('o',(LS('o')||[]).map(o=>o.id===id?{...o,status}:o));await fb.f.updateDoc(D('orders',id),{status})}
export async function login(e,p){await init();await fb.u.signInWithEmailAndPassword(fb.auth,e,p)}
export async function logout(){await init();if(!isDemo)await fb.u.signOut(fb.auth)}
export async function onUser(cb){await init();isDemo?cb({email:'demo'}):fb.u.onAuthStateChanged(fb.auth,cb)}
