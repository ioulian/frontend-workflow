import EE from 'onfire.js'
import {throttle} from 'throttle-debounce'
import Settings from '../../../project/Settings'
import 'core-js/features/string/starts-with'

import './JSBreakpoint.scss'

let instance: JSBreakpoint | null = null

export class JSBreakpoint extends EE {
  private prevBreakpoint: string | null = null

  private prevSize: number | null = null

  constructor() {
    super()

    if (!instance) {
      instance = this
    }

    this.createElement()

    window.addEventListener('resize', throttle(Settings.throttle, this.trigger.bind(this)), {
      passive: true,
    })
    window.addEventListener('orientationchange', throttle(Settings.throttle, this.trigger.bind(this)), {
      passive: true,
    })
  }

  private trigger(): void {
    const currentBreakpoint = this.getBreakpoint()

    if (currentBreakpoint !== this.prevBreakpoint) {
      this.fire('changed', {
        breakpoint: currentBreakpoint,
        prevBreakpoint: this.prevBreakpoint,
        // Negative if window got smaller, positive if window gt bigger
        sizeChange: this.prevSize > document.documentElement.clientWidth ? -1 : 1,
      })

      this.updateBreakpoint()
    }
  }

  public updateBreakpoint(): void {
    this.prevBreakpoint = this.getBreakpoint()
    this.prevSize = document.documentElement.clientWidth
  }

  public getBreakpoint(): string | null {
    const style = window.getComputedStyle(this.getElement(), '::before')

    if (style.content === 'normal') {
      return null
    }

    return style.content.startsWith('"') || style.content.startsWith("'")
      ? style.content.slice(1, -1) // Some browsers output quotes around the returned value
      : style.content // Some not...
  }

  /* eslint-disable class-methods-use-this */
  public createElement(): void {
    const elMeta = document.createElement('meta')
    elMeta.classList.add('fw-js-breakpoint')
    document.head.appendChild(elMeta)
  }

  public getElement(): HTMLMetaElement | null {
    return document.head.querySelector('.fw-js-breakpoint')
  }
  /* eslint-enable class-methods-use-this */

  /**
   * @returns {JSBreakpoint} JSBreakpoint instance
   */
  public static getInstance(): JSBreakpoint {
    if (instance === null) {
      instance = new JSBreakpoint()

      // Update current breakpoint on window load (when css/images fully load)
      window.addEventListener('load', () => {
        instance.updateBreakpoint()
      })

      // If document has already been loaded, update breakpoint
      if (document.readyState === 'complete') {
        instance.updateBreakpoint()
      }
    }

    return instance
  }
}
