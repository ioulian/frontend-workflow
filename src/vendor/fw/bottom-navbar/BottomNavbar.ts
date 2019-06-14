/**
 * V: 0.1.0
 */
import 'core-js/features/array/from'
import 'core-js/features/array/includes'

import {JSBreakpoint} from './../js-breakpoint/JSBreakpoint'

import {Factory} from '../../base/js/Factory'

import './BottomNavbar.scss'

interface SettingsType {
  breakpoints?: string[]
}

// Default values
const defaults: SettingsType = {
  breakpoints: ['small', 'mobile'],
}

/**
 * Sets the position of fixed navbar to bottom on handheld devices
 * As most smartphone users use their devices with one hand, this is the best UX
 */
export class BottomNavbar extends Factory() {
  private wasFixedTop: boolean = true

  private settings: SettingsType

  public static className: string = 'BottomNavbar'

  constructor(el: Element, settings: SettingsType) {
    super(el)

    const settingsFromDom: SettingsType = {}

    if (this.el.getAttribute('data-bottom-on') !== null) {
      settingsFromDom.breakpoints = this.el.getAttribute('data-bottom-on').split(',')
    }

    this.settings = {
      ...defaults,
      ...settings,
      ...settingsFromDom,
    }

    this.wasFixedTop = this.el.classList.contains('is-fixed-top')

    JSBreakpoint.getInstance().on('changed', () => {
      this.update()
    })

    this.update()
  }

  public update(): void {
    const currentBreakpoint = JSBreakpoint.getInstance().getBreakpoint()

    if (this.settings.breakpoints.includes(currentBreakpoint)) {
      this.el.classList.add('is-fixed-bottom')
      document.documentElement.classList.add('has-navbar-fixed-bottom')

      if (this.wasFixedTop === true) {
        this.el.classList.remove('is-fixed-top')
        document.documentElement.classList.remove('has-navbar-fixed-top')
      }
    } else {
      this.el.classList.remove('is-fixed-bottom')
      document.documentElement.classList.remove('has-navbar-fixed-bottom')

      if (this.wasFixedTop === true) {
        this.el.classList.add('is-fixed-top')
        document.documentElement.classList.add('has-navbar-fixed-top')
      }
    }
  }
}
