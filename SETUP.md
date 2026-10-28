# ASP Groups shop – going live
Without setup the shop runs in **demo mode** (data stays in one browser). To save orders for real:

1. console.firebase.google.com → Add project → Build → **Firestore Database** (production mode) and **Authentication → Email/Password** → add your admin user.
2. Project settings → Your apps → Web app → copy the config into `config.js`.
3. Authentication → Settings → Authorized domains: add `sibipanchabikesan.github.io`.
4. Firestore → Rules → paste the rules below (replace the email) → Publish.
5. Optional order emails: get a free key at web3forms.com and paste it as `web3formsKey` in `config.js`.
6. Commit everything to GitHub; the Pages workflow deploys it. Admin is at `/admin.html`.

```
rules_version = '2';
service cloud.firestore { match /databases/{d}/documents {
  function admin(){ return request.auth != null && request.auth.token.email == 'YOUR_ADMIN_EMAIL'; }
  match /products/{i} { allow read: if true; allow write: if admin(); }
  match /settings/{i} { allow read: if true; allow write: if admin(); }
  match /orders/{i} {
    allow create: if request.resource.data.keys().hasOnly(['id','created','status','name','phone','address','notes','items','total']) && request.resource.data.items.size() <= 30;
    allow read, update, delete: if admin();
  }
}}
```
