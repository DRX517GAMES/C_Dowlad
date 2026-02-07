const cacheName = 'c-v1';
// Lista plików do zapisania w pamięci urządzenia
const assets = [
  './',
  'index.html',
  'manifest.json',
  'https://www.soundjay.com/mechanical/sounds/explosion-01.mp3'
];

// Instalacja Service Workera i pobieranie plików
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('C: Buforowanie plików gry...');
      return cache.addAll(assets);
    })
  );
});

// Obsługa gry w trybie offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
