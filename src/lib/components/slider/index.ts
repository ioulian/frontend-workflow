import {Slider} from './Slider'

declare const Drupal: {}
if (typeof Drupal !== 'undefined') {
  Slider.initDrupalBehaviors('.swiper-container')
}

Slider.attach('.swiper-container')

// Css is loaded later when in dev mode, update the slider on load of css
window.addEventListener('load', () => {
  Slider.instances.forEach((slider: Slider) => {
    slider.getInstance().update()
  })
})
