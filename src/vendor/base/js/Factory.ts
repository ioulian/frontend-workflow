/**
 * v: 0.0.1
 */

type Class = new (...args: any[]) => any

/**
 * DOM attachment helper
 * This will inject some functions to help attach a component to DOM elements
 *
 * Examples:
 * ```ts
 * // Basic inject
 * class MyClass extends Factory() {
 *   constructor(el: Element) {
 *     super(el)
 *     console.log(this.el);
 *   }
 * }
 *
 * MyClass.attach('.my-selector')
 * ```
 *
 * ```ts
 * // Inject functions and extend another class
 * class AnotherClass {
 * }
 *
 * class MyClass extends Factory(AnotherClass) {
 *   constructor(el: Element) {
 *     super(el)
 *     console.log(this.el);
 *   }
 * }
 *
 * MyClass.attach('.my-selector')
 * ```
 *
 * @param {Class} Type Class to extend
 */
export const Factory = (Type: Class = class {}) =>
  class extends Type {
    public static instances: any[] = []

    public el: Element

    /**
     *
     * @param {Element} el DOM Element you want to bind this class to
     * @param {any} restArgs Whatever extra arguments you want to have
     */
    constructor(el: Element, ...restArgs: any[]) {
      super()

      this.el = el
    }

    /**
     * Helper method to automatically attach and detach instances in DrupalBehaviors
     * (Drupal 8.0+ only)
     *
     * @param {string} selector Selector of the DOM elements to attach a class to
     * @param {any} restArgs (Optional) Any other parameters to pass to class
     */
    public static initDrupalBehaviors(selector: string, ...restArgs: any[]) {
      ;(window as any).Drupal.behaviors[`attach${this.name}`] = {
        attach: (context: Element | Document): void => {
          // 1: Context is document when run the first time
          // 2: Sometimes, the context is not part of the DOM, ignore it then
          if (context !== document && document.body.contains(context) === false) {
            return
          }

          // Update instances with new ones if there are any
          this.attach(selector, ...restArgs)
        },
        detach: (context: Element | Document): void => {
          // Remove unneeded instances, that have been deleted from the DOM
          this.detach(context)
        },
      }
    }

    /**
     * Will attach this class to DOM elements (found by 'selector')
     * On all subsequent attachments, attached classes will not be overridden or added.
     * So each DOM element can have only 1 instance attached to it!
     *
     * @param {string} selector Selector of the DOM elements to attach a class to
     * @param {any} restArgs (Optional) Any other parameters to pass to class
     */
    public static attach(selector: string, ...restArgs: any[]): void {
      this.instances = [
        // Merge new instances with the other ones
        ...this.instances,
        ...Array.from(document.querySelectorAll(selector)) // Cast to array for browser compatibility
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

    /**
     * Detaches an instance of the class from DOM element
     *
     * @param {Element | Document} context (Optional) You can pass context (= parent) from which to detach the instances
     */
    public static detach(context: Element | Document = document): void {
      this.instances = this.instances.filter((instance: any) => {
        // Keep the instance if it's not in the context
        if (context.contains(instance.el) === false) {
          return true
        }

        // Garbage collection will handle the rest
        instance.el.classList.remove('fw-factory-loaded')
        return false
      })
    }
  }
