import {throttle} from 'throttle-debounce'
import {classes} from 'polytype'

import {Factory} from '../../base/js/Factory'

import './FixedNavbar.scss'
import Settings from '../../../project/Settings'

/**
 * Allows you to apply styles on the fixed header when the header is floating
 *
 * By default, it will receive a drop shadow to show that the header is floating
 */
export class FixedNavbar extends classes(Factory) {
  public static className: string = 'FixedNavbar'

  constructor(el: Element) {
    super([el])

    window.addEventListener('scroll', throttle(Settings.throttle, this.update.bind(this)), {passive: true})
    window.addEventListener('resize', throttle(Settings.throttle, this.update.bind(this)), {passive: true})
    window.addEventListener('orientationchange', throttle(Settings.throttle, this.update.bind(this)), {passive: true})

    window.addEventListener('resize', throttle(Settings.throttle, this.updatePadding.bind(this)), {passive: true})
    window.addEventListener('orientationchange', throttle(Settings.throttle, this.updatePadding.bind(this)), {
      passive: true,
    })

    this.update()
    this.updatePadding()
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

  public updatePadding(): void {
    const isFixedTop = this.el.classList.contains('fixed-top')
    const isFixedBottom = this.el.classList.contains('fixed-bottom')

    // @ts-ignore
    document.body.style.paddingTop = `${isFixedTop ? (this.el.offsetHeight as number) : 0}px`
    // @ts-ignore
    document.body.style.paddingBottom = `${isFixedBottom ? (this.el.offsetHeight as number) : 0}px`
  }
}
