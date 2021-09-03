import {PushNotificationsActions} from './PushNotificationsActions'

if (typeof Drupal !== 'undefined') {
  PushNotificationsActions.initDrupalBehaviors('.fw-push-notifications-actions')
}

PushNotificationsActions.attach('.fw-push-notifications-actions')

// Watch on HTML change and attach new items
new MutationObserver(() => {
  PushNotificationsActions.attach('.fw-push-notifications-actions')
}).observe(document.body, {
  childList: true,
  subtree: true,
})
