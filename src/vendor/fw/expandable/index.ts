import {Expandable} from './Expandable'

if (typeof Drupal === 'undefined') {
  Expandable.attach('.fw-expandable')
} else {
  Expandable.initDrupalBehaviors('.fw-expandable')
}
