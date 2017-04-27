import React from 'react'
import { shallow } from 'enzyme'
import UnsortedFacetList from '../UnsortedFacetList'

const defaultProps = {
  items: [
    {label: 'cool label', hits: 20},
    {label: 'another', hits: 10},
    {label: 'a third', hits: 4},
  ],
}

const shallowEl = xtend => (
  shallow(<UnsortedFacetList {...defaultProps} {...xtend} />)
)

describe('UnsortedFacetList', function () {
  it('generates an <li> for each item in props.items', () => {
    const $el = shallowEl()
    expect($el.find('li').length).toBe(defaultProps.items.length)
  })

  it('passes an item handler', done => {
    const facet = 'facet-name'
    const index = 1

    const onItemClick = (name, item) => {
      expect(name).toBe(facet)
      expect(item).toEqual(defaultProps.items[index])

      done()
    }

    const $el = shallowEl({facet, onItemClick})
    $el.find('li').at(index).simulate('click')
  })

  it('uses the `item.value` if `item.label` is missing', () => {
    const items = [
      {value: 'cool val'},
      {value: 'rad val'},
      {value: 'whatever'},
    ]

    const index = 2

    const $el = shallowEl({items})
    expect($el.find('li').at(index).text()).toBe(items[index].value)
  })

  it('renders the `item.hits` property', () => {
    const $el = shallowEl()
    $el.find('li').forEach(($item, idx) => {
      expect($item.find('.FacetList-item-hits').first().text())
        .toBe(defaultProps.items[idx].hits.toString())
    })
  })
})
