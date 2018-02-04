import React from 'react'
import { mapPropsStream } from 'recompose'
import { Observable } from 'rxjs'

const interval = mapPropsStream(props$ =>
  props$.switchMap(props => Observable.interval(1000),
  (props, count) => ({...props, count})
))

const Counter = props => <h1>{props.count}</h1>
const CounterWithInterval = interval(Counter)

const App = () => (
  <div>
    <CounterWithInterval />
  </div>
)

export default App
