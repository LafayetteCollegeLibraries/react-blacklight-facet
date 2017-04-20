react-blacklight-facet
======================

React components for displaying facet data from a Blacklight-api response.

Out-of-the-box, a JSON response for a Blacklight catalog search will return
something similar to:

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

/* styles passed to react-modal component */
div.Modal-overlay {}
div.Modal-container {}

/* header that displays "Viewing all options for {facet label}" */
div.Modal-header {}
```
