import React from 'react'
import { componentFromStream, createEventHandler } from 'recompose'
import {cloneElement, Children} from 'react'
import { Observable } from 'rxjs'

const Counter = ({value, onInc, onDec}) => (
  <div>
    <button onClick={onInc}>+</button>
    <h2>{value}</h2>
    <button onClick={onDec}>-</button>
  </div>
)

const CounterStream = componentFromStream(
  props$ => {
    const {stream: onInc$, handler: onInc} = createEventHandler()
    const {stream: onDec$, handler: onDec} = createEventHandler()
    return props$
      .switchMap(props =>
        Observable
        .merge(
          onInc$.mapTo(1),
          onDec$.mapTo(-1)
        )
        .startWith(props.value)
        .scan((acc, cur) => acc + cur)
        .map(value => ({...props, value, onInc, onDec}))
        .map(props => Children.map(props.children, child => cloneElement(child, props)))
      )
  }
)

const App = () => (
  <div>
    <CounterStream value={3} >
      <Counter />
      <Counter />
    </CounterStream>
  </div>
)
export default App
