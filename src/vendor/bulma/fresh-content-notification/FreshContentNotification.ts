/**
 * V: 0.1.0
 */

import './FreshContentNotification.css'

/**
 * Shows a toaster notification when the site is cached by a service worker and a new content is available to download
 *
 * Clicking on the toaster just refreshes the page
 */
export class FreshContentNotification {
  public static show(content: string = 'New content available, click to refresh', timeout: number = 5000): void {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="fresh-content-notification notification is-success m-b-sm m-r-sm"><button class="delete"></button><p>${content}</p></div>`
    )

    const el = document.querySelector('.fresh-content-notification')
    const elClose = el.querySelector('.delete')

    el.addEventListener(
      'click',
      (e: MouseEvent) => {
        e.preventDefault()
        window.location.reload()
      },
      false
    )

    elClose.addEventListener(
      'click',
      (e: MouseEvent) => {
        e.preventDefault()

        // Do not refresh the page when dismissing the toaster
        e.stopPropagation()
        el.remove()
      },
      false
    )

    // Remove after a set time
    setTimeout(() => {
      el.remove()
    }, timeout)
  }
}
