import './FreshContentNotification.scss'

interface Callback {
  accept?: () => void
  reject?: () => void
}

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
    // eslint-disable-next-line
    content: string = 'New content available, click to refresh',
    // eslint-disable-next-line
    title: string = 'Content updated',
    // eslint-disable-next-line
    timeout: number = 5000,
    cb?: Callback
  ): void {
    // Add the element at the end of document
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="toast fresh-content-notification" role="alert" aria-live="polite" aria-atomic="true">
  <div class="toast-header">
    <strong class="mr-auto">${title}</strong>
    <button type="button" class="btn-close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    ${content}
  </div>
</div>`
    )

    const el = document.querySelector('.fresh-content-notification')
    const elClose = el.querySelector('.btn-close')

    // Reload page to show the new content
    el.addEventListener(
      'click',
      (e: MouseEvent) => {
        e.preventDefault()
        if (cb?.accept) {
          cb.accept.apply(this, [])
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

        if (cb?.reject) {
          cb.reject.apply(this, [])
        }
        el.remove()
      },
      false
    )

    // Remove after a set time
    setTimeout(() => {
      if (cb?.reject) {
        cb.reject.apply(this, [])
      }

      el.remove()
    }, timeout)
  }
}
