import {Parallax} from './Parallax'

declare const Drupal: {}

if (typeof Drupal !== 'undefined') {
  Parallax.initDrupalBehaviors('.fw-parallax')
}

Parallax.attach('.fw-parallax')
