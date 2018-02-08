import React from 'react'
import ReactDOM from 'react-dom'
import {compose, lifecycle, branch, renderComponent} from 'recompose'

const User = ({name, status}) =>
  <div>{name}-{status}</div>

const withUserData = lifecycle({
  componentDidMount () {
    fetchData().then(
      (users) => this.setState({users}),
      (error) => this.setState({error})
    )
  }
})

const UNAUTHENTICATED = 401
const UNAHTUORIZED = 403
const errorMsgs = {
  [UNAUTHENTICATED]: 'Not Authenticated!',
  [UNAHTUORIZED]: 'Not Authorized!'
}

const AuthError = ({error}) =>
  error.statusCode &&
    <div>{errorMsgs[error.statusCode]}</div>

const NoUsersMessage = () =>
  <div>There are no users to display</div>

const hasErrorCode = ({error}) => error && error.statusCode
const hasNoUsers = ({users}) => users && users.length === 0
const nonOptimalStates = (states) =>
  compose(...states.map(state =>
    branch(state.when, renderComponent(state.render))))

const enhance = compose(
  withUserData,
  nonOptimalStates([
    {when: hasErrorCode, render: AuthError},
    {when: hasNoUsers, render: NoUsersMessage}
  ])
)

const UserList = enhance(({users, error}) =>
  <div>
    {users && users.map(user => <User {...user} />)}
  </div>
)

const App = () =>
  <div><UserList /></div>

// mock
const noUsers = []
const users = [
  {name: 'Tim', status: 'active'},
  {name: 'Bob', status: 'active'},
  {name: 'Joe', status: 'inactive'},
  {name: 'Jim', status: 'pending'}
]
function fetchData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({statusCode: UNAHTUORIZED})
      // resolve(users)
    }, 100)
  })
}

export default App
