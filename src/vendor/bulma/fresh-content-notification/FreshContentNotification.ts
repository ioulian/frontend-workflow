/**
 * V: 0.1.0
 */

import './FreshContentNotification.scss'

export default class FreshContentNotification {
  public static show(content: string = 'New content available, click to refresh', timeout: number = 3000): void {
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
        e.stopPropagation()
        el.remove()
      },
      false
    )

    setTimeout(() => {
      el.remove()
    }, timeout)
  }
}
