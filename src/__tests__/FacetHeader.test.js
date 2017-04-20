import React from 'react'
import FacetHeader from '../FacetHeader'
import { shallow } from 'enzyme'

const shallowEl = xtend => (
  shallow(<FacetHeader onClick={() => {}} {...xtend} />)
)

test('calls `onClick` when clicked', done => {
  const onClick = () => { done() }
  const $el = shallowEl({onClick})

  $el.simulate('click')
})

test('rotates svg 90 degrees when `props.open` is true', () => {
  const $el = shallowEl({open: true})
  expect($el.find('svg').prop('transform')).toBe('rotate(90)')
})
