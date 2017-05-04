import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { FacetBase } from '../src'

class Base extends FacetBase {
  renderBody () { return null }
}

storiesOf('Base', module)
  .add('Base with no body', () => (
    <Base label="Base Facet" />
  ))
