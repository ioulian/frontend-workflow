import {ColcadeLayout} from './Colcade'

if (typeof Drupal !== 'undefined') {
  ColcadeLayout.initDrupalBehaviors('.fw-colcade')
}

ColcadeLayout.attach('.fw-colcade')
