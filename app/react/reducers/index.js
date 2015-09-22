import { combineReducers } from 'redux'
import users from './users'
import query from './query'
import show from './show'
import messageWindows from './message-windows'
import messages from './messages'

export default combineReducers({
  users,
  query,
  show,
  messageWindows,
  messages
})
