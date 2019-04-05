/**
 * V: 1.1.0
 */

import {throttle} from 'throttle-debounce'
import {Factory} from './../../base/js/Factory'
import Settings from '../../../project/Settings'

enum HeightAttribute {
  'min-height' = 'minHeight',
  'height' = 'height',
}

interface SettingsType {
  perRow?: boolean
  heightAttribute?: HeightAttribute
  watchSubtreeModification?: boolean
}

// Default values
const defaults: SettingsType = {
  perRow: true,
  heightAttribute: HeightAttribute['min-height'],
  watchSubtreeModification: true,
}

const allSameHeights: SameHeight[] = []

const elementDocumentOffsetTop = (el: Element): number =>
  (el as HTMLElement).offsetTop +
  (el.parentElement && el.parentElement instanceof HTMLElement ? elementDocumentOffsetTop(el.parentElement) : 0)

/**
 * This script allows you to make HTMLElements have the same height
 */
export class SameHeight extends Factory() {
  private settings: SettingsType

  private classes: string[]

  private observer: MutationObserver

  private throttledResize: any

  constructor(el: Element, settings: SettingsType) {
    super(el)

    const settingsFromDom: SettingsType = {}

    if (this.el.getAttribute('data-per-row') !== null) {
      if (this.el.getAttribute('data-per-row') === 'true') {
        settingsFromDom.perRow = true
      } else if (this.el.getAttribute('data-per-row') === 'false') {
        settingsFromDom.perRow = false
      }
    }

    if (this.el.getAttribute('data-height-attribute') !== null) {
      if (this.el.getAttribute('data-height-attribute') === 'min-height') {
        settingsFromDom.heightAttribute = HeightAttribute['min-height']
      } else if (this.el.getAttribute('data-height-attribute') === 'height') {
        settingsFromDom.heightAttribute = HeightAttribute.height
      }
    }

    if (this.el.getAttribute('data-watch-subtree-modification') !== null) {
      if (this.el.getAttribute('data-watch-subtree-modification') === 'true') {
        settingsFromDom.watchSubtreeModification = true
      } else if (this.el.getAttribute('data-watch-subtree-modification') === 'false') {
        settingsFromDom.watchSubtreeModification = false
      }
    }

    this.settings = {
      ...defaults,
      ...settings,
      ...settingsFromDom,
    }

    const classesAttribute = this.el.getAttribute(`data-child-selector`)
    if (classesAttribute) {
      this.classes = classesAttribute.split('|')
    }

    this.throttledResize = throttle(Settings.throttle, this.update.bind(this))
    window.addEventListener('resize', this.throttledResize, {passive: true})
    this.update()

    // Add subtree watcher
    if (this.settings.watchSubtreeModification === true) {
      this.addMutationObserver()
    }
  }

  /**
   * Adds MutationObserver to watch for subtree modification and update SameHeight
   */
  private addMutationObserver(): void {
    this.observer = new MutationObserver(() => {
      this.update()
    })

    this.observer.observe(this.el, {
      childList: true,
      subtree: true,
    })
  }

  /**
   * Removes MutationObserver
   */
  private removeMutationObserver(): void {
    if (typeof this.observer !== 'undefined') {
      this.observer.disconnect()
    }
  }

  /**
   * Cleans up this SameHeight instance
   */
  public destroy(): void {
    window.removeEventListener('resize', this.throttledResize)
    this.el.classList.remove('same-height-active')
    this.removeMutationObserver()

    this.classes.forEach(elClass => {
      ;[...this.el.querySelectorAll(elClass)].forEach(el => {
        el.removeAttribute('style')
      })
    })
  }

  /**
   * Updates the height of the children
   */
  public update(): void {
    this.classes.forEach(elClass => {
      this.applyHeight([...this.el.querySelectorAll(elClass)])
    })
  }

  /**
   * Calculates the max height of the elements (per row if needed) and applies that to the elements
   *
   * @param {Element[]} elements
   */
  private applyHeight(elements: Element[]): void {
    let rowIndexes: number[] = []
    let maxHeight: number = 0
    let prevTop: number = null

    elements.forEach((el: Element, i: number) => {
      el.removeAttribute('style')

      const isVisible = !!(
        (el as HTMLElement).offsetWidth ||
        (el as HTMLElement).offsetHeight ||
        el.getClientRects().length
      )

      if (isVisible) {
        const boundingRect = el.getBoundingClientRect()

        if (this.settings.perRow === true) {
          const top = Math.ceil(elementDocumentOffsetTop(el))

          if (prevTop === null) {
            prevTop = top
          }

          if (prevTop !== top) {
            this.setHeightToEls(elements, rowIndexes, maxHeight)

            rowIndexes = []
            maxHeight = 0
            prevTop = Math.ceil(elementDocumentOffsetTop(el))
          }
        }

        if ((el as HTMLElement).offsetHeight > maxHeight) {
          maxHeight = Math.ceil(boundingRect.height)
        }

        rowIndexes.push(i)
      }
    })

    this.setHeightToEls(elements, rowIndexes, maxHeight)
  }

  private setHeightToEls(elements: Element[], indexes: number[], height: number): void {
    indexes.forEach((i: number) => {
      ;(elements[i] as HTMLElement).style[this.settings.heightAttribute] = `${height}px`
    })
  }

  public static destroyAll(): void {
    allSameHeights.forEach(el => {
      el.destroy()
    })
  }

  public static updateAll(): void {
    allSameHeights.forEach(el => {
      el.update()
    })
  }

  public static updateInside(elParent: HTMLElement): void {
    allSameHeights
      .filter(instance => elParent.contains(instance.el))
      .forEach(instance => {
        instance.update()
      })
  }
}
