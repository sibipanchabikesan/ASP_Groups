# Firebase setup for ASP Groups

The catalogue currently uses demo mode because `config.js` has no Firebase project values. In demo mode, product edits and orders stay only in the current browser.

## 1. Connect a Firebase project

Use an existing Firebase project or create one in the Firebase Console. Register a **Web app** in that project and copy its web-app config into `config.js`. This site only reads `apiKey`, `authDomain`, `projectId`, and `appId`.

The web-app config is public client configuration, not a service-account credential. Never put a service-account JSON file or private key in this repository.

## 2. Create the database and enable admin login

1. Create the default Cloud Firestore database in **production mode**. For Salem, `asia-south1` (Mumbai) is the nearby region. The Firestore location is permanent after the database is created.
2. In Authentication, enable **Email/Password**.
3. Add the admin account `sibipanchabikesan@gmail.com` under Authentication → Users. Set its password directly in Firebase; do not put the password in this repository.
4. Add `sibipanchabikesan.github.io` to Authentication → Settings → Authorized domains.

## 3. Publish the Firestore rules

Copy the contents of `firestore.rules` into Firestore → Rules and publish them. They allow visitors to read products and shop settings and submit validated orders. Only the admin email above can read/manage orders or change products and settings.

The first successful admin login automatically copies the existing `products.json` catalogue into Firestore if the products collection is empty.

## 4. Put the web config in the site and publish

Paste the Firebase web-app values into `config.js`, then commit and publish the change. Open `/admin.html`, log in with the admin account, and confirm the Products and Orders pages load. Public catalogue orders will then be saved to Firestore and visible on the Orders tab.

Order email alerts are optional. To enable them, register a free Web3Forms key for the receiving email and set `web3formsKey` in `config.js`. Without that optional key, orders are still stored in Firestore and can be reviewed in Admin.

