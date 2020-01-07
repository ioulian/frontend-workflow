import {FixedNavbar} from './FixedNavbar'

declare const Drupal: {}
if (typeof Drupal !== 'undefined') {
  FixedNavbar.initDrupalBehaviors('.navbar.is-fixed-top')
}

FixedNavbar.attach('.navbar.is-fixed-top')
