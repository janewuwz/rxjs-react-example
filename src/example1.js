import React from 'react'
import { componentFromStream } from 'recompose'
import { Observable } from 'rxjs'

const App = componentFromStream(props$ => {
  return Observable.interval(1000).map(i => <div>{i}</div>)
})

export default App
