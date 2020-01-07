import 'core-js/features/array/from'
import 'promise-polyfill/src/polyfill'

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

  /**
   * Lazy loads "Accordion" if needed on the page
   */
  public static async loadAccordion(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.fw-accordion')) {
      await import(/* webpackChunkName: "accordion" */ './accordion/index')
    }
  }

  /**
   * Lazy loads "Expandable" if needed on the page
   */
  public static async loadExpandable(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.fw-expandable')) {
      await import(/* webpackChunkName: "expandable" */ './expandable/index')
    }
  }

  /**
   * Lazy loads "InViewAnimation" if needed on the page
   */
  public static async loadInViewAnimation(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-in-view-animation')) {
      await import(/* webpackChunkName: "inviewanimation" */ './in-view-animation/index')
    }
  }

  /**
   * Lazy loads "SameHeight" if needed on the page
   */
  public static async loadSameHeight(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-sameheight')) {
      await import(/* webpackChunkName: "sameheight" */ './sameheight/index')
    }
  }

  /**
   * Lazy loads "FixedNavbar" if needed on the page
   */
  public static async loadFixedNavbar(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.navbar.is-fixed-top')) {
      await import(/* webpackChunkName: "fixedheader" */ './fixed-navbar/index')
    }
  }

  /**
   * Lazy loads "BottomNavbar" if needed on the page
   */
  public static async loadBottomNavbar(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.navbar.is-bottom-mobile')) {
      await import(/* webpackChunkName: "bottomnavbar" */ './bottom-navbar/index')
    }
  }

  /**
   * Lazy loads "ResponsiveNavbar" if needed on the page
   */
  public static async loadResponsiveNavbar(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.navbar')) {
      await import(/* webpackChunkName: "responsivenavbar" */ './responsive-navbar/index')
    }
  }

  /**
   * Lazy loads "Slider" if needed on the page
   */
  public static async loadSlider(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.swiper-container')) {
      await import(/* webpackChunkName: "slider" */ './slider/index')
    }
  }

  /**
   * Lazy loads "Gallery" if needed on the page
   */
  public static async loadGallery(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('[data-fancybox]')) {
      await import(/* webpackChunkName: "gallery" */ './gallery/index')
    }
  }

  /**
   * Lazy loads "Parallax" if needed on the page
   */
  public static async loadParallax(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.fw-parallax')) {
      await import(/* webpackChunkName: "parallax" */ './parallax/index')
    }
  }

  /**
   * Lazy loads "Clickthrough" if needed on the page
   */
  public static async loadClickthrough(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-clickthrough')) {
      await import(/* webpackChunkName: "clickthrough" */ './clickthrough/index')
    }
  }

  /**
   * Lazy loads "LazyLoader" if needed on the page
   */
  public static async loadLazyLoader(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.fw-lazy-load')) {
      await import(/* webpackChunkName: "lazyloader" */ './lazyloader/index')
    }
  }

  /**
   * Lazy loads "ScrollIntoView" if needed on the page
   */
  public static async loadScrollIntoView(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-scroll-to')) {
      await import(/* webpackChunkName: "scrollintoview" */ './scroll-into-view/index')
    }
  }

  /**
   * Lazy loads "SocialShare" if needed on the page
   */
  public static async loadSocialShare(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-social-share')) {
      await import(/* webpackChunkName: "socialshare" */ './social-share/index')
    }
  }

  /**
   * Shortcut to load all components
   */
  public static loadAll(withMutationObserver = true): void {
    AsyncModuleLoader.loadInstantiableModules()
    AsyncModuleLoader.loadEventDelegatedModules()

    if (withMutationObserver === true) {
      AsyncModuleLoader.observer = new MutationObserver(() => {
        AsyncModuleLoader.loadInstantiableModules()
      })

      AsyncModuleLoader.observer.observe(document, {
        childList: true,
        subtree: true,
      })
    }
  }

  public static loadInstantiableModules(): void {
    AsyncModuleLoader.loadAccordion()
    AsyncModuleLoader.loadBottomNavbar()
    AsyncModuleLoader.loadExpandable()
    AsyncModuleLoader.loadFixedNavbar()
    AsyncModuleLoader.loadGallery()
    AsyncModuleLoader.loadInViewAnimation()
    AsyncModuleLoader.loadParallax()
    AsyncModuleLoader.loadResponsiveNavbar()
    AsyncModuleLoader.loadSameHeight()
    AsyncModuleLoader.loadSlider()
  }

  public static loadEventDelegatedModules(): void {
    AsyncModuleLoader.loadClickthrough()
    AsyncModuleLoader.loadLazyLoader()
    AsyncModuleLoader.loadScrollIntoView()
    AsyncModuleLoader.loadSocialShare()
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
