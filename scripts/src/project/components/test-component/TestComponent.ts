import {classes} from 'polytype'
import {Factory} from '../../../lib/base/js/Factory'
// import Settings from '../../Settings'

import './index.scss'

/**
 * Auto generated "TestComponent" component
 * TODO: Describe this component
 */
export class TestComponent extends classes(Factory) {
  public static className: string = 'TestComponent'

  constructor(el: Element) {
    super([el])

    TestComponent.makeGlobal(TestComponent.className)
  }
}
