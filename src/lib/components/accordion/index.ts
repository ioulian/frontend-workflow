import {Accordion} from './Accordion'

if (typeof Drupal !== 'undefined') {
  Accordion.initDrupalBehaviors('.fw-accordion')
}

Accordion.attach('.fw-accordion')
