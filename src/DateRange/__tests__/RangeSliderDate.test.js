import React from 'react'
import { shallow } from 'enzyme'
import RangeSliderDate from '../RangeSliderDate'
import { INTERVALS } from '../date-intervals'

const wrapper = renderer => xtend => {
  const props = {
    min: Date.parse('1986-02-11T00:00:00Z'),
    max: Date.parse('2016-11-06T00:00:00Z'),
    onApplyRange: () => {},
  }

  return renderer(<RangeSliderDate {...props} {...xtend} />)
}

const shallowEl = wrapper(shallow)

describe('<RangeSliderDate />', function () {
  describe('when interval="month"', function () {
    let $els

    beforeEach(function () {
      const $el = shallowEl({interval: INTERVALS.MONTH })
      $els = $el.find('DelayedInput')
    })

    test('renders inputs with `type="month"', function () {
      const $filtered = $els.findWhere($e => $e.prop('type') === 'month')
      expect($els).toHaveLength(2)
    })

    test('parses value to YYYY-MM', function () {
      $els.forEach($$el => {
        expect($$el.prop('value'))
          .toEqual(expect.stringMatching(/^\d{4}-\d{2}$/))
      })
    })
  })

  describe('when interval="day"', function () {
    let $els

    beforeEach(function () {
      const $el = shallowEl({interval: INTERVALS.DAY})
      $els = $el.find('DelayedInput')
    })

    test('renders inputs with `type="date"`', function () {
      const $filtered = $els.findWhere($e => $e.prop('type') === 'date')
      expect($els).toHaveLength(2)
    })

    test('parses value to YYYY-MM-DD', function () {
      $els.forEach($$el => {
        expect($$el.prop('value'))
          .toEqual(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/))
      })
    })
  })

  describe('when interval="year"', function () {
    let $els

    beforeEach(function () {
      const $el = shallowEl({interval: INTERVALS.YEAR})
      $els = $el.find('DelayedInput')
    })

    test('renders inputs with `type="number"`', function () {
      const $filtered = $els.findWhere($e => $e.prop('type') === 'number')
      expect($els).toHaveLength(2)
    })

    test('parses value to YYYY', function () {
      $els.forEach($$el => {
        expect($$el.prop('value'))
          .toEqual(expect.stringMatching(/^\d{4}$/))
      })
    })
  })

  describe('the `onApplyRange` handler', function () {
    test('is called with an array of 2 numbers', function (done) {
      const onApplyRange = vals => {
        expect(Array.isArray(vals)).toBeTruthy()
        expect(vals).toHaveLength(2)

        vals.map(v => expect(typeof v).toBe('string'))

        done()
      }

      const $el = shallowEl({onApplyRange})
      const $button = $el.find('button')

      $button.simulate('click')
    })

    test('is called with rounded date values', function (done) {
      const min = Date.parse('1986-02-11T11:11:00Z')
      const max = Date.parse('2016-11-06T15:49:00Z')

      const dates = [
        new Date(min),
        new Date(max),
      ]

      const onApplyRange = vals => {
        const fns = [
          'getUTCFullYear', 'getUTCMonth', 'getUTCDate'
        ]

        let i = 0
        let current, comp

        // throw if there's a problem
        expect(vals).toHaveLength(dates.length)

        for (; i < vals.length; i++) {
          current = new Date(vals[i])
          comp = dates[i]

          expect(current.toISOString()).not.toEqual(comp.toISOString())

          fns.forEach(fn => {
            expect(current[fn]()).toEqual(comp[fn]())
          })
        }

        done()
      }

      const $el = shallowEl({min, max, onApplyRange})
      const $button = $el.find('button').first()
      $button.simulate('click')
    })
  })

  describe('the `min` input', function () {
    test('changes the value of `state.min`', function () {
      const minValue = '1999-12-31'
      const split = minValue.split('-').map(Number)
      split[1] = split[1] - 1

      const minTs = Date.UTC.apply(Date, split)
      const $el = shallowEl({interval: INTERVALS.DAY})

      const $min = $el.find('DelayedInput').filterWhere(el => (
        el.key() === 'input-min'
      ))

      expect($min).toHaveLength(1)

      $min.simulate('change', minValue)

      setTimeout(function () {
        const minState = $el.state('min')
        expect(minState).toEqual(minTs)
      }, 0)
    })
  })

  describe('the `max` input', function () {
    test('changes the value of `state.max`', function () {
      const maxValue = '2017-01-01'
      const split = maxValue.split('-').map(Number)
      split[1] = split[1] - 1

      const maxTs = Date.UTC.apply(Date, split)
      const $el = shallowEl({interval: INTERVALS.DAY})

      const $max = $el.find('DelayedInput').filterWhere(el => (
        el.key() === 'input-max'
      ))

      expect($max).toHaveLength(1)

      $max.simulate('change', maxValue)

      setTimeout(function () {
        const maxState = $el.state('max')
        expect(maxState).toEqual(maxTs)
      }, 0)
    })
  })

  describe('when the `interval` prop is updated', function () {
    test('updates the internal `_step_` property', function () {
      const $el = shallowEl({interval: INTERVALS.DAY})
      $el.render()

      const firstStep = $el.instance()._step

      $el.setProps({interval: INTERVALS.MONTH})

      setTimeout(() => {
        const secondStep = $el.instance()._step
        expect(firstStep).not.toEqual(secondStep)
      }, 0)
    })
  })
})
