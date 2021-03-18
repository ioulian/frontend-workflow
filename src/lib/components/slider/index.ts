import {Slider} from './Slider'

if (typeof Drupal !== 'undefined') {
  Slider.initDrupalBehaviors('.fw-slider')
}

Slider.attach('.fw-slider')

// Css is loaded later when in dev mode, update the slider on load of css
window.addEventListener('load', () => {
  Slider.instances.forEach((slider: Slider) => {
    slider.getInstance().update()
  })
})

// Watch on HTML change and attach new items
new MutationObserver(() => {
  Slider.attach('.fw-slider')
}).observe(document.body, {
  childList: true,
  subtree: true,
})
