import {Slider} from './Slider'

if (typeof Drupal === 'undefined') {
  Slider.attach('.swiper-container')

  // Css is loaded later when in dev mode, update the slider on load of css
  window.addEventListener('load', () => {
    Slider.updateAll()
  })
} else {
  Slider.initDrupalBehaviors('.swiper-container')
}
