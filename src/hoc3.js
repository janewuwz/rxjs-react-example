import React from 'react'
import ReactDOM from 'react-dom'
import {compose, withState, withHandlers} from 'recompose'

const StatusList = () =>
  <div className='StatusList'>
    <div>pending</div>
    <div>inactive</div>
    <div>active</div>
  </div>

const withToggle = compose(
  withState('toggledOn', 'toggle', false),
  withHandlers({
    show: ({toggle}) => (e) => toggle(true),
    hide: ({toggle}) => e => toggle(false),
    toggle: ({toggle}) => e => toggle((current) => !current)
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
