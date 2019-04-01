/**
 * V: 0.1.0
 */

import './ResponsiveNavbar.scss'

export class ResponsiveNavbar {
  static attach() {
    document.addEventListener('click', e => {
      if (e.target instanceof HTMLElement && e.target.matches('.navbar-burger')) {
        const elTarget = document.getElementById(e.target.dataset.target)

        e.target.classList.toggle('is-active')
        elTarget.classList.toggle('is-active')
      }

      if (e.target instanceof HTMLElement && e.target.closest('.has-dropdown') !== null) {
        const elContainer = e.target.closest('.has-dropdown')

        if (elContainer.classList.contains('is-open') === false) {
          e.preventDefault()
          elContainer.classList.add('is-open')
        }
      }
    })
  }
}
