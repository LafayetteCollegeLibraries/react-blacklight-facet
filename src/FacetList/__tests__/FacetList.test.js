import React from 'react'
import { mount } from 'enzyme'
import FacetList from '../'

const defaultProps = {
  items: [
    {value: 'cool label', label: 'cool label', hits: 20},
    {value: 'another', label: 'another', hits: 10},
    {value: 'a third', label: 'a third', hits: 4},
  ],
  label: 'Cool Facet',
  name: 'cool-facet',
  onRemoveSelectedItem: () => {},
  onSelectItem: () => {},
}

const wrapEl = renderer => xtend => (
  renderer(<FacetList {...defaultProps} {...xtend} />)
)

const mountEl = wrapEl(mount)

const testHandlerArgs = (props, index, cb) => (facet, item) => {
  expect(typeof facet).toBe('object')
  expect(facet).toHaveProperty('name')
  expect(facet.name).toEqual(props.name)
  expect(facet).toHaveProperty('label')
  expect(facet.label).toEqual(props.label)

  expect(typeof item).toBe('object')
  expect(item).toEqual(props.items[index])

  cb()
}

describe('FacetList', function () {
  test('passes facet/item objects to onSelectItem', done => {
    const index = 1

    const onSelectItem = testHandlerArgs(defaultProps, index, done)

    const $el = mountEl({onSelectItem, open: true})

    $el.find('UnsortedFacetList')
      .findWhere($e => ($e.key() === 'unselected-facets'))
      .find('.FacetList-item')
      .at(index)
      .simulate('click')
  })

  test('passes facet/item objects to onRemoveSelectedItem', done => {
    const index = 2

    const onRemoveSelectedItem = testHandlerArgs(defaultProps, index, done)

    const $el = mountEl({
      items: [],
      onRemoveSelectedItem,
      open: true,
      selectedItems: defaultProps.items,
    })

    $el.find('UnsortedFacetList')
      .findWhere($e => ($e.key() === 'selected-facets'))
      .find('.FacetList-item')
      .at(index)
      .simulate('click')
  })
})
