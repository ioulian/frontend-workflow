import 'promise-polyfill/src/polyfill'
import Colcade from 'colcade/colcade'
import {Factory} from '../../base/js/Factory'

declare const window: any

/**
 * Masonry style layout
 */
export class ColcadeLayout extends Factory() {
  private colcadeInstance: any = null

  constructor(el: Element) {
    super(el)

    this.colcadeInstance = new Colcade(this.el, {
      columns: '.fw-colcade__grid-col',
      items: '.fw-colcade__grid-item',
    })
  }
}
