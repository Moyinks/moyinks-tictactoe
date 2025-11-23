const CACHE_NAME = "tictactoe-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./background.jpg",
  "./xSound.mp3",
  "./oSound.mp3",
  "./win.mp3",
  "./pwa192.png",
  "./pwa512.png"
];

// Install event – cache core files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate event – clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch event – serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("./index.html") // fallback if offline
        )
      );
    })
  );
});