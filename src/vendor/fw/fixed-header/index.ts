import {FixedHeader} from './FixedHeader'

if (typeof Drupal === 'undefined') {
  FixedHeader.attach('.navbar.is-fixed-top')
} else {
  FixedHeader.initDrupalBehaviors('.navbar.is-fixed-top')
}
