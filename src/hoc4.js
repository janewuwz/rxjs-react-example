import React from 'react'
import ReactDOM from 'react-dom'
import {compose, withReducer, withHandlers} from 'recompose'

const StatusList = () =>
  <div className='StatusList'>
    <div>pending</div>
    <div>inactive</div>
    <div>active</div>
  </div>

const withToggle = compose(
  withReducer('toggledOn', 'dispatch', (state, action) => {
    switch(action.type) {
      case 'SHOW':
        return true
      case 'HIDE':
        return false
      case 'TOGGLE':
        return !state
      default:
        return state
    }
  }, false),
  withHandlers({
    show: ({ dispatch }) => (e) => dispatch({ type: 'SHOW' }),
    hide: ({ dispatch }) => (e) => dispatch({ type: 'HIDE' }),
    toggle: ({ dispatch }) => (e) => dispatch({ type: 'TOGGLE' })
  })
)

const Status = withToggle(
  ({status, toggledOn, toggle}) =>
  <span onClick={() => toggle((x) => !x)}>
    {status}
    {toggledOn && <StatusList />}
  </span>)

const Tooltip = withToggle(
  ({text, children, toggledOn, show, hide}) =>
  <span>
    {toggledOn && <div className='Tooltip'>{text}</div>}
    <span
      onMouseEnter={show}
      onMouseLeave={hide}>
      {children}
    </span>
  </span>)

const App = ({name, status}) =>
  <div className='User'>
    <Tooltip text='Cool Dude!'>{name}</Tooltip>
    <Status status={status} />
  </div>

export default App
