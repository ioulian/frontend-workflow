import {Site} from './project/Site'
import 'bootstrap/dist/js/bootstrap.bundle'

// Import base styles
import './index.scss'

/* eslint-disable no-underscore-dangle */
declare const __SERVICE_WORKER_ACTIVE__: boolean
/* eslint-enable no-underscore-dangle */

// Initialize Site
// We do not store this variable as it's not needed in "window" object or anywhere in this file
// This is a singleton and if you need this, just run getInstance again.
Site.getInstance()

// Update HTML class to show user has JS enabled
document.documentElement.classList.remove('no-js')
document.documentElement.classList.add('js')

// Import all sprite svg's to be included into SVG Spritesheet
const requireAll = (r: any): void => {
  r.keys().forEach(r)
}

/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-ignore
requireAll(require.context('./', true, /-sprite\.svg$/))

// Service worker init. This will be removed from code on build if you turn off the service worker in package.json
if (__SERVICE_WORKER_ACTIVE__) {
  const activateServiceWorker = async (): Promise<void> => {
    if ('serviceWorker' in navigator) {
      const {Workbox} = await import(
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        /* webpackChunkName: "workbox-window" */ 'workbox-window/build/workbox-window.prod.umd'
      )
      const {FreshContentNotification} = await import(
        /* webpackChunkName: "fresh-content-notification" */ './lib/components/fresh-content-notification/FreshContentNotification'
      )

      const wb = new Workbox(`${__PUBLIC_PATH__}sw.js`)

      wb.addEventListener('waiting', () => {
        const notificationContent =
          document.documentElement.getAttribute('data-fresh-content-notification-text') !== null
            ? document.documentElement.getAttribute('data-fresh-content-notification-text')
            : undefined

        const notificationTitle =
          document.documentElement.getAttribute('data-fresh-content-notification-title') !== null
            ? document.documentElement.getAttribute('data-fresh-content-notification-title')
            : undefined

        FreshContentNotification.show(notificationContent, notificationTitle, 5000)

        wb.messageSW({type: 'SKIP_WAITING'})
      })

      wb.register()
    }
  }

  // eslint-disable-next-line
  activateServiceWorker()
}
