import {Parallax} from './Parallax'

if (typeof Drupal !== 'undefined') {
  Parallax.initDrupalBehaviors('.fw-parallax')
}

Parallax.attach('.fw-parallax')

// Watch on HTML change and attach new items
new MutationObserver(() => {
  Parallax.attach('.fw-parallax')
}).observe(document, {
  childList: true,
  subtree: true,
})
