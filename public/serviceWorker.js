// Dev tools -> application -> cache storage you can see these cacheFiles.
const publicCacheName = 'DJAPublicCachingV11';
const dynamicCache = 'DJADynamicCachingV1';
const cacheFiles = [
    './',
    './images/favicon.ico',
    './images/manifestIcon.png',
    './images/tsunami.avif',
    './css/style.css'
];

// install event 

self.addEventListener('install', e => {
    // console.log('service worker has been installed');
    e.waitUntil(
        caches.open(publicCacheName).then(cache => {
            console.log('caching cacheFiles');
            cache.addAll(cacheFiles);
        })
    );
});

// activate event

self.addEventListener('activate', e => {
    // console.log('service worker has been activated');
    e.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys); 
            return Promise.all(keys
                .filter(key => key !== publicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

// fetch

self.addEventListener('fetch', e => {
    // console.log('fetch event', e);
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(e.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });

        })
    );
});

// //Delete cache html pages when the length is bigger than 10
// e.respondWith(
//     caches.open('dynamicCache')
//         .then(cache => {
//             return cache.match(e.request.url)
//         })
//         //Cache the html page
//         .then(response => response ? response : fetchAndCache(e.request, 'dynamicCache'))
//         // generic fallback to a offline page
//         .catch(e => {
//             return caches.open(publicCacheName)
//                 .then(cache => cache.match('/offline'))
//         }))

// function fetchAndCache(request, cacheName) {
//     return fetch(request)
//         .then(response => {
//             if (!response.ok) {
//                 throw new TypeError('Bad response status');
//             }

//             const clone = response.clone()
//             caches.open(cacheName).then((cache) => cache.put(request, clone))
//             return response
//         })
// }

