import {Slider} from './Slider'

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

// Watch on HTML change and attach new items
new MutationObserver(() => {
  Slider.attach('.swiper-container')
}).observe(document, {
  childList: true,
  subtree: true,
})
