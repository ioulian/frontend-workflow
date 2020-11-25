import {SameHeight} from './SameHeight'

if (typeof Drupal !== 'undefined') {
  SameHeight.initDrupalBehaviors('.js-sameheight')
}

SameHeight.attach('.js-sameheight')

// Watch on HTML change and attach new items
new MutationObserver(() => {
  SameHeight.attach('.fw-sameheight')
}).observe(document, {
  childList: true,
  subtree: true,
})
