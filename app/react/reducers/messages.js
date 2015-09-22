import { SEND_MESSAGE, RECEIVE_MESSAGE, SET_MESSAGES } from '../actions/messages'

export default function messages(state = [], action) {
  switch(action.type) {
  case SEND_MESSAGE:
    return [...state, { user_id: action.user_id, body: action.message, time: new Date(action.time), mine: true }]
  case RECEIVE_MESSAGE:
    return [...state, { user_id: action.user_id, body: action.message, time: new Date(action.time), mine: false }]
  case SET_MESSAGES:
    let messages = state.filter(message => message.user_id != action.user_id)
    return [...messages, ...action.messages]
  default:
    return state
  }
}
