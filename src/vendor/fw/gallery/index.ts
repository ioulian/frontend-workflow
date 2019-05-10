declare var Drupal: any

import {Gallery} from './Gallery'

if (typeof Drupal !== 'undefined') {
  Gallery.initDrupalBehaviors('.js-gallery')
}

Gallery.attach('.js-gallery')
