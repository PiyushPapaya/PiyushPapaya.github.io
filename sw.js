const CACHE_NAME = 'piyush-portfolio-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/home.html',
  '/style.css',
  '/script.js',
  '/logo-192.png',
  '/logo-512.png',
  // Add paths to other critical assets like images, fonts here
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch event - serve cached assets or network fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).catch(() => {
        // Optionally provide fallback for offline (like offline.html)
      });
    })
  );
});
