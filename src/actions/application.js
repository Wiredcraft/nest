/* global electronRequire */

import * as constants from '../constants'

export function test (test) {
  return {
    type: constants.TEST_ACTION,
  test}
}
