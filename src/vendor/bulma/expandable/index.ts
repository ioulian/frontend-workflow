import {Expandable} from './Expandable'

if (typeof (window as any).Drupal === 'undefined') {
  Expandable.attach('.fw-expandable')
} else {
  Expandable.initDrupalBehaviors('.fw-expandable')
}
