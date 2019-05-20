/**
 * V: 0.1.2
 */

import {Factory} from './../../base/js/Factory'

/**
 * Basic parallax functionality based on window scroll position
 */
export class Parallax extends Factory() {
  public static isAnimating: boolean = false

  public static className: string = 'Parallax'

  constructor(el: Element) {
    super(el)
  }

  public update(offset: number): void {
    const depth: number = parseFloat(this.el.getAttribute('data-depth') || '0.5')
    const translate3d: string = `translate3d(0, ${(offset * depth).toFixed(5)}px, 0)`

    if (this.el instanceof HTMLElement) {
      this.el.style.transform = translate3d
    }
  }

  public static attach(selector: string, ...restArgs: any[]): void {
    super.attach(selector, ...restArgs)

    if (Parallax.isAnimating === false) {
      window.requestAnimationFrame(Parallax.updateInstances.bind(this))
      Parallax.isAnimating = true
    }
  }

  /**
   * Updates all instances
   */
  public static updateInstances(): void {
    const offset: number = window.pageYOffset || document.documentElement.scrollTop

    Parallax.instances.forEach(instance => {
      instance.update(offset)
    })

    window.requestAnimationFrame(Parallax.updateInstances.bind(this))
  }
}
