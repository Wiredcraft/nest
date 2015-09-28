import * as constants from '../constants'
import createReducer from '../utils/create-reducer'
import assign from 'react/lib/Object.assign'

const initialState = {
  test: true
}

const actionHandlers = {
  [constants.TEST_ACTION]: (state, action) => {
    return assign({}, state, {
      test: false
    })
  }
}

export default createReducer(initialState, actionHandlers)
