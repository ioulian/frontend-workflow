/**
 * V: 0.1.0
 */

import {Factory} from './../../base/js/Factory'

import './ScrollHidableNavbar.scss'

/**
 * Allowes you to apply styles on the fixed header when the header is floating
 *
 * By default, it will receive a drop shadow to show that the header is floating
 */
export class ScrollHidableNavbar extends Factory() {
  private prevScrollTop: number = 0

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

    // Listen on resize
    window.addEventListener(
      'resize',
      () => {
        this.update()
      },
      {passive: true}
    )

    this.update()
  }

  public update() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (currentScrollTop > this.prevScrollTop) {
      // Scrolling down, hide
      // Check if user has scrolled past the navbar height and add a class to the element
      // You can also do this in one line with .toggle(..., force), but we try to support IE 10/11
      if (currentScrollTop > this.el.clientHeight) {
        this.el.classList.add('js-is-scroll-hidden')
      } else {
        this.el.classList.remove('js-is-scroll-hidden')
      }
    } else {
      // Scrolling up, always show
      this.el.classList.remove('js-is-scroll-hidden')
    }

    this.prevScrollTop = currentScrollTop
  }
}
