importScripts(
    "https://cdn.jsdelivr.net/npm/workbox-sw@7.3.0/build/workbox-sw.min.js"
);

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.core.setCacheNameDetails({
        prefix: "zeddyu_github_io",
    });

    workbox.precaching.precacheAndRoute([
        { url: "/", revision: "1" },
        { url: "/index.html", revision: "1" },
		{ url: '/scss/style.min.css', revision: '1' },
		{ url: '/ts/main.js', revision: '1' },
    ]);

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: "static-resources",
        })
    );

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

    workbox.routing.registerRoute(
        new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
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
