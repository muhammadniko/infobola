const CACHE_NAME = "infobola-v2";
var urlsToCache = [
  "./",
  "./nav.html",
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./service-worker-register.js",
  "./assets/jquery/jquery.min.js",

  "./pages/home.html",
  "./pages/about.html",
  "./pages/favorit.html",
  "./pages/liga-premier.html",
  "./pages/laliga.html",
  "./pages/bundesliga.html",

  "./assets/materialize/materialize.min.css",
  "./assets/materialize/materialize.min.js",

  "./assets/img/banner.jpg",
  "./assets/img/premier.png",
  "./assets/img/laliga.png",
  "./assets/img/bundesliga.png",

  "./assets/img/icon/icon-512x512.png",
  "./assets/img/icon/icon-192x192.png",
  "./assets/img/icon/icon-96x96.png",

  "./assets/js/nav.js",
  "./assets/js/api.js"
  
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

    self.addEventListener("activate", function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheName != CACHE_NAME) {
                console.log("ServiceWorker: cache " + cacheName + " dihapus");
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });