import {Accordion} from './Accordion'

if (typeof (window as any).Drupal === 'undefined') {
  Accordion.attach('.fw-accordion')
} else {
  Accordion.initDrupalBehaviors('.fw-accordion')
}
