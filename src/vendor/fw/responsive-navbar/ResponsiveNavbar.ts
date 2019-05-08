/**
 * V: 0.1.0
 */

import 'element-matches-polyfill'
import 'core-js/features/array/from'

import './ResponsiveNavbar.scss'

/**
 * Allows toggle of menu inside a navbar by using a hamburger button.
 *
 * If a menu-item contains a submenu (Bulma dropdown), then it will be hidden by default on mobile
 * On first click, it will open the submenu on mobile, the next clicks will navigate to the url on the anchor
 * If no url is found, then the submenu will close
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

        if (elContainer.classList.contains('is-open') === false) {
          e.preventDefault()
          elContainer.classList.add('is-open')
        } else if (e.target.parentNode === elContainer && e.target.getAttribute('href') === null) {
          // If the item is not clickable and is direct child of parent then close the dropdown
          // This can happen if the menu item itself is not clickable, only the children are
          e.preventDefault()
          elContainer.classList.remove('is-open')
        }
      } else {
        ResponsiveNavbar.closeAllDropdowns()
      }
    })

    // Handle tab navigation (for accessibility)
    document.addEventListener(
      'keypress',
      (e: KeyboardEvent) => {
        const keyCode = e.keyCode ? e.keyCode : e.which

        // Check if the focussed element is hamburger menu
        if (
          document.activeElement instanceof HTMLElement &&
          document.activeElement.classList.contains('navbar-burger') &&
          (keyCode === 13 || keyCode === 32)
        ) {
          e.preventDefault()

          const elTarget = document.getElementById(document.activeElement.dataset.target)

          document.activeElement.classList.toggle('is-active')
          elTarget.classList.toggle('is-active')
        }

        // Check if the focussed element is dropdown
        if (
          document.activeElement instanceof HTMLElement &&
          document.activeElement.classList.contains('has-dropdown') &&
          (keyCode === 13 || keyCode === 32)
        ) {
          e.preventDefault()

          if (document.activeElement.classList.contains('is-active') === false) {
            ResponsiveNavbar.closeAllDropdowns()
            document.activeElement.classList.add('is-active')
            document.activeElement.classList.add('is-open')
          } else {
            document.activeElement.classList.remove('is-active')
            document.activeElement.classList.remove('is-open')
          }
        }
      },
      false
    )

    // Handle close on escape
    document.addEventListener(
      'keyup',
      (e: KeyboardEvent) => {
        const keyCode = e.keyCode ? e.keyCode : e.which

        // Handle escape
        if (keyCode === 27) {
          ResponsiveNavbar.closeAllDropdowns()
        }
      },
      false
    )
  }

  public static closeAllDropdowns(): void {
    Array.from(document.querySelectorAll('.has-dropdown')).forEach((el: HTMLElement) => {
      el.classList.remove('is-active')
      el.classList.remove('is-open')
    })
  }
}
