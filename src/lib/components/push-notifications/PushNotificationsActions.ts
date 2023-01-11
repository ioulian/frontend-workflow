import {classes} from 'polytype'

import {PushNotificationsManager} from './PushNotificationsManager'
import {Factory} from '../../base/js/Factory'

import './PushNotificationsActions.scss'

/**
 * HTML actions to handle Push Notifications
 */
export class PushNotificationsActions extends classes(Factory) {
  public static notSupportedClass: string = 'fw-push-notifications-actions--not-supported'

  public static grantedClass: string = 'fw-push-notifications-actions--granted'

  public static deniedClass: string = 'fw-push-notifications-actions--denied'

  public static defaultClass: string = 'fw-push-notifications-actions--default'

  public static requestingClass: string = 'fw-push-notifications-actions--requesting'

  private elRequest?: HTMLElement

  public static className: string = 'PushNotificationsActions'

  constructor(el: Element) {
    super([el])
    PushNotificationsActions.makeGlobal(PushNotificationsActions.className)

    if (!PushNotificationsManager.supportsNotifications()) {
      return
    }

    this.elRequest = this.el.querySelector('.fw-push-notifications-actions__request')
    this.elRequest.addEventListener('click', (e) => {
      e.preventDefault()

      this.requestPermission()
    })

    this.handlePermission(false)
  }

  /**
   * Requests user permission to send notifications, use this only after a user clicks a button.
   */
  private requestPermission(): void {
    this.el.classList.add(PushNotificationsActions.requestingClass)
    if (PushNotificationsManager.checkNotificationPromise()) {
      Notification.requestPermission()
        .then(() => {
          this.handlePermission()
        })
        .catch((error) => {
          console.log(error) // eslint-disable-line no-console
        })
        .finally(() => {
          this.el.classList.remove(PushNotificationsActions.requestingClass)
        })
    } else {
      // eslint-disable-next-line
      Notification.requestPermission(() => {
        this.handlePermission()
        this.el.classList.remove(PushNotificationsActions.requestingClass)
      })
    }
  }

  private handlePermission(subscribe: boolean = true): void {
    this.el.classList.toggle(PushNotificationsActions.defaultClass, Notification.permission === 'default')
    this.el.classList.toggle(PushNotificationsActions.deniedClass, Notification.permission === 'denied')
    this.el.classList.toggle(PushNotificationsActions.grantedClass, Notification.permission === 'granted')

    if (subscribe) {
      PushNotificationsManager.subscribe()
    }
  }
}
