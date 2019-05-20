// import Settings from './Settings';
import {AsyncModuleLoader} from './../vendor/fw/AsyncModuleLoader'

let instance: Site | null = null

/**
 * Singleton class for your project. The idea is that you initialize your components here
 * You can also create stand-alone components and load them differently
 */
export class Site {
  constructor() {
    if (!instance) {
      instance = this
    }

    // Add your stuff here

    // Un-comment if you want to use the modules here. Don't forget to remove them from entry points.
    AsyncModuleLoader.loadAll()
  }

  /**
   * @returns {Site} Site instance
   */
  public static getInstance(): Site {
    if (instance === null) {
      instance = new Site()
    }

    return instance
  }
}
