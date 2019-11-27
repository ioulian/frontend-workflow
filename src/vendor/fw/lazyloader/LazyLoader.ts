/**
 * V: 0.1.0
 */

import LazyLoad from 'vanilla-lazyload/dist/lazyload.amd'

import './LazyLoader.scss'

interface SettingsType {
  elements_selector?: string
  class_loading?: string
  class_loaded?: string
  class_error?: string
}

/* eslint-disable @typescript-eslint/camelcase */
const lazyLoaderDefaults = {
  elements_selector: '.fw-lazy-load',
  class_loading: 'fw-lazy-load--loading',
  class_loaded: 'fw-lazy-load--loaded',
  class_error: 'fw-lazy-load--error',
}
/* eslint-enable @typescript-eslint/camelcase */

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

    this.observer.observe(document, {
      childList: true,
      subtree: true,
    })
  }

  /**
   * @returns {any} Instance of attached LazyLoad
   */
  public static getInstance(): any {
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
