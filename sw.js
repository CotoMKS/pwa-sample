const cacheName = "FGOmash";

// Cache all the files to make a PWA
self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			// Our application only has two files here index.html and manifest.json
			// but you can add more such as style.css as your app grows
			return cache.addAll([
                "index.html", 
                "manifest.json",
                "favicon.ico",
                "about.html",
                "profile.html",
                "notification.html",
                "images/profile-picture.png",
                "images/pngegg.png",
                "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
                "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
                "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css",
                "https://code.jquery.com/jquery-3.6.0.min.js"
            ]);
		})
	);
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.open(cacheName)
			.then((cache) => cache.match(event.request, { ignoreSearch: true }))
			.then((response) => {
				return response || fetch(event.request);
			})
	);
});
