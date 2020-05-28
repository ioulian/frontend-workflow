import {Accordion} from './Accordion'

declare const Drupal: unknown
if (typeof Drupal !== 'undefined') {
  Accordion.initDrupalBehaviors('.fw-accordion')
}

Accordion.attach('.fw-accordion')
