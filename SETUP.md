# Firebase configuration for ASP Groups

The live site is connected to Firebase project `asp-groups-store`. Its web-app config is in `config.js`; Firestore is in the Mumbai region (`asia-south1`) and the project is on the Spark plan.

The web-app config is public client configuration, not a service-account credential. Never put a service-account JSON file, private key, or admin password in this repository.

## Admin access

Email/Password sign-in is enabled. The Firebase Authentication user `sibipanchabikesan@gmail.com` is the site admin. Sign in at [admin.html](admin.html) with the password set directly in Firebase.

The first successful admin login automatically copies the nine starter entries in `products.json` to Firestore when the products collection is empty. Use the Products and Orders tabs in Admin after signing in.

## Firestore access

The published rules are in [firestore.rules](firestore.rules). Visitors can read the catalogue and shop settings and submit an order. Only `sibipanchabikesan@gmail.com` can edit products/settings or read and manage orders. Order details include customer names, phone numbers, addresses and notes.

The GitHub Pages domain `sibipanchabikesan.github.io` is authorized in Firebase Authentication. The email/password provider permits sign-up, but Firestore admin access is still restricted to the exact admin email by the rules.

## Order notifications and payments

Orders are saved to Firestore and can be reviewed in Admin. Email notifications are optional and are currently off; to enable them, register a free Web3Forms key for the receiving email and set `web3formsKey` in `config.js`.

The catalogue checkout currently takes no online payment. It sends an order enquiry so you can confirm price, stock, and delivery with the customer. A payment gateway has not been configured.
