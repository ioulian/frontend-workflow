/*!
v: 0.0.1
 */

export class Factory {
  static instances: any[] = []

  el: Element

  constructor(el: Element) {
    this.el = el
  }

  detachSelf(): void {}

  static initDrupalBehaviors(selector: string) {
    ;(window as any).Drupal.behaviors[`attach${this.constructor.name}`] = {
      attach: (context: Element | Document): void => {
        // 1: Context is document when run the first time
        // 2: Sometimes, the context is not part of the DOM, ignore it then
        if (context !== document && document.body.contains(context) === false) {
          return
        }

        // Update instances with new ones if there are any
        this.attach(selector)
      },
      detach: (context: Element | Document): void => {
        // Remove unneeded instances, that have been deleted from the DOM
        this.detach(context)
      },
    }
  }

  static attach(selector: string): void {
    this.instances = [
      ...this.instances,
      ...[...document.querySelectorAll(selector)]
        // Filter out the processed instances
        .filter((el: Element) => el.classList.contains('loaded') === false)
        .map((el: Element) => {
          // Create new instance and set it to processed
          const newInstance = new this(el)
          newInstance.el.classList.add('loaded')
          return newInstance
        }),
    ]
  }

  static detach(context: Element | Document): void {
    this.instances = this.instances.filter((instance: Factory) => {
      // Keep the instance if it was not added or removed
      if (context.contains(instance.el) === false) {
        return true
      }

      instance.el.classList.remove('loaded')
      instance.detachSelf()
      return false
    })
  }
}
