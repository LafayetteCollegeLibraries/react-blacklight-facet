import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import FacetBase from './Base'

const propTypes = {
  ...FacetBase.propTypes,
  limit: PropTypes.number,
}

const defaultProps = {
  ...FacetBase.defaultProps,
  limit: 5,
}

class FacetList extends FacetBase {
  constructor (props) {
    super(props)

    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleSelectItem = this.handleSelectItem.bind(this)
    this.renderLists = this.renderLists.bind(this)
    this.prepViewMoreModal = this.prepViewMoreModal.bind(this)
    this.toggleViewMoreModal = this.toggleViewMoreModal.bind(this)

    this.state = {
      modalOpen: false,
    }
  }

  handleRemoveItem (...args) {
    this.setState({modalOpen: false})
    this.props.onRemoveSelectedItem.apply(null, args)
  }

  handleSelectItem (...args) {
    this.setState({modalOpen: false})
    this.props.onSelectItem.apply(null, args)
  }

  prepViewMoreModal () {
    const {
      items,
      label,
      name
    } = this.props

    const displayName = label || name
    const displayLabel = `Viewing all options for ${displayName}`

    return (
      <ReactModal
        className="Modal-container"
        isOpen={this.state.modalOpen}
        onRequestClose={this.toggleViewMoreModal}
        overlayClassName="Modal-overlay"
        contentLabel={displayLabel}
      >
        <div className="Modal-header">{displayLabel}</div>
        { this.renderLists() }
      </ReactModal>
    )
  }

  renderListItems (name, items, handler) {
    return items.map((item, index) => (
      <li
        className="FacetList-item"
        key={item.value + index}
        onClick={() => {
          handler(name, item)
        }}
      >
        <span className="FacetList-item-label">
          {item.label || item.value}
        </span>

        <span className="FacetList-item-hits">
          {item.hits}
        </span>
      </li>
    ))
  }

  renderLists (limitItems) {
    const {
      items,
      limit,
      name,
      selectedItems,
    } = this.props

    const unselected = limitItems ? items.slice(0, limit) : [].concat(items)

    return [
      <ul className="FacetList-list selected">
        {this.renderListItems(name, selectedItems, this.handleRemoveItem)}
      </ul>,
      <ul className="FacetList-list">
        {this.renderListItems(name, unselected, this.handleSelectItem)}
      </ul>,
    ]
  }

  renderBody () {
    const limit = this.props.limit

    // for clarity's sake:
    const limitUnselectedItems = limit !== null
    const hasMore = limit !== null && this.props.items.length > this.props.limit

    return (
      <div className="FacetList">
        { this.renderLists(limitUnselectedItems) }

        {
          hasMore === true
          ? this.viewMoreButton()
          : null
        }

        {
          hasMore === true
          ? this.prepViewMoreModal()
          : null
        }
      </div>
    )
  }

  toggleViewMoreModal () {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  viewMoreButton () {
    return (
      <button
        className="view-more"
        onClick={this.toggleViewMoreModal}
        type="button"
      >
        View all
      </button>
    )
  }
}

FacetList.propTypes = propTypes
FacetList.defaultProps = defaultProps

export default FacetList
