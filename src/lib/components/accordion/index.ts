import {Accordion} from './Accordion'

if (typeof Drupal !== 'undefined') {
  Accordion.initDrupalBehaviors('.fw-accordion')
}

Accordion.attach('.fw-accordion')

// Watch on HTML change and attach new items
new MutationObserver(() => {
  Accordion.attach('.fw-accordion')
}).observe(document, {
  childList: true,
  subtree: true,
})
