import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Base from '../src/Base'

class BaseFacet extends Base {
  renderBody () { return null }
}

storiesOf('BaseFacet', module)
  .add('BaseFacet with no body', () => (
    <BaseFacet label="Base Facet" />
  ))
