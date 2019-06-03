// Import Site singleton where the site logic is located
import {Site} from './project/Site'
import {FreshContentNotification} from './vendor/fw/fresh-content-notification/FreshContentNotification'
import {Workbox} from 'workbox-window/build/workbox-window.prod.umd'

// Import base styles
import './index.scss'

// Initialize Site
// We do not store this variable as it's not needed in "window" object or anywhere in this file
Site.getInstance()

// START: Attach serviceWorker
// Comment this part if you do not wish to use serviceWorker for this project
if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js')

  wb.addEventListener('waiting', () => {
    const notificationContent =
      document.documentElement.getAttribute('data-fresh-content-notification-text') !== null
        ? document.documentElement.getAttribute('data-fresh-content-notification-text')
        : undefined

    FreshContentNotification.show(notificationContent, 5000, () => {
      window.location.reload()
    })

    wb.messageSW({type: 'SKIP_WAITING'})
  })

  wb.register()
}
// END: Attach serviceWorker, comment the code till here
