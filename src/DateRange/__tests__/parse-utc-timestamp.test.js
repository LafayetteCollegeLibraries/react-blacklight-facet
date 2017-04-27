import parseUtcTimestamp from '../parse-utc-timestamp'

describe('parseUtcTimestamp', function () {
  it('returns NaN if value is falsey', () => {
    expect(parseUtcTimestamp()).toEqual(NaN)
  })

  it('parses a year value', () => {
    expect(parseUtcTimestamp('2017'))
      .toEqual(Date.UTC(2017, 0, 1))
  })

  it('parses a yyyy-mm value', () => {
    expect(parseUtcTimestamp('2017-02'))
      .toEqual(Date.UTC(2017, 1, 1))
  })

  it('parses a yyyy-mm-dd value', () => {
    expect(parseUtcTimestamp('2017-10-04'))
      .toEqual(Date.UTC(2017, 9, 4))
  })
})
