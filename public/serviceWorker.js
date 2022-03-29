self.addEventListener('install', event => {
    console.log('Installing service worker')

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(cacheFiles).then(() => self.skipWaiting());
        })
    );
});


self.addEventListener('activate', function (event) {
    console.log('Sucessfully activated serviceWorker')
})


self.addEventListener('fetch', function (event) {
    const url = new URL(event.request.url)
    // Retrieve the supportive cashed files.
    if (event.request.method === 'GET' && cacheFiles.includes(url.pathname)) {
        event.respondWith(
            caches.open('cacheName')
                .then(cache => cache.match(event.request.url))
        )
        // Only cache the HTML file.
    } else if (event.request.method === 'GET' && (event.request.headers.get('accept') !== null && event.request.headers.get('accept').includes('text/html'))) {
        console.log('BOEH');
        event.respondWith(
            // Stale-while-revalidate (see https://web.dev/offline-cookbook/#stale-while-revalidate).
            caches.open('dynamic-cache').then(function (cache) {
                return cache.match(event.request)
                    .then(function (response) {
                        var fetchPromise = fetch(event.request)
                            .then(function (networkResponse) {
                                cache.put(event.request, networkResponse.clone())
                                return networkResponse
                            })
                        return response || fetchPromise
                    })
            }),
        )
    }
    console.log("Service worker fetched.")
})

// self.addEventListener('fetch', event => {
//     if (isCoreGetRequest(event.request)) {
//         console.log('Core get request: ', event.request.url);
//         // cache only strategy
//         event.respondWith(
//             caches.open(CORE_CACHE_VERSION)
//                 .then(cache => cache.match(event.request.url)))
//     }
//     else if (isHtmlGetRequest(event.request)) {
//         // generic fallback
//         event.respondWith(
//             caches.open('html-cache')
//                 .then(cache => cache.match(event.request.url))
//                 .then(response => response ? response : fetchAndCache(event.request, 'html-cache'))
//                 .catch(e => {
//                     return caches.open(CORE_CACHE_VERSION)
//                         .then(cache => cache.match('/offline'))
//                 }))
//     }
// });

function fetchAndCache(request, cacheName) {
    return fetch(request)
        .then(response => {
            if (!response.ok) {
                throw new TypeError('Bad response status');
            }

            const clone = response.clone()
            caches.open(cacheName).then((cache) => cache.put(request, clone))
            return response
        })
}


function isHtmlGetRequest(request) {
    //application/octet-stream
    return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
}


function isCoreGetRequest(request) {
    return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
}


function getPathName(requestUrl) {
    const url = new URL(requestUrl);
    return url.pathname;
}


// Dev tools -> application -> cache storage you can see these cacheFiles.
const cacheName = 'DJA-caching';
const cacheFiles = [
    './',
    './images',
    './style.css',
    './js/app.js',
    './manifest.json',
    '/KatsushikaHokusai',
    '/UtagawaKuniyoshi'
]