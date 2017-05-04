// constructing the <ul className="FacetList-list"> element
// to allow other components to import it
import React from 'react'
import cn from 'classnames'

const UnsortedFacetList = function UnsortedFacetList (props) {
  const classNames = {
    list: cn('FacetList-list', props.listClassName),
    item: cn('FacetList-item', props.itemClassName),
    label: cn('FacetList-item-label', props.itemLabelClassName),
    hits: cn('FacetList-item-hits', props.itemHitsClassName),
  }

  const handler = props.onItemClick

  return (
    <ul className={classNames.list}>
      {props.items.map((item, index) => {
        return (
          <li
            className={classNames.item}
            key={item.value + index}
            onClick={() => handler && handler(props.facet, item)}
          >
            <span key="label" className={classNames.label}>
              { item.label || item.value }
            </span>

            <span key="hits" className={classNames.hits}>
              { item.hits }
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default UnsortedFacetList
