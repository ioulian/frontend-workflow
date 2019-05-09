/**
 * V: 0.1.0
 */

// import 'element-matches-polyfill'

import {Factory} from './../../base/js/Factory'

import {Dropdown} from '../dropdown/Dropdown'

import './ResponsiveNavbar.scss'

/**
 * Allows toggle of menu inside a navbar by using a hamburger button.
 *
 * If a menu-item contains a submenu (Bulma dropdown), then it will be hidden by default on mobile
 * On first click, it will open the submenu on mobile, the next clicks will navigate to the url on the anchor
 * If no url is found, then the submenu will close
 */
export class ResponsiveNavbar extends Factory() {
  private elBurger: HTMLElement | null = null
  private elMenu: HTMLElement | null = null
  private elDropdowns: HTMLElement[] = []
  private dropdowns: Dropdown[] = []

  constructor(el: Element) {
    super(el)

    this.elBurger = this.el.querySelector('.navbar-burger')
    this.elMenu = this.el.querySelector('.navbar-menu')
    this.elDropdowns = Array.from(this.el.querySelectorAll('.has-dropdown'))
    this.dropdowns = this.elDropdowns.map((elDropdown: HTMLElement) => new Dropdown(elDropdown, this))

    this.attachBurgerEvents()
  }

  private attachBurgerEvents(): void {
    if (this.elBurger === null) {
      return
    }

    // Handle normal click
    this.elBurger.addEventListener(
      'click',
      e => {
        this.toggle()
      },
      false
    )

    // Handle space and enter press on keyboard navigation
    document.addEventListener(
      'keypress',
      (e: KeyboardEvent) => {
        const keyCode = e.keyCode ? e.keyCode : e.which

        // Check if the focussed element is hamburger menu
        if (document.activeElement === this.elBurger && (keyCode === 13 || keyCode === 32)) {
          e.preventDefault()

          this.toggle()
        }
      },
      false
    )

    // Handle escape press
    document.addEventListener(
      'keyup',
      (e: KeyboardEvent) => {
        const keyCode = e.keyCode ? e.keyCode : e.which

        // Escape
        if (keyCode === 27) {
          if (this.areAnyDropdownsOpen()) {
            // First close all dropdowns
            this.closeAllDropdowns()
          } else {
            // Then close the navbar itself
            this.close()
          }
        }
      },
      false
    )
  }

  public areAnyDropdownsOpen(): boolean {
    return this.dropdowns.reduce((anyOpen: boolean, dropdown: Dropdown) => anyOpen || dropdown.isOpen(), false)
  }

  public isOpen(): boolean {
    return this.elMenu.classList.contains('is-active')
  }

  public toggle(): void {
    if (this.isOpen()) {
      this.close()
    } else {
      this.open()
    }
  }

  public close(): void {
    this.elMenu.classList.remove('is-active')
    this.elBurger.classList.remove('is-active')
  }

  public open(): void {
    this.elMenu.classList.add('is-active')
    this.elBurger.classList.add('is-active')
  }

  public closeAllDropdowns(): void {
    this.dropdowns.forEach((dropdown: Dropdown) => {
      dropdown.close()
    })
  }
}
