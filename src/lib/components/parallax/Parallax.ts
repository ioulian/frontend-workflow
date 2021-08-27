import {classes} from 'polytype'

import {Factory} from '../../base/js/Factory'

/**
 * Basic parallax functionality based on window scroll position
 */
export class Parallax extends classes(Factory) {
  public static attached = false

  public static shouldAnimate = false

  public static timeout: number | null = null

  public static className = 'Parallax'

  constructor(el: Element) {
    super([el])
    Parallax.makeGlobal(Parallax.className)

    // Only activate this logic once per page
    if (Parallax.attached === false) {
      // Only activate the animation if user has scrolled
      window.addEventListener('scroll', () => {
        // If currently not animating, start animation
        if (Parallax.shouldAnimate === false) {
          Parallax.shouldAnimate = true
          Parallax.updateInstances()
        }

        // If previous timeout is set, clear it
        if (Parallax.timeout !== null) {
          window.clearTimeout(Parallax.timeout)
        }

        // Set timeout to stop the animation after a set time
        Parallax.timeout = window.setTimeout(() => {
          Parallax.shouldAnimate = false
          Parallax.timeout = null
        }, 100)
      })

      // Preset position (needed if a user refreshes the page after scroll, the top will be preset by the browser)
      Parallax.updateInstances()
      Parallax.attached = true
    }
  }

  public update(offset: number): void {
    const depth: number = parseFloat(this.el.getAttribute('data-depth') || '0.5')
    const translate3d = `translate3d(0, ${(offset * depth).toFixed(5)}px, 0)`

    if (this.el instanceof HTMLElement) {
      this.el.style.transform = translate3d
    }
  }

  /**
   * Updates all instances
   */
  public static updateInstances(): void {
    const offset: number = window.pageYOffset || document.documentElement.scrollTop

    Parallax.instances.forEach((instance) => {
      instance.update(offset)
    })

    // Do not request a new frame if the animation should be stopped
    if (Parallax.shouldAnimate === true) {
      window.requestAnimationFrame(Parallax.updateInstances.bind(this))
    }
  }
}
