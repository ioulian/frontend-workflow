declare var Drupal: any

import {FixedHeader} from './FixedHeader'

if (typeof Drupal !== 'undefined') {
  FixedHeader.initDrupalBehaviors('.navbar.is-fixed-top')
}

FixedHeader.attach('.navbar.is-fixed-top')
