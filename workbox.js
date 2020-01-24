importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
console.log('Workbox berhasil dimuat'); 
} else {
console.log('Workbox gagal dimuat');
}

workbox.precaching.precacheAndRoute([
    
    { url: "./", revision: "1" },
    { url: "./index.html", revision: "1" },
    { url: "./nav.html", revision: "1" },
    
    { url: "./manifest.json", revision: "1" },
    { url: "./service-worker-register.js", revision: "1" },
    { url: "./workbox.js", revision: "1" },

    { url: "./pages/home.html", revision: "1" },
  	{ url: "./pages/about.html", revision: "1" },
  	{ url: "./pages/favorit.html", revision: "1" },
  	{ url: "./pages/liga-premier.html", revision: "1" },
  	{ url: "./pages/laliga.html", revision: "1" },
  	{ url: "./pages/bundesliga.html", revision: "1" },

  	{ url: "./assets/materialize/materialize.min.css", revision: "1" },
  	{ url: "./assets/materialize/materialize.min.js", revision: "1" },
  	{ url: "./assets/materialize/deploy.css", revision: "1" },
  	{ url: "./assets/materialize/font-materialize.woff2", revision: "1" },

  	{ url: "./assets/img/banner.jpg", revision: "1" },
  	{ url: "./assets/img/premier.png", revision: "1" },
  	{ url: "./assets/img/laliga.png", revision: "1" },
  	{ url: "./assets/img/bundesliga.png", revision: "1" },

  	{ url: "./assets/img/icon/icon-512x512.png", revision: "1" },
  	{ url: "./assets/img/icon/icon-192x192.png", revision: "1" },
  	{ url: "./assets/img/icon/icon-96x96.png", revision: "1" },

  	{ url: "./assets/js/nav.js", revision: "1" },
  	{ url: "./assets/js/db.js", revision: "1" },
  	{ url: "./assets/js/idb.js", revision: "1" },
  	{ url: "./assets/js/api.js", revision: "1" },
  	{ url: "./assets/jquery/jquery.min.js", revision: "1" }
]);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'api-data',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 30,
            }),
        ]
    })
)

workbox.routing.registerRoute(
   new RegExp('https://upload.wikimedia.org'),
   new workbox.strategies.CacheFirst({
        cacheName: 'image-from-api',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

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