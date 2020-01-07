/**
 * V: 0.1.0
 */

import {Factory} from '../../base/js/Factory'

import './FixedNavbar.scss'

/**
 * Allowes you to apply styles on the fixed header when the header is floating
 *
 * By default, it will receive a drop shadow to show that the header is floating
 */
export class FixedNavbar extends Factory() {
  public static className: string = 'FixedNavbar'

  constructor(el: Element) {
    super(el)

    // Listen on scroll
    window.addEventListener(
      'scroll',
      () => {
        this.update()
      },
      {passive: true}
    )

    this.update()
  }

  public update(): void {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Check if user has scrolled and add a class to the element
    // You can also do this in one line with .toggle(..., force), but we try to support IE 10/11
    if (currentScrollTop !== 0) {
      this.el.classList.add('js-navbar--not-top')
    } else {
      this.el.classList.remove('js-navbar--not-top')
    }
  }
}
