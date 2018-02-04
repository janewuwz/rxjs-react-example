import React from 'react'
import { componentFromStream } from 'recompose'
import { Observable } from 'rxjs'

const psersonById = id => `https://swapi.co/api/people/${id}`
const Card = props => (
  <div>
    <h1>{props.name}</h1>
    <h2>{props.homeworld}</h2>
  </div>
)
const loadById = id =>
  Observable.ajax(psersonById(id))
  .pluck('response')
  .switchMap(
    response =>
    Observable.ajax(response.homeworld)
      .pluck('response')
      .startWith({name: ''}),
    (person, homeworld) => ({
      ...person,
      homeworld: homeworld.name
    })
  )

const CardStream = componentFromStream(props$ =>
  props$
    .switchMap(props => loadById(props.id))
    .map(Card)
  )

const App = () => (
  <div>
    <Card name='John' homeworld='Earth' />
    <CardStream id={1} />
    <CardStream id={12} />
    <CardStream id={10} />
    <CardStream id={24} />
  </div>
)
export default App
