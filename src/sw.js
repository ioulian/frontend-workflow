/* eslint-env serviceworker */
/* eslint-disable no-restricted-globals, no-underscore-dangle */

import {CacheableResponsePlugin} from 'workbox-cacheable-response'
import {ExpirationPlugin} from 'workbox-expiration'
import {matchPrecache, precacheAndRoute} from 'workbox-precaching'
import {registerRoute, setCatchHandler} from 'workbox-routing'
import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies'

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
)

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
)

// JS/CSS
registerRoute(
  ({request}) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'cache-static-resources',
  })
)

// Images
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'cache-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

// Other
registerRoute(
  new RegExp('.(json|xml)$'),
  new CacheFirst({
    cacheName: 'cache-others',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

// "Warm" cache
precacheAndRoute(self.__WB_MANIFEST.filter((obj) => !['/tags.html'].includes(obj.url)))

// Offline fallback
const FALLBACK_HTML_URL = './offline.html'
setCatchHandler(({event}) => {
  switch (event.request.destination) {
    case 'document':
      // If using precached URLs:
      return matchPrecache(FALLBACK_HTML_URL)

    default:
      return Response.error()
  }
})

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting()
  }
})
