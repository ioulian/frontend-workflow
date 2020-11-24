import {FixedNavbar} from './FixedNavbar'

if (typeof Drupal !== 'undefined') {
  FixedNavbar.initDrupalBehaviors('.navbar.fixed-top, .navbar.fixed-bottom')
}

FixedNavbar.attach('.navbar.fixed-top, .navbar.fixed-bottom')
