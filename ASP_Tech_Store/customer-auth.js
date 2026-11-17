import { firebase } from '../config.js';
const CDN='https://www.gstatic.com/firebasejs/10.12.2/';
const [appSdk,authSdk]=await Promise.all([import(CDN+'firebase-app.js'),import(CDN+'firebase-auth.js')]);
const app=appSdk.initializeApp(firebase,'asp-tech-store-customers');
const auth=authSdk.getAuth(app);
const continueUrl=()=>location.origin+location.pathname;
export const watchUser=callback=>authSdk.onAuthStateChanged(auth,callback);
export async function signInCustomer(email,password){return (await authSdk.signInWithEmailAndPassword(auth,email,password)).user}
export async function createCustomer(email,password){const user=(await authSdk.createUserWithEmailAndPassword(auth,email,password)).user;await authSdk.sendEmailVerification(user,{url:continueUrl()});return user}
export async function sendCustomerVerification(){if(!auth.currentUser)throw new Error('Sign in first.');await authSdk.sendEmailVerification(auth.currentUser,{url:continueUrl()})}
export async function refreshCustomer(){if(!auth.currentUser)return null;await authSdk.reload(auth.currentUser);return auth.currentUser}
export async function signOutCustomer(){return authSdk.signOut(auth)}
