/**
 * V: 0.1.2
 */

import './ClickThrough.css'

/**
 * Allows you to create a click target on a container while still maintaining a correct keyboard navigation
 * (you can control click on the parent to open a new tab) and W3C compliant HTML.
 *
 * Useful when creating big boxes (a teaser) for example with a 'click more' button
 *
 * The script should be initialized only once, all the dynamic content will be handled by it as
 * it uses event delegation
 *
 * ```html
 * <div class="js-clickthrough">
 *   <div>Random text here</div>
 *   <a href="https://url.com" class="js-clickthrough__to" target="_blank">Click for more info</a>
 * </div>
 * ```
 *
 * or without a link
 *
 * ```html
 * <div class="js-clickthrough" data-href="https://url.com" data-target="_blank">
 *   <div>Random text here, click for more</div>
 * </div>
 * ```
 */
export class ClickThrough {
  /**
   * Will attach event listeners on 'js-clickthrough' with event delegation from body
   */
  public static attachEvents(): void {
    window.addEventListener(
      'click',
      (e: MouseEvent) => {
        const elClickThrough = (e.target as HTMLElement).closest('.js-clickthrough')

        // Check if element clicked is the needed element (or inside it)
        if (elClickThrough !== null) {
          // Check if there is href and target set
          let href = elClickThrough.getAttribute('data-href')
          let target = elClickThrough.getAttribute('data-target')

          // If href is not set on the div, search inside the div for a link
          if (href === null) {
            const elUrlHolder = elClickThrough.querySelector('.js-clickthrough__to')

            // If link is found, use the url and target from there
            if (elUrlHolder !== null) {
              href = elUrlHolder.getAttribute('href')
              target = elUrlHolder.getAttribute('target')
            }
          }

          // Prevent default behavior (jumping at top for a '#' and opening a new window)
          if (href === '#' || target === '_blank') {
            e.preventDefault()
          }

          if (href !== null && href !== '#') {
            // Open new window if target is _blank, current window otherwise
            if (target === '_blank') {
              window.open(href)
            } else {
              window.location.href = href
            }
          }
        }
      },
      false
    )
  }
}
