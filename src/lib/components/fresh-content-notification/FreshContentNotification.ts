import './FreshContentNotification.scss'

/**
 * Shows a toast notification when the site is cached by a service worker and a new content is available to download
 *
 * Clicking on the toast just refreshes the page
 */
export class FreshContentNotification {
  /**
   * Shows a toaster message with provided content
   *
   * @param {String} content Content you want to show
   * @param {String} title   Title of the toast you want to show
   * @param {Number} timeout Timeout to automatically hide the toaster
   */
  public static show(
    content: string = 'New content available, click to refresh',
    title: string = 'Content updated',
    timeout: number = 5000
  ): void {
    // Add the element at the end of document
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="toast fresh-content-notification fade show" role="alert" aria-live="polite" aria-atomic="true">
  <div class="toast-header">
    <strong class="mr-auto">${title}</strong>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    ${content}
  </div>
</div>`
    )

    const el = document.querySelector('.fresh-content-notification')
    const elClose = el.querySelector('.close')

    // Reload page to show the new content
    el.addEventListener(
      'click',
      (e: MouseEvent) => {
        e.preventDefault()
        window.location.reload()
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
