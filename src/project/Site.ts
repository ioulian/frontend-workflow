// import Settings from './Settings';
//import {AsyncModuleLoader} from './../vendor/bulma/AsyncModuleLoader'

let instance: Site | null = null
export class Site {
  constructor() {
    if (!instance) {
      instance = this
    }

    // Add your stuff here
    //AsyncModuleLoader.loadAccordion()
  }

  public static getInstance(): Site {
    if (instance === null) {
      instance = new Site()
    }

    return instance
  }
}
