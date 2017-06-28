# MEAN Stack

Code for the MEAN Soup to Bits

* MongoDB
* Express
* Angular
* Node

*Requires MongoDB server running*

## Developing

* `npm install` to resolve dependencies
* `npm run watch` to start transpile watch. This command will read files under `client/src` and generate a single file under `client/dist/bundle.js` which should be included by index.html


mongoimport --db chat-dev --collection users --type json --file seeds/users-seed.json --jsonArray --drop
mongoimport --db chat-dev --collection contacts --type json --file seeds/contacts-seed.json --jsonArray --drop
mongoimport --db chat-dev --collection groups --type json --file seeds/groups-seed.json --jsonArray --drop