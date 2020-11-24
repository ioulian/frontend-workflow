import {InViewAnimation} from './InViewAnimation'

import './InViewAnimationPresets.scss'

if (typeof Drupal !== 'undefined') {
  InViewAnimation.initDrupalBehaviors('.js-in-view-animation')
}

InViewAnimation.attach('.js-in-view-animation')
