import {Accordion} from './Accordion'

if (typeof Drupal === 'undefined') {
  Accordion.attach('.fw-accordion')
} else {
  Accordion.initDrupalBehaviors('.fw-accordion')
}
