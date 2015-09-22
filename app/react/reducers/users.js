import { SET_USERS, SET_STATUS, READ_MESSAGES } from '../actions/users'
import { RECEIVE_MESSAGE } from '../actions/messages'
import { TOGGLE_MESSAGE_WINDOW } from '../actions/message-windows'
import { addons } from 'react/addons'

export default function users(state = [], action) {
  switch(action.type) {
  case SET_USERS:
    return action.users
  case SET_STATUS:
    return state.map(user =>
        user.id == action.user_id
        ? addons.update(user, { online: { $set: action.status } })
        : user
      )
  case READ_MESSAGES:
    return state.map(user =>
        user.id == action.user_id
        ? addons.update(user, { unread: { $set: 0 } })
        : user
      )
  case RECEIVE_MESSAGE:
    return state.map(user =>
        user.id == action.user_id
        ? addons.update(user, { unread: { $apply: x => x + 1 } })
        : user
      )
  default:
    return state
  }
}
