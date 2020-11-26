import LazyLoad from 'vanilla-lazyload/dist/lazyload.amd'

import './LazyLoader.scss'

/* eslint-disable camelcase */
interface SettingsType {
  elements_selector?: string
  class_loading?: string
  class_loaded?: string
  class_error?: string
}
/* eslint-enable camelcase */

/* eslint-disable camelcase */
const lazyLoaderDefaults = {
  elements_selector: '.fw-lazy-load',
  class_loading: 'fw-lazy-load--loading',
  class_loaded: 'fw-lazy-load--loaded',
  class_error: 'fw-lazy-load--error',
}
/* eslint-enable camelcase */

/**
 * Wrapper around "vanilla-lazyload"
 *
 * Will listen to DOM changes too with MutationObserver
 */
export class LazyLoader {
  public static instance?: any = null

  public static observer?: MutationObserver = null

  /**
   * @param {SettingsType} settings Settings to pass to LazyLoad instance
   */
  public static attach(settings: SettingsType = {}): void {
    this.instance = new LazyLoad({
      ...lazyLoaderDefaults,
      ...settings,
    })

    // Add observer if content changes from ajax
    this.observer = new MutationObserver(() => {
      this.update()
    })

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  /**
   * @returns {any} Instance of attached LazyLoad
   */
  public static getInstance(): any {
    // eslint-disable-next-line
    return this.instance
  }

  /**
   * Force update of LazyLoad
   */
  public static update(): void {
    if (this.instance === null) {
      return
    }

    this.instance.update()
  }

  /**
   * Destroy LazyLoad instance and stop DOM observation
   */
  public static destroy(): void {
    if (this.instance !== null) {
      this.instance.destroy()
    }

    if (this.observer !== null) {
      this.instance.disconnect()
    }
  }
}
