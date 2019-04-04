/*!
v: 0.0.1
 */

type Class = new (...args: any[]) => any

export const Factory = (Type: Class = class {}) =>
  class extends Type {
    public static instances: any[] = []

    public el: Element

    constructor(el: Element, ...restArgs: any[]) {
      super()

      this.el = el
    }

    public static initDrupalBehaviors(selector: string, ...restArgs: any[]) {
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

    public static attach(selector: string, ...restArgs: any[]): void {
      this.instances = [
        ...this.instances,
        ...[...document.querySelectorAll(selector)]
          // Filter out the processed instances
          .filter((el: Element) => el.classList.contains('fw-factory-loaded') === false)
          .map((el: Element) => {
            // Create new instance and set it to processed
            const newInstance = new this(el, ...restArgs)
            newInstance.el.classList.add('fw-factory-loaded')
            return newInstance
          }),
      ]
    }

    public static detach(context: Element | Document): void {
      this.instances = this.instances.filter((instance: any) => {
        // Keep the instance if it was not added or removed
        if (context.contains(instance.el) === false) {
          return true
        }

        instance.el.classList.remove('fw-factory-loaded')
        return false
      })
    }
  }
