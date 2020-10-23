import AriaTablist from 'aria-tablist'
import {Factory} from '../../base/js/Factory'

/**
 * Slider
 */
export class TabList extends Factory() {
  public static className: string = 'TabList'

  constructor(el: Element) {
    super(el)

    AriaTablist(this.el)
  }
}
