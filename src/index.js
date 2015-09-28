// import translation code
import './utils/translation'

import 'babel/polyfill'

import React from 'react'
import CreateHashHistory from 'history/lib/createHashHistory'

import Root from './containers/Root'

// since we are using file protocol here, we can not use the browser history
// so hash is used here instead
const history = new CreateHashHistory()

React.render(<Root history={history} />, document.getElementById('app'))
