import {TabList} from './TabList'

if (typeof Drupal !== 'undefined') {
  TabList.initDrupalBehaviors('.fw-tablist')
}

TabList.attach('.fw-tablist')

// Watch on HTML change and attach new items
new MutationObserver(() => {
  TabList.attach('.fw-tablist')
}).observe(document, {
  childList: true,
  subtree: true,
})
