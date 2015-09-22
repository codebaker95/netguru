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

function selectUsers(users, query) {
  if(query.replace(/\s/g,"") === "") return users
  else return users.filter(user => new RegExp(`^${query}`, "i").test(user.username))
}

const visibleUsersSelector = createSelector(
  querySelector,
  usersSelector,
  (query, users) => selectUsers(users, query)
)

const activeUsersSelector = createSelector(
  usersSelector,
  (users) => users.filter(user => user.active).length
)

const usersListSelector = state => ({
  users: visibleUsersSelector(state),
  query: state.query,
  show: state.show,
  active: activeUsersSelector(state)
})

const messageWindowsSelector = state => state.messageWindows
const messagesSelector = state => state.messages

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
