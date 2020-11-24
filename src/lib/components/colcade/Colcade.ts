import Colcade from 'colcade/colcade'
import {Factory} from '../../base/js/Factory'

/**
 * Masonry style layout
 */
export class ColcadeLayout extends Factory() {
  private colcadeInstance: any = null

  public static className: string = 'Colcade'

  constructor(el: Element) {
    super(el)

    this.colcadeInstance = new Colcade(this.el, {
      columns: '.fw-colcade__grid-col',
      items: '.fw-colcade__grid-item',
    })
  }
}
