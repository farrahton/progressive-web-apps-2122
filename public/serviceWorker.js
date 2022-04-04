// Dev tools -> application -> cache storage you can see these cacheFiles.
const publicCacheName = 'DJAcachingV1';
const dynamicCache = 'dynamicSiteV1';
const cacheFiles = [
    './',
    './images',
    './css/style.css'
];


self.addEventListener('install', evt => {
    // console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(publicCacheName).then(cache => {
            console.log('caching shell cacheFiles');
            cache.addAll(cacheFiles);
        })
    );
});

// activate event

self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
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

self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});


