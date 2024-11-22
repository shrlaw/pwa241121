const CACHE_NAME = 'robofriends-cache-v1';
const urlsToCache = [
  '/',
  '/pwa241121/index.html',
  '/pwa241121/js/bundle.js',
  '/pwa241121/static/js/main.chunk.js',
  '/pwa241121/static/js/0.chunk.js',
  '/pwa241121/static/css/main.css',
];

// Install event: Cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
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
