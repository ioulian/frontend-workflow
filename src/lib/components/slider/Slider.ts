// eslint-disable-next-line import/no-unresolved
import {SwiperOptions} from 'swiper/index'
import Swiper from 'swiper/js/swiper.min'
import {Factory} from '../../base/js/Factory'

import 'swiper/css/swiper.min.css'

const defaults: SwiperOptions = {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}

/**
 * Slider
 */
export class Slider extends Factory() {
  private swiperInstance: Swiper | null = null

  private settings: SwiperOptions

  public static className: string = 'Slider'

  constructor(el: Element, settings: SwiperOptions) {
    super(el)

    this.settings = {
      ...defaults,
      ...settings,
    }

    this.swiperInstance = new Swiper(this.el, this.settings)
  }

  public getInstance(): Swiper {
    return this.swiperInstance
  }
}
