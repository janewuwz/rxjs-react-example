import React from 'react'
import ReactDOM from 'react-dom'

const {Component} = React

const overrideProps = (overrideProps) => (BaseComponent) => (props) =>
  <BaseComponent {...props} {...overrideProps} />

const alwaysBob = overrideProps({name: 'Bob'})

const neverRender = (BaseComponent) =>
  class extends Component {
    shouldComponentUpdate () {
      return false
    }
    render () {
      return <BaseComponent {...this.props} />
    }
  }

const User = ({name}) =>
  <div className='User'>{name}</div>
const User2 = alwaysBob(User)
const User3 = neverRender(User)

const App = () =>
  <div>
    <User name='Tim' />
    <User2 name='Joe' />
    <User3 name='Steve' />
  </div>

export default App
