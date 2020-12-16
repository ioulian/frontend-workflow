import {Site} from './project/Site'

// Import base styles
import './index.scss'

if (__BOOTSTRAP_IMPORT_BUNDLE__) {
  console.log('enter')
  import(/* webpackChunkName: "bootstrap" */ 'bootstrap/dist/js/bootstrap.bundle.min').then(undefined, undefined)
}

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

// @ts-ignore
requireAll(require.context('./', true, /-sprite\.svg$/))

// Service worker init. This will be removed from code on build if you turn off the service worker in package.json
if (__SERVICE_WORKER_ACTIVE__) {
  const activateServiceWorker = async (): Promise<void> => {
    if ('serviceWorker' in navigator) {
      const {Workbox, messageSW} = await import(
        // @ts-ignore
        /* webpackChunkName: "workbox-window" */ 'workbox-window/build/workbox-window.prod.umd'
      )
      const {FreshContentNotification} = await import(
        /* webpackChunkName: "fresh-content-notification" */ './lib/components/fresh-content-notification/FreshContentNotification'
      )

      const wb = new Workbox('/sw.js')
      let registration

      const showSkipWaitingPrompt = () => {
        FreshContentNotification.show(
          document.documentElement.getAttribute('data-fresh-content-notification-title') || undefined,
          document.documentElement.getAttribute('data-fresh-content-notification-title') || undefined,
          5000,
          {
            accept: () => {
              wb.addEventListener('controlling', () => {
                window.location.reload()
              })

              if (registration && registration.waiting) {
                messageSW(registration.waiting, {type: 'SKIP_WAITING'})
              }
            },
          }
        )
      }

      // Add an event listener to detect when the registered
      // service worker has installed but is waiting to activate.
      wb.addEventListener('waiting', showSkipWaitingPrompt)
      wb.addEventListener('externalwaiting', showSkipWaitingPrompt)

      wb.register().then((r) => {
        registration = r
      })
    }
  }

  // eslint-disable-next-line
  activateServiceWorker()
}
