/**
 * V: 0.1.0
 */

import 'promise-polyfill/src/polyfill'
import $ from 'jquery/dist/jquery.slim'

import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'

declare const window: any

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
