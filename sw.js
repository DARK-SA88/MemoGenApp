const CACHE_NAME = 'nexfly-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // আপনার অন্যান্য CSS, JS বা ইমেজের পাথ এখানে যোগ করতে পারেন
];

// ইনস্টল করার সময় ফাইলগুলো ক্যাশ করে রাখা
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// অফলাইনে থাকার সময় ক্যাশ থেকে ডাটা লোড করা
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});