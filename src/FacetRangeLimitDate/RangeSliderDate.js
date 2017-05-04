import React from 'react'
import PropTypes from 'prop-types'

import { createSliderWithTooltip, Range } from 'rc-slider'
import DelayedInput from '@lafayette-college-libraries/react-delayed-input'

import FacetBase from '../FacetBase'

import {
  INTERVALS,
  VALUES as INTERVAL_VALUES,
} from './date-intervals'

import determineStepValue from './determine-step-value'
import formatDateValue from './format-date-value'
import roundDateToInterval from './round-date-to-interval'
import parseUtcTimestamp from './parse-utc-timestamp'

const { YEAR, MONTH, DAY } = INTERVALS

const RangeSlider = createSliderWithTooltip(Range)

const propTypes = {
  // min/max are UTC timestamp values (similar to Date.now())
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,

  onApplyRange: PropTypes.func.isRequired,

  interval: PropTypes.oneOf(INTERVAL_VALUES),
}

const defaultProps = {
  interval: DAY,
}

class RangeSliderDate extends React.PureComponent {
  constructor (props) {
    super(props)

    this.handleApplyRange = this.handleApplyRange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.hasSingleValue = this.hasSingleValue.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.renderSlider = this.renderSlider.bind(this)

    this.state = {
      min: props.min,
      max: props.max,
    }

    this._formatted = {
      min: formatDateValue(props.interval, props.min),
      max: formatDateValue(props.interval, props.max),
    }

    this._rounded = {
      min: roundDateToInterval(props.interval, props.min),
      max: roundDateToInterval(props.interval, props.max),
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.interval !== this.props.interval) {
      this._step = null
    }
  }

  getInputType (interval) {
    switch (interval) {
      case MONTH:
        return 'month'

      case YEAR:
        return 'year'

      case DAY:
      default:
        return 'date'
    }
  }

  getStepValue (min, max, interval) {
    if (this._step === null) {
      const { min, max } = this._rounded ? this._rounded : this.props
      const { interval } = this.props

      this._step = determineStepValue(min, max, interval)
    }

    return this._step
  }

  handleApplyRange () {
    const { min, max } = this.state
    const { interval, onApplyRange } = this.props
    const value = [min, max].map(v => formatDateValue(interval, v))

    onApplyRange(value)
  }

  handleInputChange (which, value) {
    const parsed = parseUtcTimestamp(value)
    const update = parsed !== parsed ? null : parsed

    this.setState({
      [which]: update,
    })
  }

  hasSingleValue () {
    return this.props.min === this.props.max
  }

  renderInput (which) {
    const { interval } = this.props

    const tsValue = this.state[which]
    const value = tsValue ? formatDateValue(interval, tsValue) : ''

    const props = {
      className: 'RangeSliderDate-input',
      key: `input-${which}`,
      min: this._formatted.min,
      max: this._formatted.max,
      onChange: ev => this.handleInputChange(which, ev),
      type: this.getInputType(interval),
      value,
    }

    return (
      <label className="RangeSliderDate-label">
        {which}
        <DelayedInput {...props} />
      </label>
    )
  }

  renderSlider () {
    const hasSingleValue = this.hasSingleValue()

    const value = [
      this.state.min || this.props.min,
      this.state.max || this.props.max,
    ]

    const onChange = value => {
      this.setState({
        min: value[0],
        max: value[1],
      })
    }

    const props = {
      allowCross: true,
      min: this._rounded.min,
      max: this._rounded.max,
      onChange,
      pushable: false,
      range: !hasSingleValue,
      tipFormatter: formatDateValue.bind(null, this.props.interval),
      value,
    }

    if (!hasSingleValue) {
      props.step = this.getStepValue()
    }

    return <RangeSlider {...props} />
  }

  render () {
    const buttonProps = {
      className: 'RangeSliderDate-apply-range-btn',
      onClick: this.handleApplyRange,
      type: 'button',
    }

    if (!this.state.min || !this.state.max) {
      buttonProps.disabled = true
    }

    return (
      <div className="RangeSliderDate">
        <div className="RangeSliderDate-input-container">
          {this.renderInput('min')}
          {this.renderInput('max')}
          <button {...buttonProps}>
            Apply range
          </button>
        </div>

        {this.renderSlider()}
      </div>
    )
  }
}

RangeSliderDate.propTypes = propTypes
RangeSliderDate.defaultProps = defaultProps

export default RangeSliderDate
