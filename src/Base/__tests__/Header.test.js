import React from 'react'
import FacetHeader from '../Header'
import { shallow } from 'enzyme'

const shallowEl = xtend => (
  shallow(<FacetHeader onClick={() => {}} {...xtend} />)
)

describe('FacetHeader', function () {
  it('calls `onClick` when clicked', done => {
    const onClick = () => { done() }
    const $el = shallowEl({onClick})

    $el.simulate('click')
  })

  it('rotates svg 90 degrees when `props.open` is true', () => {
    const $el = shallowEl({open: true})
    expect($el.find('svg').prop('transform')).toBe('rotate(90)')
  })
})
