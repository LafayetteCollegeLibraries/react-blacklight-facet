import formatDateValue from '../format-date-value'
import { INTERVALS } from '../date-intervals'

describe('catalog/common/format-date-value', function () {
  test('formats "day" as YYYY-MM-DD', function () {
    const res = formatDateValue(INTERVALS.DAY, Date.now())
    expect(res).toEqual(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/))
  })

  test('formats "month" as YYYY-MM', function () {
    const res = formatDateValue(INTERVALS.MONTH, Date.now())
    expect(res).toEqual(expect.stringMatching(/^\d{4}-\d{2}$/))
  })

  test('formats "year" as YYYY', function () {
    const res = formatDateValue(INTERVALS.YEAR, Date.now())
    expect(res).toEqual(expect.stringMatching(/^\d{4}$/))
  })
})
