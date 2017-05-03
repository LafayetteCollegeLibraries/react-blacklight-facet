import createRangeFacet from '../create-range-facet'

describe('createRangeFacet', function () {
  test('it produces a range object', () => {
    const name = 'name'
    const min = 1900
    const max = 2000

    const result = createRangeFacet(name, min, max)

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

    const result = createRangeFacet('hi', min, max)
    expect(result.label).toContain(min)
    expect(result.label).toContain(max)
  })

  test('the label contains a single value if min === max', () => {
    const value = 1000
    const result = createRangeFacet('same', value, value)

    expect(result.label).toEqual(value.toString())
  })
})
