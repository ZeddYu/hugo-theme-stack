// importScripts("https://cdn.zdy.one/npm/workbox-cdn/workbox/workbox-sw.js");
// importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");
importScripts("https://cdn.jsdelivr.net/npm/workbox-sw@7.3.0/build/workbox-sw.min.js");

if (workbox) {
	console.log(`Yay! Workbox is loaded 🎉`);

	workbox.routing.registerRoute(
		/\.(?:js|css)$/,
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: "static-resources",
		})
	);

	// workbox.routing.registerRoute(
	// 	"https://cdn.zdy.one/gh/ZeddYu/ZeddYu.github.io@master/ts/main.js",
	// 	new workbox.strategies.StaleWhileRevalidate({
	// 		cacheName: "static-resources",
	// 	})
	// );

	workbox.routing.registerRoute(
		/\.(?:png|jpg|jpeg|svg|gif)$/,
		new workbox.strategies.CacheFirst({
			cacheName: "image-cache",
			plugins: [
				new workbox.expiration.ExpirationPlugin({
					maxEntries: 20,
					maxAgeSeconds: 7 * 24 * 60 * 60,
				}),
			],
		})
	);

	// // googlefonts.zeddyu-lu.workers.dev
	// workbox.routing.registerRoute(
	// 	/^https:\/\/googlefonts\.zeddyu-lu\.workers\.dev/,
	// 	new workbox.strategies.StaleWhileRevalidate({
	// 		cacheName: "google-fonts-stylesheets",
	// 	})
	// );

	workbox.routing.registerRoute(
		/^https:\/\/googlefonts\.zeddyu-lu\.workers\.dev/,
		new workbox.strategies.CacheFirst({
			cacheName: "google-fonts-webfonts",
			plugins: [
				new workbox.cacheableResponse.CacheableResponsePlugin({
					statuses: [0, 200],
				}),
				new workbox.expiration.ExpirationPlugin({
					maxAgeSeconds: 60 * 60 * 24 * 365,
					maxEntries: 30,
				}),
			],
		})
	);
} else {
	console.log(`Boo! Workbox didn't load 😬`);
}
