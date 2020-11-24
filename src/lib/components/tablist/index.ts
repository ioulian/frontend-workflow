import {TabList} from './TabList'

if (typeof Drupal !== 'undefined') {
  TabList.initDrupalBehaviors('.fw-tablist')
}

TabList.attach('.fw-tablist')
