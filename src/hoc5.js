import React from 'react'
import ReactDOM from 'react-dom'
import {compose, lifecycle} from 'recompose'

const config = {
  showStatus: false,
  canDeleteUsers: false
}

const configPromise = fetchConfiguration()

function fetchConfiguration() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(config), 300)
  })
}

const withConfig = lifecycle({
  state: {config: {}},
  componentDidMount() {
    configPromise.then(config =>
      this.setState({config}))
  }
})

const User = withConfig(({name, status, config}) =>
  <div>
    {name}
    {config.showStatus && '-' + status}
    {config.canDeleteUsers && <button>X</button>}
  </div>)

const App = () =>
  <div>
    <User name='Tim' status='active' />
  </div>
export default App
