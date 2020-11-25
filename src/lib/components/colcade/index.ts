import {ColcadeLayout} from './Colcade'

if (typeof Drupal !== 'undefined') {
  ColcadeLayout.initDrupalBehaviors('.fw-colcade')
}

ColcadeLayout.attach('.fw-colcade')

// Watch on HTML change and attach new items
new MutationObserver(() => {
  ColcadeLayout.attach('.fw-colcade')
}).observe(document, {
  childList: true,
  subtree: true,
})
