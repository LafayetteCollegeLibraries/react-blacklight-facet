// this is the bridge between the Facet interface
// and the RangeSliderDate component, by parsing the
// date values and calculating the range

import React from 'react'
import PropTypes from 'prop-types'
import BaseFacet from '../Base'
import RangeSliderDate from './RangeSliderDate'
import UnsortedFacetList from '../List/UnsortedFacetList'

import {
  INTERVALS,
  VALUES as INTERVAL_VALUES,
} from './date-intervals'

import createRangeFacet from './create-range-facet'
import calculateRange from './calculate-range'
import formatDateValue from './format-date-value'
import roundDate from './round-date-to-interval'

const propTypes = {
  ...BaseFacet.propTypes,

  interval: PropTypes.oneOf(INTERVAL_VALUES),
}

const defaultProps = {
  ...BaseFacet.defaultProps,

  interval: INTERVALS.DAY,
  selectedItems: [],
}

class FacetRangeLimitDate extends BaseFacet {
  constructor (props) {
    super(props)

    this.handleApplyRange = this.handleApplyRange.bind(this)
    this.maybeRenderSelectedItems = this.maybeRenderSelectedItems.bind(this)

    this.state = {
      hits: 0,
      items: props.items,
      max: 0,
      min: 0,
    }
  }

  componentWillMount () {
    const { interval } = this.props

    const range = calculateRange(this.props.items, v => Date.parse(v))

    this.setState({
      min: roundDate(interval, range.min),
      max: roundDate(interval, range.max),
    })
  }

  handleApplyRange (range) {
    const { interval, name } = this.props
    const [min, max] = range.map(v => formatDateValue(interval, v))

    const facet = createRangeFacet(name, min, max)

    this.props.onSelectItem(name, facet)
  }

  maybeRenderSelectedItems () {
    const { name, selectedItems } = this.props

    if (selectedItems.length === 0) {
      return null
    }

    return (
      <UnsortedFacetList
        facet={name}
        items={selectedItems}
        key="selected-items"
        listClassName="selected"
        onItemClick={this.props.onRemoveSelectedItem}
      />
    )
  }

  renderBody () {
    return (
      <div className="FacetRangeLimitDate">
        {this.maybeRenderSelectedItems()}

        <RangeSliderDate
          interval={this.props.interval}
          min={this.state.min}
          max={this.state.max}
          onApplyRange={this.handleApplyRange}
        />
      </div>
    )
  }
}

FacetRangeLimitDate.propTypes = propTypes
FacetRangeLimitDate.defaultProps = defaultProps

export default FacetRangeLimitDate