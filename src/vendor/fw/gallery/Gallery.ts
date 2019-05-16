/**
 * V: 0.1.0
 */

declare var window: any

import 'promise-polyfill/src/polyfill'
import $ from 'jquery'

import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'

/**
 * Lightbox
 */
export class Gallery {
  public static async attach(selector: string): Promise<void> {
    window.jQuery = $
    window.$ = $

    await import(/* webpackChunkName: "fancybox" */ '@fancyapps/fancybox/dist/jquery.fancybox.min')
    window.jQuery().fancybox({
      selector,
      loop: true,
    })
  }
}
