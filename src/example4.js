import React from 'react'
import {
  componentFromStream, createEventHandler
} from 'recompose'

const SimpleForm = ({text, onInput}) => (
  <div>
    <input type='text' onInput={onInput} />
    <h2>{text}</h2>
  </div>
)

const SimpleFormStream = componentFromStream(
  props$ => {
    const {stream: onInput$, handler: onInput} = createEventHandler()
    const text$ = onInput$
      .map(e => e.target.value)
      .delay(500)
      .startWith('')
    return text$.map(text => ({text, onInput}))
        .map(SimpleForm)
  }
)

const App = () => (
  <div>
    <SimpleFormStream />
  </div>
)
export default App
