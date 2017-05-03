import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import FacetBase from '../Base'
import UnsortedFacetList from './UnsortedFacetList'

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

  renderLists (limitItems) {
    const {
      items,
      limit,
      name,
      selectedItems,
    } = this.props

    const unselected = limitItems ? items.slice(0, limit) : [].concat(items)

    return [
      <UnsortedFacetList
        facet={name}
        items={selectedItems}
        key="selected-facets"
        listClassName="selected"
        onItemClick={this.handleRemoveItem}
      />,
      <UnsortedFacetList
        facet={name}
        items={unselected}
        key="unselected-facets"
        onItemClick={this.handleSelectItem}
      />,
    ]
  }

  renderBody () {
    const limit = this.props.limit

    // for clarity's sake:
    const limitUnselectedItems = limit !== null
    const hasMore = limit !== null && this.props.items.length > this.props.limit

    const hasSelectedItems = this.props.selectedItems.length > 0

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
