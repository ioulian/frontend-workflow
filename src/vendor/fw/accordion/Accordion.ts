/**
 * V: 0.1.0
 */

import 'core-js/features/array/from'
import 'core-js/features/array/find'

import EE from 'onfire.js'
import {debounce} from 'throttle-debounce'
import {Factory} from './../../base/js/Factory'

import {AccordionItem} from './AccordionItem'
import Settings from '../../../project/Settings'

interface SettingsType {
  closeOthers?: boolean
}

const defaults: SettingsType = {
  // TRUE: Close other accordion items if another one gets opened
  // FALSE: Other accordion items stay open
  closeOthers: true,
}

/**
 * Accordion style div expander
 */
export class Accordion extends Factory(EE) {
  private settings: SettingsType

  private items: AccordionItem[]

  private handleOpenedClosed: any

  public static className: string = 'Accordion'

  constructor(el: Element, settings: SettingsType) {
    super(el)

    // Get settings from DOM data-attributes
    const settingsFromDom: SettingsType = {}

    if (this.el.getAttribute('data-close-others') !== null) {
      if (this.el.getAttribute('data-close-others') === 'true') {
        settingsFromDom.closeOthers = true
      } else if (this.el.getAttribute('data-close-others') === 'false') {
        settingsFromDom.closeOthers = false
      }
    }

    this.settings = {
      ...defaults, // Use default first
      ...settings, // Override it with passed settings
      ...settingsFromDom, // But DOM data attributes are more important
    }

    this.initItems()
    this.openFirstIfAny()

    // Make sure it opens on dev environment when css is loaded later
    window.addEventListener('load', () => {
      this.openFirstIfAny()
    })
  }

  /**
   * Automatically open an accordion item if correct class is set
   */
  private openFirstIfAny(): void {
    const firstOpenItem = this.items.find((item: AccordionItem) => item.hasOpenClass())

    if (typeof firstOpenItem !== 'undefined') {
      firstOpenItem.open(true)
    }
  }

  /**
   * Creates AccordionItems from DOM Elements and sets correct event listeners
   */
  private initItems(): void {
    this.handleOpenedClosed = debounce(Settings.debounce, this.triggerResize.bind(this))

    this.items = Array.from(this.el.querySelectorAll('.fw-accordion__item')).map(el => {
      const newItem = new AccordionItem(el as Element)

      if (this.settings.closeOthers === true) {
        newItem.on('open', (e: {target: AccordionItem}) => {
          this.closeOthers(e.target)
        })
      }

      newItem.on('opened', this.handleOpenedClosed.bind(this))
      newItem.on('closed', this.handleOpenedClosed.bind(this))

      return newItem
    })
  }

  /**
   * Closes all AccordionItems except from one
   * @param {AccordionItem} itemNotToClose Accordion item that should be open
   */
  public closeOthers(itemNotToClose: AccordionItem): void {
    this.items
      .filter((item: AccordionItem) => item !== itemNotToClose)
      .forEach((item: AccordionItem) => {
        item.close()
      })
  }

  /**
   * Closes all accordion items
   */
  public closeAll(): void {
    this.items.forEach((item: AccordionItem) => {
      item.close()
    })
  }

  /**
   * Opens all accordion items
   */
  public openAll(): void {
    this.items.forEach((item: AccordionItem) => {
      item.open()
    })
  }

  /**
   * Triggers resize event when closing or opening items inside
   */
  public triggerResize(): void {
    this.fire('resize')
  }
}
