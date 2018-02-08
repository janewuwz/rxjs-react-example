import React from 'react'
import { branch, renderNothing} from 'recompose'

const User = ({name, status}) =>
  <div>{name}-{status}</div>

const userIsNotActive = ({status}) => status !== 'active'
const hideIfNotActive = branch(userIsNotActive, renderNothing)

const FeaturedUser = hideIfNotActive(({name, status}) =>
  <div>
    <h3>Today's Featured User</h3>
    <User name={name} status={status} />
    <hr />
  </div>
)

const UserList = ({users}) =>
  <div>
    <h3>All Users</h3>
    {users && users.map((user) => <User {...user} />)}
  </div>

const App = () =>
  <div>
    <h2>User Management</h2>
    <hr />
    <FeaturedUser name={featured.name} status={featured.status} />
    <UserList users={users} />
  </div>

// mock
const users = [
  {name: 'Tim', status: 'active'},
  {name: 'Bob', status: 'active'},
  {name: 'Joe', status: 'inactive'},
  {name: 'Jim', status: 'pending'}
]
const featured = users[getRandomInt(0, 3)]

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export default App
