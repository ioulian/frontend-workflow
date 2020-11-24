import Alert from 'bootstrap/js/dist/alert'
import {ChangeEvent, JSBreakpoint} from '../lib/components/js-breakpoint/JSBreakpoint'
/* eslint-disable no-underscore-dangle */

import './demo.scss'

// JSBreakpoint example
const elJSBreakpointOutput = document.getElementById('js-breakpoint-example')

if (elJSBreakpointOutput instanceof HTMLElement) {
  // When running the code in DEV mode, this will output "null" as css is not loaded when JS is ready
  if (__IS_DEV__) {
    console.log(JSBreakpoint.getInstance().getBreakpoint())
  }

  // That's why we need to wait for css to load
  window.addEventListener('load', () => {
    // And try and get the breakpoint again
    // You won't get this problem when you'll create a production build
    if (__IS_DEV__) {
      console.log(JSBreakpoint.getInstance().getBreakpoint())
    }

    elJSBreakpointOutput.innerHTML = `Current breakpoint: ${JSBreakpoint.getInstance().getBreakpoint()}`
    JSBreakpoint.getInstance().on('changed', ({prevBreakpoint, breakpoint, sizeChange}: ChangeEvent) => {
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

// Enable alerts from bootstrap
// This is an example on how to use Bootstrap JS components
if (!__BOOTSTRAP_IMPORT_BUNDLE__) {
  // eslint-disable-next-line
  Array.from(document.querySelectorAll('.alert')).map((alert) => new Alert(alert))
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
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    `
    },
    false
  )
}
