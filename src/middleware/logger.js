export default function logger ({ getState }) {
  return next => action => {
    console.group()
    console.log('will dispath', action)
    const result = next(action)
    console.log('state after dispatch', getState())
    console.groupEnd()

    return result
  }
}
