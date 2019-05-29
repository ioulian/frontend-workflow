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
  /**
   * Shows a toaster message with provided content
   *
   * @param {String} content Content you want to show
   * @param {Number} timeout Timeout to automatically hide the toaster
   */
  public static show(
    content: string = 'New content available, click to refresh',
    timeout: number = 5000,
    onAccept: () => void | null = null
  ): void {
    // Add the element at the end of document
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="fresh-content-notification notification is-success is-mb-4 is-mr-4"><button class="delete"></button><p>${content}</p></div>`
    )

    const el = document.querySelector('.fresh-content-notification')
    const elClose = el.querySelector('.delete')

    // Reload page to show the new content
    el.addEventListener(
      'click',
      (e: MouseEvent) => {
        e.preventDefault()

        if (onAccept !== null) {
          onAccept.apply(null)
        }
      },
      false
    )

    // On close, do not reload page
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
