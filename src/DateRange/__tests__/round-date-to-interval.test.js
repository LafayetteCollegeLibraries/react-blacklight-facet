import roundDate from '../round-date-to-interval'
import { INTERVALS } from '../date-intervals'

describe('catalog/common/round-date-to-interval', function () {
  // 2016-11-29T11:18:00Z
  const TIMESTAMP = Date.UTC(2016, 10, 29, 11, 18, 0)

  test('rounds `day` to the day', function () {
    const rounded = roundDate(INTERVALS.DAY, TIMESTAMP)
    const d = new Date(TIMESTAMP)
    const r = new Date(rounded)

    expect(r.getUTCFullYear()).toBe(d.getUTCFullYear())
    expect(r.getUTCMonth()).toBe(d.getUTCMonth())
    expect(r.getUTCDate()).toBe(d.getUTCDate())

    expect(r.getUTCHours()).not.toBe(d.getUTCHours())
    expect(r.getUTCHours()).toBe(0)

    expect(r.getUTCMinutes()).not.toBe(d.getUTCMinutes())
    expect(r.getUTCMinutes()).toBe(0)
  })

  test('rounds `month` to the month', function () {
    const rounded = roundDate(INTERVALS.MONTH, TIMESTAMP)
    const d = new Date(TIMESTAMP)
    const r = new Date(rounded)

    expect(r.getUTCFullYear()).toBe(d.getUTCFullYear())
    expect(r.getUTCMonth()).toBe(d.getUTCMonth())

    expect(r.getUTCDate()).not.toBe(d.getUTCDate())
    expect(r.getUTCDate()).toBe(1)

    expect(r.getUTCHours()).not.toBe(d.getUTCHours())
    expect(r.getUTCHours()).toBe(0)

    expect(r.getUTCMinutes()).not.toBe(d.getUTCMinutes())
    expect(r.getUTCMinutes()).toBe(0)
  })

  test('rounds `year` to the year', function () {
    const rounded = roundDate(INTERVALS.YEAR, TIMESTAMP)
    const d = new Date(TIMESTAMP)
    const r = new Date(rounded)

    expect(r.getUTCFullYear()).toBe(d.getUTCFullYear())

    expect(r.getUTCMonth()).not.toBe(d.getUTCMonth())
    expect(r.getUTCMonth()).toBe(0)

    expect(r.getUTCDate()).not.toBe(d.getUTCDate())
    expect(r.getUTCDate()).toBe(1)

    expect(r.getUTCHours()).not.toBe(d.getUTCHours())
    expect(r.getUTCHours()).toBe(0)

    expect(r.getUTCMinutes()).not.toBe(d.getUTCMinutes())
    expect(r.getUTCMinutes()).toBe(0)
  })
})
