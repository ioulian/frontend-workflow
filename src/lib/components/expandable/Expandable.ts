import EE from 'onfire.js'
import {throttle} from 'throttle-debounce'
import {Factory} from '../../base/js/Factory'

import Settings from '../../../project/Settings'
import './Expandable.scss'

/**
 * Expandable block
 *
 * When using, keep in mind that '.fw-expandable__toggle' needs to have an id and
 * '.fw-expandable__content-wrapper' also needs an id
 */
export class Expandable extends Factory(EE) {
  private elToggle?: HTMLElement

  private elContent?: HTMLElement

  private elContentWrapper?: HTMLElement

  private handleOpenTransitionEndBinded?: any

  private handleCloseTransitionEndBinded?: any

  public static className: string = 'Expandable'

  constructor(el: Element) {
    super(el)

    this.elToggle = this.el.querySelector('.fw-expandable__toggle')
    this.elContent = this.el.querySelector('.fw-expandable__content')
    this.elContentWrapper = this.el.querySelector('.fw-expandable__content-wrapper')

    this.handleOpenTransitionEndBinded = this.handleOpenTransitionEnd.bind(this)
    this.handleCloseTransitionEndBinded = this.handleCloseTransitionEnd.bind(this)

    this.setAriaAttributes()
    this.addEventListeners()

    this.el.classList.add('fw-expandable--init')
  }

  private setAriaAttributes(): void {
    // Set attributes on toggler
    this.elToggle.setAttribute('aria-expanded', 'false')
    this.elToggle.setAttribute('aria-controls', this.elContentWrapper.getAttribute('id'))
    this.elToggle.setAttribute('role', 'button')

    if (this.elToggle.getAttribute('tabindex') === null) {
      this.elToggle.setAttribute('tabindex', '0')
    }

    // Set attributes on wrapper
    this.elContentWrapper.setAttribute('aria-labelledby', this.elToggle.getAttribute('id'))
    this.elContentWrapper.setAttribute('hidden', null)

    if (this.elContentWrapper.getAttribute('role') === null) {
      this.elContentWrapper.setAttribute('role', 'region')
    }
  }

  /**
   * Attaches event listeners on window to check if the window size is changed
   */
  private addEventListeners(): void {
    window.addEventListener('resize', throttle(Settings.throttle, this.update.bind(this)), {passive: true})
    window.addEventListener('orientationchange', throttle(Settings.throttle, this.update.bind(this)), {passive: true})

    if (this.elToggle && this.elToggle instanceof HTMLElement) {
      this.elToggle.addEventListener(
        'click',
        (e: MouseEvent) => {
          e.preventDefault()
          this.toggle()
        },
        false
      )

      // Handle tab navigation (for accessibility)
      document.addEventListener(
        'keypress',
        (e: KeyboardEvent) => {
          const keyCode = e.keyCode ? e.keyCode : e.which

          // Check if this element is focussed and the pressed key is "enter"
          if (document.activeElement === this.elToggle && (keyCode === 13 || keyCode === 32)) {
            if (keyCode === 32) {
              e.preventDefault()
            }

            this.toggle()
          }
        },
        false
      )
    }
  }

  get isOpen(): boolean {
    return this.hasOpenClass()
  }

  public hasOpenClass(): boolean {
    return this.el.classList.contains('fw-expandable--open')
  }

  public toggle(): void {
    if (this.isOpen === true) {
      this.close()
    } else {
      this.open()
    }
  }

  public open(force = false): void {
    if (this.isOpen === true && force === false) {
      return
    }

    this.removeAllTransitionEventListeners()
    this.el.addEventListener('transitionend', this.handleOpenTransitionEndBinded, false)

    this.elContentWrapper.removeAttribute('hidden')
    this.el.classList.add('fw-expandable--open')
    this.update()

    this.fire('open', {
      target: this,
    })
  }

  public close(): void {
    if (this.isOpen === false) {
      return
    }

    this.removeAllTransitionEventListeners()
    this.el.addEventListener('transitionend', this.handleCloseTransitionEndBinded, false)

    this.el.classList.remove('fw-expandable--open')
    this.update()

    this.fire('close', {
      target: this,
    })
  }

  private removeAllTransitionEventListeners(): void {
    this.el.removeEventListener('transitionend', this.handleOpenTransitionEndBinded, false)
    this.el.removeEventListener('transitionend', this.handleCloseTransitionEndBinded, false)
  }

  private handleOpenTransitionEnd(e: Event): void {
    if (e.target === this.elContentWrapper) {
      this.el.removeEventListener('transitionend', this.handleOpenTransitionEndBinded, false)

      this.el.setAttribute('aria-expanded', 'true')

      this.fire('opened', {
        target: this,
      })
    }
  }

  private handleCloseTransitionEnd(e: Event): void {
    if (e.target === this.elContentWrapper) {
      this.el.removeEventListener('transitionend', this.handleCloseTransitionEndBinded, false)

      this.el.setAttribute('aria-expanded', 'false')
      this.elContentWrapper.setAttribute('hidden', null)

      this.fire('closed', {
        target: this,
      })
    }
  }

  public update(): void {
    this.setContentHeight()
  }

  private setContentHeight(): void {
    if (this.elContentWrapper && this.elContentWrapper instanceof HTMLElement) {
      if (this.isOpen) {
        if (this.elContent && this.elContent instanceof HTMLElement) {
          this.elContentWrapper.style.height = `${this.elContent.offsetHeight}px`
        }
      } else {
        this.elContentWrapper.removeAttribute('style')
      }
    }
  }
}
