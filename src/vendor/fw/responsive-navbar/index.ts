import {ResponsiveNavbar} from './ResponsiveNavbar'

if (typeof Drupal === 'undefined') {
  ResponsiveNavbar.attach('.navbar')
} else {
  ResponsiveNavbar.initDrupalBehaviors('.navbar')
}
