import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import FacetRangeLimitDate from '../src/FacetRangeLimitDate'

const items = [
  Date.UTC(2017,1,11),
  Date.UTC(2007,1,11),
  Date.UTC(1997,1,11),
  Date.UTC(1987,1,11),
].map((timestamp, index) => {
  const d = new Date(timestamp)
  const iso = d.toISOString()

  return {
    label: iso,
    value: iso,
    hits: Math.abs(100 - ((index + 1) * 8)),
  }
})

const defaultProps = {
  items,
  label: 'Cool Range Facet',
  name: 'cool-range-facet',
  onApplyRange: action('apply-range'),
  onSelectItem: action('select-item'),
  onRemoveSelectedItem: action('remove-selected-item')
}

storiesOf('FacetRangeLimitDate', module)
  .add('initial', () => (
    <FacetRangeLimitDate {...defaultProps} />
  ))
