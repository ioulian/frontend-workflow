import ResponsiveNavbar from './../vendor/bulma/ResponsiveNavbar'
// import Settings from './Settings';

let instance: Site | null = null
export default class Site {
  constructor() {
    if (!instance) {
      instance = this
    }

    // Add your stuff here
    ResponsiveNavbar.init()
  }

  public static getInstance(): Site {
    if (instance === null) {
      instance = new Site()
    }

    return instance
  }
}
