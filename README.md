# Progressive Web Apps @cmda-minor-web · 2021/22

![pwa](https://user-images.githubusercontent.com/3104648/28351989-7f68389e-6c4b-11e7-9bf2-e9fcd4977e7a.png)

# How to install this project

Clone this repo

```
$ git clone https://github.com/farrahton/progressive-web-apps-2122.git 
```

# Refactor the WAFS (or OBA) App to a server side version with Node.js & Express

## Download node.js:
1. Go to the Node.js Downloads page
2. Download Node.js for macOS by clicking the "Macintosh Installer" option
3. Run the downloaded Node.js .pkg Installer
4. Run the installer, including accepting the license, selecting the destination, and authenticating for the install.
5. You're finished :)

## Download express

```
npm install express --save
```

# Set up tooling

## Node fetch 
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

## Download nodemon 

```
npm init
```

```
npm install --save-dev nodemon
```

Then write a script for when you type 'npm start' in the terminal it will automatically start the server.js using nodemon. With nodemon it will also automatically refresh the page in your browser.

```json
  "scripts": {
    "server": "start",
    "start": "nodemon server.js"
  }
  ```

# Create a manifest

The web app manifest is a JSON file that tells the browser about your Progressive Web App and how it should behave when installed on the user's desktop or mobile device. A typical manifest file includes the app name, the icons the app should use, and the URL that should be opened when the app is launched.

Use the commonly used file name <code>manifest.json</code>.

Add the key manifest properties:
1. short_name and/or name
2. icons
3. start_url
4. background_color
5. display
6. scope
7. theme_color
8. description

And don't forget to add the manifest file to your <code>head.ejs</code> file.

```
<link rel="manifest" href="/manifest.json">
```
This makes it possible to install the web app as an app on your device.

<details>
<summary>Source</summary>
https://web.dev/add-manifest/#:~:text=The%20web%20app%20manifest%20is,when%20the%20app%20is%20launched.
</details>

# Service worker

We create a service worker to enable applications to control network requests, cache those requests to improve performance, and provide offline access to cached content. For this i created an <code>app.js file</code> and a <code>serviceWorker.js</code> file in the public folder.
