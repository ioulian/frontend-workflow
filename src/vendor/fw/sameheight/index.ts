import {SameHeight} from './SameHeight'

declare const Drupal: {}
if (typeof Drupal !== 'undefined') {
  SameHeight.initDrupalBehaviors('.js-sameheight')
}

SameHeight.attach('.js-sameheight')
