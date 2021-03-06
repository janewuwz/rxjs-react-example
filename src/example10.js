import React from 'react'
import { mapPropsStream, createEventHandler, compose } from 'recompose'
import { Observable } from 'rxjs'
import * as R from 'ramda'

const count = mapPropsStream(props$ => {
  const {
    stream: onInc$,
    handler: onInc
  } = createEventHandler()
  const {
    stream: onDec$,
    handler: onDec
  } = createEventHandler()
  return props$.switchMap(
    props =>
      Observable
      .merge(
        onInc$.mapTo(1),
        onDec$.mapTo(-1)
      )
      .startWith(0)
      .scan((acc, cur) => acc + cur),
        (props, count) => ({
          ...props,
          count,
          onInc,
          onDec
        })
  )
})

const load = mapPropsStream(props$ =>
  props$.switchMap(
    props =>
      Observable.ajax(
        `https://swapi.co/api/prople/${props.count}`
      )
      .pluck('response')
      .startWith({name: 'loading...'})
      .catch(err =>
        Observable.of({name: 'Not found'})),
        (props, person) => ({...props, person})
  ))

const personNameLens = R.lensPath([
  'person',
  'name'
])

const typewriter = lens => mapPropsStream(props$ =>
  props$.switchMap(
    props =>
      Observable
      .zip(
        Observable.from(R.view(lens, props)),
        Observable.interval(100),
        letter => letter
      )
      .scan((acc, cur) => acc + cur),
    (props, name) => R.set(lens, name, props)
  ))

const Counter = props => <div>
  <button onClick={props.onInc}>+</button>
  <button onClick={props.onDec}>-</button>
  <h3>{props.count}</h3>
  <h1>{props.person.name}</h1>
</div>

const CounterWithPersonLoader = compose(count, load, typewriter(personNameLens))(Counter)

const DateDisplay = props => <h1>{props.date}</h1>
const dateLens = R.lensProp('date')
const DateTypewriter = typewriter(dateLens)(DateDisplay)

const App = () => (
  <div>
    <DateTypewriter date={new Date().toDateString()} />
    <CounterWithPersonLoader />
  </div>
)

export default App
