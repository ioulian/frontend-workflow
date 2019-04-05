export class AsyncModuleLoader {
  public static async loadAccordion(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.fw-accordion')) {
      await import(/* webpackChunkName: "accordion" */ './accordion/index')
    }
  }

  public static async loadExpandable(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.fw-expandable')) {
      await import(/* webpackChunkName: "expandable" */ './expandable/index')
    }
  }

  public static async loadInViewAnimation(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-in-view-animation')) {
      await import(/* webpackChunkName: "inviewanimation" */ './in-view-animation/index')
    }
  }

  public static async loadSameHeight(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-sameheight')) {
      await import(/* webpackChunkName: "sameheight" */ './sameheight/index')
    }
  }

  public static async loadFixedHeader(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.navbar.is-fixed-top')) {
      await import(/* webpackChunkName: "sameheight" */ './fixed-header/index')
    }
  }

  public static loadAll() {
    AsyncModuleLoader.loadAccordion()
    AsyncModuleLoader.loadExpandable()
    AsyncModuleLoader.loadInViewAnimation()
    AsyncModuleLoader.loadSameHeight()
    AsyncModuleLoader.loadFixedHeader()
  }

  public static checkIfElementsExist(selector: string): boolean {
    return [...document.querySelectorAll(selector)].length !== 0
  }
}
