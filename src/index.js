import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './example11'
import {Observable} from 'rxjs'
import {
	setObservableConfig,
	componentFromStream,
	createEventHandler
} from 'recompose'
import config from 'recompose/rxjsObservableConfig'

setObservableConfig(config)

// ReactDOM.render(<App message="I'm jane" speed={1000} />, document.getElementById('root'))

ReactDOM.render(
  <div
    style={{
      marginTop: 40,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    }}>
    <App />
  </div>,
document.getElementById('root'))
