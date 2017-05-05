import createRangeFacetItem from '../create-range-facet-item'

describe('createRangeFacetItem', function () {
  test('it produces a range object', () => {
    const name = 'name'
    const min = 1900
    const max = 2000

    const result = createRangeFacetItem(name, min, max)

    expect(typeof result).toBe('object')
    expect(result).toHaveProperty('label')
    expect(result).toHaveProperty('name')
    expect(result).toHaveProperty('value')
    expect(result.value).toHaveProperty('begin')
    expect(result.value.begin).toBe(min)
    expect(result.value).toHaveProperty('end')
    expect(result.value.end).toBe(max)
    expect(result).toHaveProperty('type')
    expect(result.type).toBe('range')
  })

  test('the label contains the min/max values', () => {
    const min = 1900
    const max = 2000

    const result = createRangeFacetItem('hi', min, max)
    expect(result.label).toContain(min)
    expect(result.label).toContain(max)
  })

  test('the label contains a single value if min === max', () => {
    const value = 1000
    const result = createRangeFacetItem('same', value, value)

    expect(result.label).toEqual(value.toString())
  })
})
