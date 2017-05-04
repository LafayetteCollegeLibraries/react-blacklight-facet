import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import FacetList from '../src/List'


const items = '@'.repeat(10).split('@').map((_, index) => {
  const num = index + 1
  const label = `Cool Facet Item ${num}`
  const value = label
  const hits = 100 - (num * 5)
  return { label, value, hits }
})


const defaultProps = {
  items,
  label: 'Cool Facet',
  name: 'cool-facet',
  onSelectItem: action('select-item'),
  onRemoveSelectedItem: action('remove-selected-item'),
  open: true,
}

storiesOf('FacetList', module)
  .add('list with no selectedItems', () => (
    <FacetList {...defaultProps} />
  ))
  .add('list with selectedItems', () => (
    <FacetList
      {...defaultProps}
      selectedItems={items.slice(0,3)}
      items={items.slice(4)}
    />
  ))
