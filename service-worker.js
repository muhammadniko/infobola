const CACHE_NAME = "infobola-v4";
var urlsToCache = [
  "./",
  "./nav.html",
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./service-worker-register.js",

  "./pages/home.html",
  "./pages/about.html",
  "./pages/favorit.html",
  "./pages/liga-premier.html",
  "./pages/laliga.html",
  "./pages/bundesliga.html",

  "./assets/materialize/materialize.min.css",
  "./assets/materialize/materialize.min.js",
  "./assets/materialize/deploy.css",
  "./assets/materialize/font-materialize.woff2",

  "./assets/img/banner.jpg",
  "./assets/img/premier.png",
  "./assets/img/laliga.png",
  "./assets/img/bundesliga.png",

  "./assets/img/icon/icon-512x512.png",
  "./assets/img/icon/icon-192x192.png",
  "./assets/img/icon/icon-96x96.png",

  "./assets/js/nav.js",
  "./assets/js/db.js",
  "./assets/js/idb.js",
  "./assets/js/api.js",
  "./assets/jquery/jquery.min.js"
  
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = 'https://api.football-data.org/v2/'

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
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

// Notifikasi
self.addEventListener('push', function(event) {
	var body;

	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}

	var options = {
		body: body,
		icon: './assets/img/icon/icon-512x512.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};

	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});