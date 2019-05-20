declare var Drupal: any

import {FixedNavbar} from './FixedNavbar'

if (typeof Drupal !== 'undefined') {
  FixedNavbar.initDrupalBehaviors('.navbar.is-fixed-top')
}

FixedNavbar.attach('.navbar.is-fixed-top')
