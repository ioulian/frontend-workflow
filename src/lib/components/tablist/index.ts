import {TabList} from './TabList'

declare const Drupal: unknown
if (typeof Drupal !== 'undefined') {
  TabList.initDrupalBehaviors('.fw-tablist')
}

TabList.attach('.fw-tablist')
