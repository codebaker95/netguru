import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as UsersActions from './actions/users'
import * as QueryActions from './actions/query'
import * as ShowActions from './actions/show'
import * as MessageWindowsActions from './actions/message-windows'
import * as MessagesActions from './actions/messages'
import Chat from './components/chat'

const querySelector = state => state.query
const usersSelector = state => state.users

const messageWindowsSelector = state => state.messageWindows
const messagesSelector = state => state.messages

function isActive(user, messageWindows) {
  return messageWindows.filter(window => window.id == user.id).length != 0
}

function selectUsers(users, query, messageWindows) {
  users = users.map(user => ({...user, active: isActive(user, messageWindows)}))
  if(query.replace(/\s/g,"") === "") return users
  else return users.filter(user => new RegExp(`^${query}`, "i").test(user.username))
}

const visibleUsersSelector = createSelector(
  usersSelector,
  querySelector,
  messageWindowsSelector,
  (users, query, messageWindows) => selectUsers(users, query, messageWindows)
)

const activeUsersSelector = createSelector(
  usersSelector,
  messageWindowsSelector,
  (users, messageWindows) =>
    users.filter(user => isActive(user, messageWindows)).length
)

const usersListSelector = state => ({
  users: visibleUsersSelector(state),
  query: state.query,
  show: state.show,
  active: activeUsersSelector(state)
})

function selectMessageWindow(messageWindow, users, messages) {
  return {
    ...messageWindow,
    user: users.filter(user => user.id == messageWindow.id)[0],
    messages: messages.filter(message => message.user_id == messageWindow.id)
  }
}

const messageWindowsFinalSelector = createSelector(
  messageWindowsSelector,
  usersSelector,
  messagesSelector,
  (messageWindows, users, messages) => messageWindows.map(window => selectMessageWindow(window, users, messages))
)

const chatSelector = state => ({
  usersList: usersListSelector(state),
  messageWindows: messageWindowsFinalSelector(state)
})

const chatActions = Object.assign({}, UsersActions, QueryActions, ShowActions, MessageWindowsActions, MessagesActions)

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(chatActions, dispatch)

export default connect(chatSelector, mapDispatchToProps)(Chat)
