/**
 * V: 0.1.0
 */

import './ResponsiveNavbar.scss'

/**
 * Allows toggle of menu inside a navbar by using a hamburger button.
 *
 * If a menu-item contains a submenu (Bulma dropdown), then it will be hidden by default on mobile
 * On first click, it will open the submenu on mobile, the next clicks will navigate to the url on the anchor
 */
export class ResponsiveNavbar {
  /**
   * Attaches event listeners on all ".navbar-burger" elements (delegated).
   */
  public static attach() {
    document.addEventListener('click', e => {
      if (e.target instanceof HTMLElement && e.target.matches('.navbar-burger')) {
        const elTarget = document.getElementById(e.target.dataset.target)

        e.target.classList.toggle('is-active')
        elTarget.classList.toggle('is-active')
      }

      // Handle submenu's
      if (e.target instanceof HTMLElement && e.target.closest('.has-dropdown') !== null) {
        const elContainer = e.target.closest('.has-dropdown')

        // TODO: check if item has an url, and if not, the submenu can be closed then?
        if (elContainer.classList.contains('is-open') === false) {
          e.preventDefault()
          elContainer.classList.add('is-open')
        }
      }
    })
  }
}
