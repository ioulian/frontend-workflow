/**
 * V: 0.1.0
 */

import {Factory} from './../../base/js/Factory'

import './FixedHeader.scss'

/**
 * Allowes you to apply styles on the fixed header when the header is floating
 *
 * By default, it will receive a drop shadow to show that the header is floating
 */
export class FixedHeader extends Factory() {
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

  public update() {
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
