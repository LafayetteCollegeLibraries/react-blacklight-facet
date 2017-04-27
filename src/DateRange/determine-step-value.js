import { INTERVALS } from './date-intervals'

const { DAY, MONTH, YEAR } = INTERVALS

const day = 1000 * 60 * 60 * 24
const year = day * 365
const month = year / 12

const getDivisor = interval => {
  switch (interval) {
    case YEAR:
      return year

    case MONTH:
      return month

    case DAY:
    default:
      return day

  }
}

export default function determineStepValue (min, max, interval) {
  const divisor = getDivisor(interval)
  return Math.abs(Math.round((max - min) / divisor))
}
