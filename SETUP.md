# Firebase configuration for ASP Groups

The live site is connected to Firebase project `asp-groups-store`. Its web-app config is in `config.js`; Firestore is in the Mumbai region (`asia-south1`) and the project is on the Spark plan.

The web-app config is public client configuration, not a service-account credential. Never put a service-account JSON file, private key, or admin password in this repository.

## Admin access

Email/Password sign-in is enabled. The Firebase Authentication user `sibipanchabikesan@gmail.com` is the site admin. Sign in at [admin.html](admin.html) or use the home page Admin controls with the Firebase email and password.

The first successful login to `admin.html` automatically copies the nine starter entries in `products.json` to Firestore when the products collection is empty. Use the Products and Orders tabs in Admin after signing in.

## Firestore access

The rules source is [firestore.rules](firestore.rules). The currently published rules let visitors read the catalogue and shop settings and submit orders. Only `sibipanchabikesan@gmail.com` can edit products/settings or read and manage orders. Order details include customer names, phone numbers, addresses and notes.

The published rules include live homepage content saves through the `settings/site` document. Visitors can read this public site content; only the admin email can write it.

The GitHub Pages domain `sibipanchabikesan.github.io` is authorized in Firebase Authentication. Email/password sign-up is enabled, but Firestore admin access is restricted to the exact admin email by the rules.

## Homepage updates

The home page Admin controls use Firebase Authentication and save the theme, contact details, PC catalogue, video links and gallery to Firestore. Saved changes appear on the live site without downloading or uploading `index.html`. A single save is limited to 700 KB; reduce the number or size of gallery photos if you reach that limit.

## Order notifications and payments

Orders are saved to Firestore and can be reviewed in Admin. Email notifications are optional and are currently off; to enable them, register a free Web3Forms key for the receiving email and set `web3formsKey` in `config.js`.

The catalogue checkout currently takes no online payment. It sends an order enquiry so you can confirm price, stock, and delivery with the customer. A payment gateway has not been configured.
