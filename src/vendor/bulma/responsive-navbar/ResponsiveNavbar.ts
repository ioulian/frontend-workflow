/**
 * V: 0.1.0
 */

import {Factory} from './../../base/js/Factory'

export class ResponsiveNavbar extends Factory() {
  constructor(el: Element) {
    super(el)

    this.el.addEventListener('click', () => {
      const elTarget = document.getElementById((el as HTMLElement).dataset.target)

      el.classList.toggle('is-active')
      elTarget.classList.toggle('is-active')
    })
  }
}
