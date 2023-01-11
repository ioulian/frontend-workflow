/* eslint-env serviceworker */
/* eslint-disable no-restricted-globals, no-underscore-dangle */

import {CacheableResponsePlugin} from 'workbox-cacheable-response'
import {ExpirationPlugin} from 'workbox-expiration'
import {matchPrecache, precacheAndRoute} from 'workbox-precaching'
import {registerRoute, setCatchHandler /* , setDefaultHandler */} from 'workbox-routing'
import {CacheFirst, StaleWhileRevalidate, NetworkFirst} from 'workbox-strategies'

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

// setDefaultHandler(new StaleWhileRevalidate());

// HTML
registerRoute(
  ({request}) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'cache-pages',
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
  // eslint-disable-next-line
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

if (__PUSH_ENABLED__) {
  self.addEventListener('push', (event) => {
    const {title, body} = event.data.json()

    event.waitUntil(
      self.registration.showNotification(title, {
        body,
      })
    )
  })

  self.addEventListener('notificationclick', (event) => {
    console.log('On notification click: ', event.notification.tag) // eslint-disable-line no-console
    // Android doesn’t close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close()

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(
      clients
        .matchAll({
          type: 'window',
        })
        // eslint-disable-next-line
        .then((clientList) => {
          for (let i = 0; i < clientList.length; i += 1) {
            const client = clientList[i]
            if (client.url === '/' && 'focus' in client) {
              return client.focus()
            }
          }

          if (clients.openWindow) {
            return clients.openWindow('/')
          }
        })
    )
  })
}
