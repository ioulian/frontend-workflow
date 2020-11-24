import {SameHeight} from './SameHeight'

if (typeof Drupal !== 'undefined') {
  SameHeight.initDrupalBehaviors('.js-sameheight')
}

SameHeight.attach('.js-sameheight')
