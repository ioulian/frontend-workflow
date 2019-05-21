// Import Site singleton where the site logic is located
import {Site} from './project/Site'
import {FreshContentNotification} from './vendor/fw/fresh-content-notification/FreshContentNotification'

// Import base styles
import './index.scss'

// Initialize Site
// We do not store this variable as it's not needed in "window" object or anywhere in this file
Site.getInstance()

// START: Attach serviceWorker
// Comment this part if you do not wish to use serviceWorker for this project
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then(reg => {
      reg.onupdatefound = () => {
        const installingWorker = reg.installing

        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // New or updated content is available
                const notificationContent =
                  document.documentElement.getAttribute('data-fresh-content-notification-text') !== null
                    ? document.documentElement.getAttribute('data-fresh-content-notification-text')
                    : undefined

                FreshContentNotification.show(notificationContent)
              } else {
                // Content is now available offline!
              }
              break
            case 'redundant':
              // The installing service worker became redundant.
              break
          }
        }
      }
    })
    .catch(e => {
      console.error('Error during service worker registration:', e)
    })
}
// END: Attach serviceWorker, comment the code till here
