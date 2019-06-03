const FALLBACK_HTML_URL = '/offline.html'

workbox.precaching.precacheAndRoute((self.__precacheManifest || []).concat(FALLBACK_HTML_URL))

// HTML
workbox.routing.registerRoute(
  new RegExp('(/?|.html)$'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'cache-pages',
  })
)

// JS/CSS
workbox.routing.registerRoute(
  new RegExp('.(?:js|css)$'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cahce-static-resources',
  })
)

// Images
workbox.routing.registerRoute(
  new RegExp('.(png|jpg|jpeg|svg|webp|gif)$'),
  new workbox.strategies.CacheFirst({
    cacheName: 'cache-images',
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
  new RegExp('.(json|xml)$'),
  new workbox.strategies.CacheFirst({
    cacheName: 'cache-others',
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
  new RegExp('^https://fonts.gstatic.com'),
  new workbox.strategies.CacheFirst({
    cacheName: 'cache-google-fonts-webfonts',
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
workbox.routing.setCatchHandler(({event}) => {
  switch (event.request.destination) {
    case 'document':
      return caches.match(FALLBACK_HTML_URL)
      break

    default:
      return Response.error()
  }
})

addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting()
  }
})
