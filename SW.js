self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("tictactoe-v1").then(cache => cache.addAll([
      "index.html",
      "manifest.webmanifest",
      "background7.jpg",
      "xSound.mp3",
      "oSound.mp3",
      "win.mp3",
      "pwa192.png",
      "pwa512.png"
    ]))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});