/**
 * V: 0.1.0
 */

import {Factory} from '../../base/js/Factory'

import {ResponsiveNavbar} from '../responsive-navbar/ResponsiveNavbar'

/**
 * Provides better accessibility for dropdown
 */
export class Dropdown extends Factory() {
  private parent: ResponsiveNavbar | null = null

  public static className: string = 'Dropdown'

  constructor(el: Element, parent: ResponsiveNavbar = null) {
    super(el)

    this.parent = parent

    this.el.setAttribute('tabindex', '0')

    this.el.addEventListener(
      'click',
      (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && (e.target === this.el || e.target.parentNode === this.el)) {
          if (this.isOpen() === false) {
            e.preventDefault()
            this.open()
          } else if (e.target.parentNode === this.el && e.target.getAttribute('href') === null) {
            // If the item is not clickable and is direct child of parent then close the dropdown
            // This can happen if the menu item itself is not clickable, only the children are
            e.preventDefault()
            this.close()
          }
        }
      },
      false
    )

    document.addEventListener(
      'click',
      (e: MouseEvent) => {
        const isClickInsideDropdown = e.target instanceof HTMLElement && e.target.closest('.has-dropdown') === this.el

        const isClickInsideParent =
          this.parent !== null && e.target instanceof HTMLElement && e.target.closest('.navbar') === this.parent.el
        if ((!isClickInsideDropdown && this.parent === null) || (!isClickInsideDropdown && !isClickInsideParent)) {
          this.close()
        }
      },
      false
    )

    // Handle space and enter press on keyboard navigation
    document.addEventListener(
      'keypress',
      (e: KeyboardEvent) => {
        const keyCode = e.keyCode ? e.keyCode : e.which

        if (document.activeElement === this.el && (keyCode === 13 || keyCode === 32)) {
          e.preventDefault()

          if (this.isOpen()) {
            this.close()
          } else {
            if (this.parent !== null) {
              this.parent.closeAllDropdowns()
            }
            this.open()
          }
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
          // Only close if this is a stand-alone dropdown
          // If it's inside a responsiveNavbar, responsiveNavbar will handle the rest
          if (this.parent === null) {
            this.close()
          }
        }
      },
      false
    )
  }

  public isOpen(): boolean {
    return this.el.classList.contains('is-open')
  }

  public toggle(): void {
    if (this.isOpen()) {
      this.close()
    } else {
      this.open()
    }
  }

  public close(): void {
    this.el.classList.remove('is-active')
    this.el.classList.remove('is-open')
  }

  public open(): void {
    this.el.classList.add('is-active')
    this.el.classList.add('is-open')
  }
}
