import {SameHeight} from './SameHeight'

if (typeof (window as any).Drupal === 'undefined') {
  SameHeight.attach('.js-sameheight')
} else {
  SameHeight.initDrupalBehaviors('.js-sameheight')
}
