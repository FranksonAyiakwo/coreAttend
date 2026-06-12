const CACHE_NAME = 'coreattend-v6';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './itds.png',
  './uenr.png',
  './student_enter_code/Student-eneter code.html',
  './student_your_details/Students-details.html',
  './success_attendance_recorded/Success.html',
  './lecturer_dashboard/lecturer-dashboard.html',
  './stitch/student_your_details/code.html'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      // 1. We have internet! Return the fresh file from the server
      const clonedResponse = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        // Quietly update the offline cache with this newest version
        cache.put(event.request, clonedResponse);
      });
      return response;
    }).catch(() => {
      // 2. We are offline! Fall back to the saved cache
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
