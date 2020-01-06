import {Expandable} from './Expandable'

declare const Drupal: {}
if (typeof Drupal !== 'undefined') {
  Expandable.initDrupalBehaviors('.fw-expandable')
}

Expandable.attach('.fw-expandable')
