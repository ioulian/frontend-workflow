import {BottomNavbar} from './BottomNavbar'

declare const Drupal: {}
if (typeof Drupal !== 'undefined') {
  BottomNavbar.initDrupalBehaviors('.navbar.is-bottom-mobile')
}

BottomNavbar.attach('.navbar.is-bottom-mobile')

window.addEventListener('load', () => {
  BottomNavbar.instances.forEach((instance: BottomNavbar) => {
    instance.update()
  })
})
