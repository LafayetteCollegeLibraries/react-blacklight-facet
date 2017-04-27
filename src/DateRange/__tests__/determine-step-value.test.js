import determineStepValue from '../determine-step-value'
import { INTERVALS } from '../date-intervals'

const { DAY, MONTH, YEAR } = INTERVALS

const numYears = 5
const end = Date.UTC(2016, 11, 31)
const start = end - ((1000 * 60 * 60 * 24 * 365) * numYears)

describe('determineStepValue', function () {
  it('determines the daily step value', () => {
    expect(determineStepValue(start, end, DAY)).toEqual(365 * numYears)
  })

  it('determines the montly step value', () => {
    expect(determineStepValue(start, end, MONTH)).toEqual(12 * numYears)
  })

  it('determines the yearly step value', () => {
    expect(determineStepValue(start, end, YEAR)).toEqual(numYears)
  })
})
