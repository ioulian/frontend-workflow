import {Expandable} from './Expandable'

if (typeof Drupal !== 'undefined') {
  Expandable.initDrupalBehaviors('.fw-expandable')
}

Expandable.attach('.fw-expandable')

// Watch on HTML change and attach new items
new MutationObserver(() => {
  Expandable.attach('.fw-expandable')
}).observe(document.body, {
  childList: true,
  subtree: true,
})
