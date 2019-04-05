/**
 * V: 0.1.0
 */

import LazyLoad from 'vanilla-lazyload'

import './LazyLoader.scss'

interface SettingsType {
  elements_selector?: string
  class_loading?: string
  class_loaded?: string
  class_error?: string
}

const lazyLoaderDefaults = {
  elements_selector: '.fw-lazy-load',
  class_loading: 'fw-lazy-load--loading',
  class_loaded: 'fw-lazy-load--loaded',
  class_error: 'fw-lazy-load--error',
}

export class LazyLoader {
  public static instance?: LazyLoad = null
  public static observer?: MutationObserver = null

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

  public static getInstance(): LazyLoad {
    return this.instance
  }

  public static update(): void {
    if (this.instance === null) {
      return
    }

    this.instance.update()
  }

  public static destroy(): void {
    if (this.instance === null) {
      return
    }

    this.instance.destroy()
  }
}
