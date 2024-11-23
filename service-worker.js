const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  './',                          // Root
  './index.html',                // Entry point
  './static/js/main.731c951c.js', // Compiled JavaScript
  './static/css/main.c868be2a.css', // Compiled CSS
];

// Install event: Cache resources and log failed URLs
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((error) => {
            console.error(`Failed to cache: ${url}`, error);
          })
        )
      );
    })
  );
});

// Fetch event: Serve cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


// const CACHE_NAME = 'robofriends-cache-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/js/bundle.js',
//   '/static/js/main.chunk.js',
//   '/static/js/0.chunk.js',
//   '/static/css/main.css',
// ];

// // Install event: Cache resources
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Fetch event: Serve cached files when offline
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

// // Activate event: Clean up old caches
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// caches.open('cache-name').then((cache) => {
//   return cache.addAll([
//       './index.html',
//       './static/js/main.js',
//       './static/css/main.css',
//       './favicon.ico',
//       './manifest.json',
//   ]).catch((error) => {
//       console.error('Caching failed for:', error);
//   });
// });
