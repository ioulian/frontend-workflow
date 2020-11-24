import {Expandable} from './Expandable'

if (typeof Drupal !== 'undefined') {
  Expandable.initDrupalBehaviors('.fw-expandable')
}

Expandable.attach('.fw-expandable')
