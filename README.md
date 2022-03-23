# Refactor the WAFS (or OBA) App to a server side version with Node.js & Express

download node.js


download express

```
npm install express --save
```

# Set up tooling

CommonJS
node-fetch from v3 is an ESM-only module - you are not able to import it with require().

If you cannot switch to ESM, please use v2 which remains compatible with CommonJS. Critical bug fixes will continue to be published for v2.
```
npm install node-fetch@2
```

Used the async import() function from CommonJS to load node-fetch asynchronously:

```js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
```

Downloaded nodemon 

```
npm init
```

```
npm install --save-dev nodemon
```

Then write a script for when you type 'npm start' in the terminal it will automatically start the server.js using nodemon. With nodemon it will also automatically refresh the page in your browser.

```
  "scripts": {
    "server": "start",
    "start": "nodemon server.js"
  }
  ```