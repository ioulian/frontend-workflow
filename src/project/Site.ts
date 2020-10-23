// import Settings from './Settings';
import {AsyncModuleLoader} from '../lib/components/AsyncModuleLoader'

// eslint-disable-next-line
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

    // Remove this line if the AsyncModuleLoader doesn't work correctly.
    AsyncModuleLoader.loadAll()

    // Add your stuff here
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
