// eslint-disable-next-line import/no-unresolved
import {classes} from 'polytype'
import Swiper, {Navigation, SwiperOptions} from 'swiper'

import {Factory} from '../../base/js/Factory'

import './index.scss'

const defaults: SwiperOptions = {
  modules: [Navigation],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}

/**
 * Slider
 */
export class Slider extends classes(Factory) {
  // @ts-ignore
  private swiperInstance: Swiper | null = null

  private settings: SwiperOptions

  public static className: string = 'Slider'

  constructor(el: Element, settings: SwiperOptions) {
    super([el])
    Slider.makeGlobal(Slider.className)

    this.settings = {
      ...defaults,
      ...settings,
    }

    const inlineSettings = this.el.hasAttribute('data-settings') ? this.el.getAttribute('data-settings') : null
    if (inlineSettings !== null) {
      this.settings = {
        ...this.settings,
        ...JSON.parse(inlineSettings),
      }
    }

    // @ts-ignore
    this.swiperInstance = new Swiper(this.el, this.settings)
  }

  // @ts-ignore
  public getInstance(): Swiper {
    // eslint-disable-next-line
    return this.swiperInstance
  }
}
