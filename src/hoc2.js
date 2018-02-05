import React from 'react'
import ReactDOM from 'react-dom'
import {compose, setDisplayName, setPropTypes} from 'recompose'
import PropTypes from 'prop-types'

// fake redux
function Redux() {
  return {
    connect: () => (BaseComponent) => (props) =>
      <BaseComponent
        {...props}
        dispatch={({type}) => console.log(type + 'dispatched')}
      />
  }
}

const {connect} = Redux()

const enhance = compose(
  setDisplayName('User'),
  setPropTypes({
    name: PropTypes.string.isRequired,
    status: PropTypes.string
  }),
  connect()
)

const App = enhance(({name, status, dispatch}) =>
  <div className='User' onClick={() => dispatch({type: 'USER_SELECTED'})}>
    {name}: {status}
  </div>
)

export default App
