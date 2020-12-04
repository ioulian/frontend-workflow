import {classes} from 'polytype'
import AriaTablist from 'aria-tablist'

import {Factory} from '../../base/js/Factory'

/**
 * Slider
 */
export class TabList extends classes(Factory) {
  public static className: string = 'TabList'

  constructor(el: Element) {
    super([el])

    AriaTablist(this.el as HTMLElement)

    TabList.makeGlobal(TabList.className)
  }
}
