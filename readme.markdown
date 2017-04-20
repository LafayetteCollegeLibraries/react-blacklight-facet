react-blacklight-facet
======================

React components for displaying facet data from a Blacklight-api response.

The JSON response for a Blacklight catalog search will return something
similar to:

```json
{
  "facets": [
    {
      "name": "subject",
      "items": [
        {
          "value": "Cool cats",
          "hits": 290,
          "label": "Cool cats"
        },
        {
          "value": "Delightful dogs",
          "hits": 175,
          "label": "Delightful dogs"
        },
        {
          "value": "Fantastic ferrets",
          "hits": 76,
          "label": "Fantastic ferrets"
        }
      ],
      "label": "Subject",
    }
  ]
}
```

usage (Base)
-----------------

Included is a base component which provides the toggle-able header/body.
To create a custom facet body, simply extend the base class and provide
a `renderBody` method:

```jsx
import FacetBase from '@lafayette-college-libraries/react-blacklight-facet'

class CoolFacet extends FacetBase {
  renderBody () {
    const { items, label, name } = this.props
    return (
      <div>
        This facet ({label}) contains {items.length} items!:
        <ul>
          {items.map((item, index) => (
            <li key={`${name}-${index}`}>{item.label}</li>
          ))}
        </ul>
      </div>
    )
  }
}
```

### propTypes

```javascript
{
  // items, label, and name from the Blacklight response
  items: PropTypes.arrayOf(PropTypes.shape({
    hits: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.any,
  })).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  // event triggered when a selectedItem is clicked
  // function (facetName /* string */, facetItem /* object */)
  onRemoveSelectedItem: PropTypes.func.isRequired,

  // event triggered when a facet item (not selected) is clicked
  // function (facetName /* string */, facetItem /* object */)
  onSelectItem: PropTypes.func.isRequired,

  // should the body component be visible?
  // default: false
  open: PropTypes.bool,

  // default: []
  selectedItems: PropTypes.arrayOf(itemPropType),
}
```

usage (List)
-----------------

Also included is a facet list component that provides a component similar
to the stock Blacklight facet. A limited set of facets are displayed and
a button toggles a [`react-modal`][react-modal] containing all of the items.

```javascript
import { List } from '@lafayette-college-libraries/react-blacklight-facet'

function LimitedList (props) {
  return (
    <List {...props} limit={10} />
  )
}
```

### propTypes

```javascript
{
  ...FacetBase.propTypes,

  // the number of list items shown in the facet body
  // default: 5
  limit: PropTypes.number,
}
```

styling
-------

_note: elements are used to clarify which are being used and it's best to
leave them out in your styles_

### FacetBase

```css
div.Facet {}
div.Facet.has-selected-items {}
div.Facet.is-open {}

div.Facet-Header {}
div.Facet-Header.is-open {}

/* note: you'll want to at least style the `stroke` and `stroke-width`
 * properties, as the arrow won't appear otherwise!
 *
 *   stroke: #1e1e1e;
 *   stroke-width: 2;
 *
 */
svg.Facet-Header-arrow {}

div.Facet-Body {}
```

### FacetList

_note: styling for the following affects the body portion of the facet_

```css
div.FacetList {}

ul.FacetList-list {}
ul.FacetList-list.selected

li.FacetList-item {}

span.FacetList-item-label {}
span.FacetList-item-hits {}

div.FacetList button.view-more

/*
 * styles passed to react-modal component
 * (note: you'll definitely need to provide these, as passing classNames
 *  to `react-router` overrides the default styling
 *  see: https://github.com/reactjs/react-modal#styles)
 */
div.Modal-overlay {}
div.Modal-container {}

/* header that displays "Viewing all options for {facet label}" */
div.Modal-header {}
```

[react-modal]: https://github.com/reactjs/react-modal
