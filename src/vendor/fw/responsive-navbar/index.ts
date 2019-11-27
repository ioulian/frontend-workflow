declare const Drupal: any

import {ResponsiveNavbar} from './ResponsiveNavbar'

if (typeof Drupal !== 'undefined') {
  ResponsiveNavbar.initDrupalBehaviors('.navbar')
}

ResponsiveNavbar.attach('.navbar')
