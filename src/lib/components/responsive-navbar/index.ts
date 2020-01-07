import {ResponsiveNavbar} from './ResponsiveNavbar'

declare const Drupal: {}
if (typeof Drupal !== 'undefined') {
  ResponsiveNavbar.initDrupalBehaviors('.navbar')
}

ResponsiveNavbar.attach('.navbar')
