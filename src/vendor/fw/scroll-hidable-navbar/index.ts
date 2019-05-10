import {ScrollHidableNavbar} from './ScrollHidableNavbar'

if (typeof Drupal === 'undefined') {
  ScrollHidableNavbar.attach('.navbar.is-fixed-top.is-hidable')
} else {
  ScrollHidableNavbar.initDrupalBehaviors('.navbar.is-fixed-top.is-hidable')
}
