import React from 'react'
import { componentFromStream } from 'recompose'
import { Observable } from 'rxjs'

const deadApp = props => (
  <div>
    <h1>{props.message}</h1>
  </div>
)

const createTypewriter = (message, speed) =>
  Observable.zip(
    Observable.from(message),
    Observable.interval(speed),
    letter => letter
  ).scan((acc, curr) => acc + curr)

const App = componentFromStream(props$ =>
  props$.switchMap(props =>
    createTypewriter(props.message, props.speed)
    .map(message => ({message}))
    .map(deadApp)
  ))
export default App
