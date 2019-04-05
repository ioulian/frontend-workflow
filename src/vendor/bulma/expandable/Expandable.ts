/**
 * V: 0.1.0
 */

import EE from 'onfire.js'
import {throttle} from 'throttle-debounce'
import {Factory} from './../../base/js/Factory'

import Settings from '../../../project/Settings'
import './Expandable.scss'

/**
 * Expandable block
 */
export class Expandable extends Factory(EE) {
  private elToggle?: HTMLElement

  private elContent?: HTMLElement

  private elContentWrapper?: HTMLElement

  private handleOpenTransitionEndBinded?: any

  private handleCloseTransitionEndBinded?: any

  constructor(el: Element) {
    super(el)

    this.elToggle = this.el.querySelector('.fw-expandable__toggle')
    this.elContent = this.el.querySelector('.fw-expandable__content')
    this.elContentWrapper = this.el.querySelector('.fw-expandable__content-wrapper')

    this.handleOpenTransitionEndBinded = this.handleOpenTransitionEnd.bind(this)
    this.handleCloseTransitionEndBinded = this.handleCloseTransitionEnd.bind(this)

    this.addEventListeners()

    this.el.classList.add('fw-expandable--init')
  }

  private addEventListeners() {
    window.addEventListener('resize', throttle(Settings.throttle, this.update.bind(this)), false)
    window.addEventListener('orientationchange', throttle(Settings.throttle, this.update.bind(this)), false)

    if (this.elToggle && this.elToggle instanceof HTMLElement) {
      this.elToggle.addEventListener('click', (e: Event) => {
        e.preventDefault()
        this.toggle()
      })
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

  public open(force: boolean = false): void {
    if (this.isOpen === true && force === false) {
      return
    }

    this.removeAllTransitionEventListeners()
    this.el.addEventListener('transitionend', this.handleOpenTransitionEndBinded, false)

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

      this.fire('opened', {
        target: this,
      })
    }
  }

  private handleCloseTransitionEnd(e: Event): void {
    if (e.target === this.elContentWrapper) {
      this.el.removeEventListener('transitionend', this.handleCloseTransitionEndBinded, false)

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
