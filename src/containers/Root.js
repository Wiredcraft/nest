/* global __DEVTOOLS__ */
import React, { PropTypes } from 'react'
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './utils/configure-store'
import thunk from 'redux-thunk'

import * as Pages from '../pages'

const { Application, Main } = Pages

const initialState = {
  application: {
    test: false
  }
}
const store = configureStore(initialState)

function getRootChildren (history) {
  const rootChildren = [
    <Provider key='provider' store={store}>
      { renderRoutes.bind(null, history) }
    </Provider>
  ]

  if (__DEVTOOLS__) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
    rootChildren.push(
      <DebugPanel
                  key='debug-panel'
                  top
                  right
                  bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    )
  }

  return rootChildren
}

export default class Root extends React.Component {
  render() {
    const { history } = this.props
    return (
    <div>
      {getRootChildren(history)}
    </div>
    )
  }
}

function renderRoutes (history) {
  return (
  <Router history={history}>
    <Route component={Application}>
      <Route
             path='/'
             component={Main}
             onEnter={requireLocation} />
    </Route>
  </Router>
  )
}

Root.propTypes = {
  history: PropTypes.object.isRequired
}

function requireLocation (nextState, transition) {
  const state = store.getState()
  if (!state.application.isLocationSet) {
    transition('/locations', null, {
      nextPathname: nextState.location.pathname
    })
  }
}
