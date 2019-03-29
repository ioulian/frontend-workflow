import {ResponsiveNavbar} from '../vendor/bulma/responsive-navbar/ResponsiveNavbar'
// import Settings from './Settings';

let instance: Site | null = null
export default class Site {
  constructor() {
    if (!instance) {
      instance = this
    }

    // Add your stuff here
    ResponsiveNavbar.attach('.navbar-burger')
  }

  public static getInstance(): Site {
    if (instance === null) {
      instance = new Site()
    }

    return instance
  }
}
