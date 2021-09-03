export class ServiceWorkerClientHelpers {
  public static registration: ServiceWorkerRegistration

  public static pushSubscription: PushSubscription

  public static setRegistration(registration: ServiceWorkerRegistration): void {
    ServiceWorkerClientHelpers.registration = registration
  }

  public static getRegistration(): ServiceWorkerRegistration {
    return ServiceWorkerClientHelpers.registration
  }

  public static setPushSubscription(pushSubscription: PushSubscription): void {
    ServiceWorkerClientHelpers.pushSubscription = pushSubscription
  }

  public static getPushSubscription(): PushSubscription {
    return ServiceWorkerClientHelpers.pushSubscription
  }
}
