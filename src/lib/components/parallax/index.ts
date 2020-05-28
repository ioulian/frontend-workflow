import {Parallax} from './Parallax'

declare const Drupal: unknown
if (typeof Drupal !== 'undefined') {
  Parallax.initDrupalBehaviors('.fw-parallax')
}

Parallax.attach('.fw-parallax')
