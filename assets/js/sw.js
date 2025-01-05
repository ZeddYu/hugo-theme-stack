try {
    importScripts(
        "https://cdn.jsdelivr.net/npm/workbox-sw@7.3.0/build/workbox-sw.min.js"
    );
} catch (error) {
    console.error(
        "Failed to load workbox-sw from jsDelivr, trying alternative CDN..."
    );
    try {
        importScripts(
            "https://cdn.jsdmirror.com/workbox-sw@7.3.0/build/workbox-sw.min.js"
        );
    } catch (error) {
        console.error("Both failed.");
    }
}

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.core.setCacheNameDetails({
        prefix: "zeddyu_github_io",
    });

    workbox.precaching.precacheAndRoute([
        { url: "/", revision: "1" },
        { url: "/index.html", revision: "1" },
        { url: "/about", revision: "1" },
    ]);

    workbox.routing.registerRoute(
        ({ request }) => request.mode === "navigate",
        new workbox.strategies.NetworkFirst({
            networkTimeoutSeconds: 3,
            cacheName: "pages",
            plugins: [
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        ({ request }) =>
            // CSS
            request.destination === "style" ||
            // JavaScript
            request.destination === "script" ||
            // Web Workers
            request.destination === "worker",
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: "static-resources",
            plugins: [
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        ({ request }) => request.destination === "image",
        new workbox.strategies.CacheFirst({
            cacheName: "images",
            plugins: [
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        ({ url }) => url.origin === "https://fonts.googleapis.com",
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: "google-fonts-stylesheets",
        })
    );

    // Cache the underlying font files with a cache-first strategy for 1 year.
    workbox.routing.registerRoute(
        ({ url }) => url.origin === "https://fonts.gstatic.com",
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
