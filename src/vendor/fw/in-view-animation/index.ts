import {InViewAnimation} from './InViewAnimation'

import './InViewAnimationPresets.scss'

if (typeof Drupal === 'undefined') {
  InViewAnimation.attach('.js-in-view-animation')
} else {
  InViewAnimation.initDrupalBehaviors('.js-in-view-animation')
}
