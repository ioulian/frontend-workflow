declare const Drupal: any

import {Parallax} from './Parallax'

if (typeof Drupal !== 'undefined') {
  Parallax.initDrupalBehaviors('.fw-parallax')
}

Parallax.attach('.fw-parallax')
