/* eslint-disable no-underscore-dangle */

import {JSBreakpoint} from '../vendor/fw/js-breakpoint/JSBreakpoint'

import './demo.scss'

declare const __IS_DEV__: boolean

// JSBreakpoint example
const elJSBreakpointOutput = document.getElementById('js-breakpoint-example')

if (elJSBreakpointOutput instanceof HTMLElement) {
  // When running the code in DEV mode, this will output "null" as css is not loaded when JS is ready
  if (__IS_DEV__) {
    console.log(JSBreakpoint.getBreakpoint())
  }

  // That's why we need to wait for css to load
  window.addEventListener('load', () => {
    // And try and get the breakpoint again
    // You won't get this problem when you'll create a production build
    if (__IS_DEV__) {
      console.log(JSBreakpoint.getBreakpoint())
    }

    elJSBreakpointOutput.innerHTML = `Current breakpoint: ${JSBreakpoint.getBreakpoint()}`
    JSBreakpoint.getInstance().on('changed', ({prevBreakpoint, breakpoint, sizeChange}) => {
      if (__IS_DEV__) {
        console.log(
          `Changed to: ${breakpoint} from: ${prevBreakpoint}. Window is getting ${
            sizeChange > 0 ? 'bigger' : 'smaller'
          }`
        )
      }

      elJSBreakpointOutput.innerHTML = `Breakpoint changed from "${prevBreakpoint}" to "${breakpoint}". Window is getting ${
        sizeChange > 0 ? 'bigger' : 'smaller'
      }`
    })
  })
}

// Async module loader functionality test
const elDemoSlider: HTMLElement = document.querySelector('.demo-load-slider')

if (elDemoSlider instanceof HTMLElement) {
  const elDemoSliderButton: HTMLElement = elDemoSlider.querySelector('button')

  elDemoSliderButton.addEventListener(
    'click',
    () => {
      elDemoSlider.innerHTML = `
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
        </div>
      </div>
    `
    },
    false
  )
}
