/**
 * V: 0.1.0
 */

import {Factory} from './../../base/js/Factory'

import './InViewAnimation.scss'

export class InViewAnimation extends Factory() {
  private observer: IntersectionObserver

  constructor(el: Element) {
    super(el)

    this.observer = new IntersectionObserver(this.update.bind(this), {
      threshold: this.threshold,
    })

    this.observer.observe(this.el)
    this.el.classList.add('js-in-view-animation--init')
  }

  public update(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.target.getAttribute('data-once') === 'true') {
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
      const thresholdArr = threshold.split(',').map(i => parseFloat(i))

      if (!thresholdArr.includes(0)) {
        thresholdArr.push(0)
      }

      return thresholdArr
    }

    return [0]
  }
}
