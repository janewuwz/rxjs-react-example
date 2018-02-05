import React from 'react'
import ReactDOM from 'react-dom'
import {compose, mapProps} from 'recompose'

const User = ({name, status}) =>
  <div className='User'>{name}-{status}</div>

const UserList = ({users, status}) =>
  <div>
    <h3>{status} users</h3>
    {users && users.map((user) => <User {...user} />)}
  </div>

const users = [
  { name: "Tim", status: 'active' },
  { name: "Bob", status: 'active' },
  { name: "Joe", status: 'pending' },
  { name: "Jim", status: 'inactive' },
]

const filterByStatus = status => mapProps(
  ({users}) => ({
    status,
    users: users.filter(u => u.status === status)
  })
)

const ActiveUsers = filterByStatus('active')(UserList)
const InactiveUsers = filterByStatus('inactive')(UserList)
const PendingUsers = filterByStatus('pending')(UserList)

const App = () =>
  <div>
    <ActiveUsers users={users} />
    <InactiveUsers users={users} />
    <PendingUsers users={users} />
  </div>

export default App
