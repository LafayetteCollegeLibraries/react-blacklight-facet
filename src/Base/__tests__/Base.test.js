import React from 'react'
import { shallow, mount, render } from 'enzyme'
import FacetBase from '../'

const noop = () => {}

const defaultProps = {
  items: [],
  name: 'test-facet',
  label: 'Test Facet',
  onRemoveSelectedItem: noop,
  onSelectItem: noop,
}

class ShallowBase extends FacetBase {
  renderBody () { return null }
}

const shallowBase = xtend => (
  shallow(<ShallowBase {...defaultProps} {...xtend} />)
)

describe('FacetBase', function () {
  test('throws when no `renderBody` method provided', () => {
    expect(() => {
      render(<FacetBase {...defaultProps} open={true} />)
    }).toThrow()
  })

  test('sets the `open` state when header is clicked', () => {
    const $el = shallowBase()
    const $header = $el.find('FacetHeader')

    expect($header.length).toBe(1)
    expect($el.state('open')).toBeFalsey


    $header.simulate('click')

    setTimeout(() => {
      expect($el.state('open')).toBeTruthy
    }, 0)
  })

  test('falls back to `props.name` when `props.label` is missing', () => {
    const $el = mount(<ShallowBase {...defaultProps} label={null} />)
    const $header = $el.find('FacetHeader')

    expect($header.text()).not.toBe(defaultProps.label)
    expect($header.text()).toBe(defaultProps.name)
  })
})
