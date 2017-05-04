import { configure } from '@kadira/storybook'
import '../src/main.scss'
import './test-reset.scss'

configure(() => {
  require('./BaseFacet.story')
  require('./FacetList.story')
  require('./FacetRangeLimitDate.story')
}, module)
