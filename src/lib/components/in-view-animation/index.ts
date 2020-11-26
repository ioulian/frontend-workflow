import {InViewAnimation} from './InViewAnimation'

import './InViewAnimationPresets.scss'

if (typeof Drupal !== 'undefined') {
  InViewAnimation.initDrupalBehaviors('.js-in-view-animation')
}

InViewAnimation.attach('.js-in-view-animation')

// Watch on HTML change and attach new items
new MutationObserver(() => {
  InViewAnimation.attach('.fw-in-view-animation')
}).observe(document.body, {
  childList: true,
  subtree: true,
})
