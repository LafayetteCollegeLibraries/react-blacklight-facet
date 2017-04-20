import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

class FacetHeader extends React.PureComponent {
  renderArrow (isOpen) {
    const className = cn('Facet-Header-arrow', { 'is-open': isOpen })

    return (
      <svg
        className={className}
        height="15"
        transform={`rotate(${isOpen ? 90 : 0})`}
        width="15"
        viewBox="0 0 10 10"
      >
        <path
          d="M2,1L8,5L2,9"
          fill="transparent"
        />
      </svg>
    )
  }

  render () {
    const { open } = this.props

    const className = cn('Facet-Header', {'is-open': open})
    const onClick = () => {
      this.props.onClick && this.props.onClick()
    }

    return (
      <div className={className} onClick={onClick}>
        { this.props.children }
        { this.renderArrow(open) }
      </div>
    )
  }
}

FacetHeader.defaultProps = {
  open: false,
}

FacetHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

module.exports = FacetHeader
