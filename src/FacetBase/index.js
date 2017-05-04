import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Header from './Header'

const itemPropType = PropTypes.shape({
  hits: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.any,
})

const propTypes = {
  items: PropTypes.arrayOf(itemPropType).isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,

  onRemoveSelectedItem: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  open: PropTypes.bool,

  selectedItems: PropTypes.arrayOf(itemPropType),
}

const defaultProps = {
  open: false,
  selectedItems: []
}

class FacetBase extends React.PureComponent {
  constructor (props) {
    super(props)

    this._renderBody = this._renderBody.bind(this)
    this.renderBody = this.renderBody.bind(this)

    this.state = {
      open: props.open || false
    }
  }

  // this is your point of extension, if you so wish.
  // do something like:
  //
  // class CoolFacet extends Facet {
  //
  //   renderBody () {
  //      /* do whatever */
  //   }
  // }
  renderBody () {
    throw new Error('no `renderBody` method is defined')
  }

  _renderBody () {
    const { open } = this.state

    if (!open) {
      return null
    }

    return (
      <div className="Facet-Body">
        {this.renderBody()}
      </div>
    )
  }

  render () {
    const className = cn('Facet', {
      'has-selected-items': this.props.selectedItems.length > 0,
      'is-open': this.state.open,
    })

    return (
      <div className={className}>
        <Header
          onClick={() => {
            this.setState(prev => ({open: prev.open ? false : true}))
          }}
          open={this.state.open}
        >
          { this.props.label || this.props.name }
        </Header>

        { this._renderBody() }
      </div>
    )
  }
}

FacetBase.propTypes = propTypes
FacetBase.defaultProps = defaultProps

export default FacetBase
