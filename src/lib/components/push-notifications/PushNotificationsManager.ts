import toUint8Array from 'urlb64touint8array'

import {ServiceWorkerClientHelpers} from '../ServiceWorkerClientHelpers'

/**
 * Notification manager
 */
export class PushNotificationsManager {
  /**
   * Will check is notifications are supported on this browser
   */
  public static supportsNotifications(): boolean {
    return 'Notification' in window
  }

  /**
   * Check if requestPermission is a promise or not
   */
  public static checkNotificationPromise(): boolean {
    try {
      // eslint-disable-next-line
      Notification.requestPermission().then()
    } catch (e) {
      return false
    }

    return true
  }

  /**
   * Will show a simple Notification in the browser (this will not use Push Notifications)
   */
  public static pushNotification(title: string, options?: NotificationOptions): Notification | undefined {
    if (!PushNotificationsManager.supportsNotifications() || Notification.permission !== 'granted') {
      return undefined
    }

    return new Notification(title, options)
  }

  /**
   * This will close a provided Notification
   */
  public static closeNotification(notification: Notification): void {
    if (notification instanceof Notification) {
      notification.close()
    }
  }

  /**
   * Subscribes to push notifications
   */
  public static subscribe(): void {
    if (Notification.permission !== 'granted') {
      return
    }

    // eslint-disable-next-line
    ServiceWorkerClientHelpers.getRegistration()
      .pushManager.getSubscription()
      .then(async (subscription: PushSubscription): Promise<PushSubscription> => {
        if (subscription) {
          return subscription
        }

        const response = await fetch(__PUSH_VAPID_KEY_ENDPOINT__)
        const vapidPublicKey = await response.text()

        const convertedVapidKey = toUint8Array(vapidPublicKey)

        // eslint-disable-next-line
        return ServiceWorkerClientHelpers.getRegistration().pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        })
      })
      .then((subscription) => {
        ServiceWorkerClientHelpers.setPushSubscription(subscription)

        fetch(__PUSH_REGISTER_ENDPOINT__, {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            subscription,
          }),
        })
          .then(null)
          .catch(null)

        return subscription
      })
  }

  /**
   * Unsubscribes from push notifications
   */
  public static unsubscribe(): void {
    const registration = ServiceWorkerClientHelpers.getRegistration()

    registration.pushManager
      .getSubscription()
      .then((subscription) => {
        // Let server know that user does not want to receive push messages anymore
        fetch(__PUSH_UNREGISTER_ENDPOINT__, {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            subscription,
          }),
        })
          .then(null)
          .catch(null)

        subscription.unsubscribe().then(null).catch(null)
      })
      .catch(null)
  }
}
