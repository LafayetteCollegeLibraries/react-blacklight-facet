const React = require('react')
const PropTypes = require('prop-types')
const cn = require('classnames')
const Header = require('./FacetHeader')

const itemPropType = PropTypes.shape({
  hits: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.any,
})

const propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,

  items: PropTypes.arrayOf(itemPropType),

  onRemoveSelectedFacet: PropTypes.func,
  onSelectFacet: PropTypes.func,
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

  _renderBody (open) {
    if (!open) {
      return null
    }

    return (
      <div className="Facet-Body">
        {this.renderBody.call(this)}
      </div>
    )
  }

  toggleOpen () {
    this.setState({open: !this.state.open})
  }

  render () {
    const open = this.state.open
    const className = cn('Facet', {
      'has-selected-items': this.props.selectedItems.length > 0,
      'is-open': open,
    })

    return (
      <div className={className}>
        <Header
          onClick={() => {this.setState({open: !open})}}
          open={open}
        >
          { this.props.label || this.props.name }
        </Header>

        { this._renderBody(open) }
      </div>
    )
  }
}

FacetBase.propTypes = propTypes
FacetBase.defaultProps = defaultProps

module.exports = FacetBase
