workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

// HTML
workbox.routing.registerRoute(
  /\/$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'html',
  })
)

// JS/CSS
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
)

// Images
workbox.routing.registerRoute(
  /\.(png|jpg|jpeg|svg|webp|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
)

// Other
workbox.routing.registerRoute(
  /\.(json|xml)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'other-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
)

// Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        maxEntries: 30,
      }),
    ],
  })
)

addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting()
  }
})
