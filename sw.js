const CACHE_NAME = 'steam-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  // You must explicitly cache the PyScript runtime for offline use
  'https://pyscript.net/releases/2024.1.1/core.css',
  'https://pyscript.net/releases/2024.1.1/core.js',
  // Note: Caching the actual pyXSteam wheel dynamically is complex 
  // because Pyodide fetches it from PyPI URLs that change. 
  // For a robust offline PWA, you should download the pyXSteam .whl file,
  // put it in your local folder, and point py-config to the local file.
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
