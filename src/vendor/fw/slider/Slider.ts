/**
 * V: 0.1.0
 */

import Swiper from 'swiper'
import {Factory} from './../../base/js/Factory'

import 'swiper/dist/css/swiper.min.css'

/**
 * Slider
 */
export class Slider extends Factory() {
  private swiperInstance: Swiper | null = null

  constructor(el: Element, settings: any = {}) {
    super(el)

    this.swiperInstance = new Swiper(this.el, settings)
  }

  public getInstance(): Swiper {
    return this.swiperInstance
  }
}
