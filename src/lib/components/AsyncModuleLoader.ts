import 'core-js/features/array/from'
import 'promise-polyfill/src/polyfill'

export type WatchCallback = (selector: string) => void
export type SingleRunCallback = () => void

export interface WatchConfig {
  selector: string
  callback: WatchCallback
}

export interface SingleRunConfig {
  callback: SingleRunCallback
}

/**
 * Helper class to lazy load components based on DOM elements.
 *
 * If you try to load a component, it will first search for DOM elements that it can apply to.
 * 1: If nothing is found, it will not be loaded, thus saving bandwidth on unneeded JS code
 * 2: If elements are found in the DOM, the component will be loaded and executed on these elements
 *
 * Keep in mind, if you have ajax based navigation, or the DOM is dynamically changed, you'll need to manually
 * load the needed components (preferably in an event listener after the DOM has been updated)
 *
 * This class does not contain all components that are included in this workflow,
 * as some components are not bound on specific elements. These you should add manually.
 */
export class AsyncModuleLoader {
  public static observer?: MutationObserver = null

  public static watches: WatchConfig[] = []

  public static singleRun: SingleRunConfig[] = []

  /**
   * Will add a callback to a watch list that will be triggered every time a HTML changes and selector is found.
   *
   * Example (before "AsyncModuleLoader.loadAll()"):
   *
   * AsyncModuleLoader.addToWatch('.js-filters', (selector: string) => {
   *   Filters.attach(selector)
   * })
   */
  public static addToWatch(selector: string, callback: WatchCallback): void {
    AsyncModuleLoader.watches.push({
      selector,
      callback,
    } as WatchConfig)
  }

  public static addSingleRun(callback: WatchCallback): void {
    AsyncModuleLoader.singleRun.push({
      callback,
    } as SingleRunConfig)
  }

  private static addLibraryComponentsToWatch(): void {
    /* eslint-disable @typescript-eslint/no-misused-promises */
    AsyncModuleLoader.addToWatch('.fw-accordion', async () => {
      await import(/* webpackChunkName: "accordion" */ './accordion/index')
    })

    AsyncModuleLoader.addToWatch('.fw-colcade', async () => {
      await import(/* webpackChunkName: "colcade" */ './colcade/index')
    })

    AsyncModuleLoader.addToWatch('.fw-tablist', async () => {
      await import(/* webpackChunkName: "tablist" */ './tablist/index')
    })

    AsyncModuleLoader.addToWatch('.fw-expandable', async () => {
      await import(/* webpackChunkName: "expandable" */ './expandable/index')
    })

    AsyncModuleLoader.addToWatch('.js-in-view-animation', async () => {
      await import(/* webpackChunkName: "inviewanimation" */ './in-view-animation/index')
    })

    AsyncModuleLoader.addToWatch('.js-sameheight', async () => {
      await import(/* webpackChunkName: "sameheight" */ './sameheight/index')
    })

    AsyncModuleLoader.addToWatch('.navbar.fixed-top', async () => {
      await import(/* webpackChunkName: "fixedheader" */ './fixed-navbar/index')
    })

    AsyncModuleLoader.addToWatch('.navbar.is-bottom-mobile', async () => {
      await import(/* webpackChunkName: "bottomnavbar" */ './bottom-navbar/index')
    })

    AsyncModuleLoader.addToWatch('.swiper-container', async () => {
      await import(/* webpackChunkName: "slider" */ './slider/index')
    })

    AsyncModuleLoader.addToWatch('[data-fancybox]', async () => {
      await import(/* webpackChunkName: "gallery" */ './gallery/index')
    })
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  private static addLibraryComponentsToSingleRun(): void {
    /* eslint-disable @typescript-eslint/no-misused-promises */
    AsyncModuleLoader.addSingleRun(async () => {
      await import(/* webpackChunkName: "clickthrough" */ './clickthrough/index')
    })

    AsyncModuleLoader.addSingleRun(async () => {
      await import(/* webpackChunkName: "lazyloader" */ './lazyloader/index')
    })

    AsyncModuleLoader.addSingleRun(async () => {
      await import(/* webpackChunkName: "scrollintoview" */ './scroll-into-view/index')
    })

    AsyncModuleLoader.addSingleRun(async () => {
      await import(/* webpackChunkName: "socialshare" */ './social-share/index')
    })
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  /**
   * Shortcut to load all components
   */
  public static loadAll(withMutationObserver = true): void {
    // Add library components
    AsyncModuleLoader.addLibraryComponentsToWatch()
    AsyncModuleLoader.addLibraryComponentsToSingleRun()

    // Load all components
    AsyncModuleLoader.loadWatchModules()
    AsyncModuleLoader.loadSingleRunModules()

    if (withMutationObserver === true) {
      AsyncModuleLoader.observer = new MutationObserver(() => {
        // Load watches only on HTML change
        AsyncModuleLoader.loadWatchModules()
      })

      AsyncModuleLoader.observer.observe(document, {
        childList: true,
        subtree: true,
      })
    }
  }

  public static loadWatchModules(): void {
    AsyncModuleLoader.watches.forEach((config: WatchConfig) => {
      if (AsyncModuleLoader.checkIfElementsExist(config.selector)) {
        config.callback.apply(this, [config.selector])
      }
    })
  }

  public static loadSingleRunModules(): void {
    AsyncModuleLoader.singleRun.forEach((config: SingleRunConfig) => {
      config.callback.apply(this)
    })
  }

  /**
   * Searches for elements in DOM matching a specific selector
   *
   * @param {string} selector Selector for DOM elements to search for
   * @returns {boolean} selector TRUE if elements are found, FALSE is not elements are found
   */
  public static checkIfElementsExist(selector: string): boolean {
    return Array.from(document.querySelectorAll(selector)).length !== 0
  }
}
