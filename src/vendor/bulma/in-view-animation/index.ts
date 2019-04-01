import {InViewAnimation} from './InViewAnimation'

import './InViewAnimationPresets.scss'

if (typeof (window as any).Drupal === 'undefined') {
  InViewAnimation.attach('.js-in-view-animation')
} else {
  InViewAnimation.initDrupalBehaviors('.js-in-view-animation')
}
