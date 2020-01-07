import {Accordion} from './Accordion'

declare const Drupal: {}
if (typeof Drupal !== 'undefined') {
  Accordion.initDrupalBehaviors('.fw-accordion')
}

Accordion.attach('.fw-accordion')
