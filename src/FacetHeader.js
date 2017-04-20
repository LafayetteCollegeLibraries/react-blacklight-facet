const React = require('react')
const PropTypes = require('prop-types')
const cn = require('classnames')

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
        { this.props.hideArrow ? null : this.renderArrow(open) }
      </div>
    )
  }
}

FacetHeader.defaultProps = {
  hideArrow: false,
  onClick: () => {},
  open: false,
}

FacetHeader.propTypes = {
  hideArrow: PropTypes.bool,
  onClick: PropTypes.func,
  open: PropTypes.bool,
}

module.exports = FacetHeader
