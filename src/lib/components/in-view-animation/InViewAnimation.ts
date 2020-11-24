import {Factory} from '../../base/js/Factory'

import './InViewAnimation.scss'

/**
 * Basic animation trigger based on IntersectionObserver
 */
export class InViewAnimation extends Factory() {
  private observer: IntersectionObserver

  public static className: string = 'InViewAnimation'

  constructor(el: Element) {
    super(el)

    this.observer = new IntersectionObserver(InViewAnimation.update.bind(this), {
      threshold: this.threshold,
    })

    this.observer.observe(this.el)

    // Add init class, this will put the animation in it's initial position
    // This will help if user has JS disabled, the element will still be visible/correctly positioned
    this.el.classList.add('js-in-view-animation--init')
  }

  public static update(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.target.getAttribute('data-once') === 'true') {
        // Don't remove the class if it should only animate once
        if (entry.isIntersecting) {
          entry.target.classList.add('js-in-view-animation--animate')
        }
      } else {
        entry.target.classList.toggle('js-in-view-animation--animate', entry.isIntersecting)
      }
    })
  }

  public get threshold(): number[] {
    const threshold = this.el.getAttribute('data-animation-threshold')

    if (typeof threshold === 'string') {
      const thresholdArr = threshold.split(',').map((i) => parseFloat(i))

      if (!thresholdArr.includes(0)) {
        thresholdArr.push(0)
      }

      return thresholdArr
    }

    return [0]
  }
}
