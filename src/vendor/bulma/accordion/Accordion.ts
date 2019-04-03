/**
 * V: 0.1.0
 */

import EE from 'onfire.js'
import {debounce} from 'throttle-debounce'
import {Factory} from './../../base/js/Factory'

import {AccordionItem} from './AccordionItem'
import Settings from '../../../project/Settings'

import './Accordion.css'

interface SettingsType {
  closeOthers?: boolean
}

const defaults: SettingsType = {
  closeOthers: true,
}

/**
 * Accordion style div expander
 */
export class Accordion extends Factory(EE) {
  private settings: SettingsType

  private items: AccordionItem[]

  private handleOpenedClosed: any

  constructor(el: Element, settings: SettingsType) {
    super(el)

    const settingsFromDom: SettingsType = {}

    if (this.el.getAttribute('data-close-others') !== null) {
      if (this.el.getAttribute('data-close-others') === 'true') {
        settingsFromDom.closeOthers = true
      } else if (this.el.getAttribute('data-close-others') === 'false') {
        settingsFromDom.closeOthers = false
      }
    }

    this.settings = {
      ...defaults,
      ...settings,
      ...settingsFromDom,
    }

    this.initItems()
    this.openFirstIfAny()
  }

  private openFirstIfAny(): void {
    const firstOpenItem = this.items.find((item: AccordionItem) => item.hasOpenClass())

    if (typeof firstOpenItem !== 'undefined') {
      firstOpenItem.open(true)
    }
  }

  private initItems(): void {
    this.handleOpenedClosed = debounce(Settings.debounce, this.triggerResize.bind(this))

    this.items = [...this.el.querySelectorAll('.fw-accordion__item')].map(el => {
      const newItem = new AccordionItem(el)

      if (this.settings.closeOthers === true) {
        newItem.on('open', (e: {target: AccordionItem}) => {
          this.closeOthers(e.target)
        })

        newItem.on('opened', this.handleOpenedClosed.bind(this))
        newItem.on('closed', this.handleOpenedClosed.bind(this))
      }

      return newItem
    })
  }

  public closeOthers(itemNotToClose: AccordionItem): void {
    this.items
      .filter((item: AccordionItem) => item !== itemNotToClose)
      .forEach((item: AccordionItem) => {
        item.close()
      })
  }

  public closeAll(): void {
    this.items.forEach((item: AccordionItem) => {
      item.close()
    })
  }

  public openAll(): void {
    this.items.forEach((item: AccordionItem) => {
      item.open()
    })
  }

  public triggerResize(): void {
    this.fire('resize')
  }
}
