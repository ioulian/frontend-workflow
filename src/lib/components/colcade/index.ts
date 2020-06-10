import {ColcadeLayout} from './Colcade'

declare const Drupal: unknown
if (typeof Drupal !== 'undefined') {
  ColcadeLayout.initDrupalBehaviors('.fw-colcade')
}

ColcadeLayout.attach('.fw-colcade')
