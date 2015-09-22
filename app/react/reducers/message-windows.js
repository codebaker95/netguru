import { TOGGLE_MESSAGE_WINDOW, SET_INPUT } from '../actions/message-windows'
import { SEND_MESSAGE } from '../actions/messages'
import { addons } from 'react/addons'

export default function messageWindows(state = [], action) {
  switch (action.type) {
  case TOGGLE_MESSAGE_WINDOW:
    if (state.filter(window => window.id == action.user_id).length == 0) {
      return state.length <= 4 ? [...state, {id: action.user_id, input: ""}] : state
    } else {
      return state.filter(window => window.id != action.user_id)
    }
  case SET_INPUT:
    return state.map(window =>
      window.id == action.user_id
      ? addons.update(window, { input: { $set: action.input } })
      : window
    )
  case SEND_MESSAGE:
    return state.map(window => {
      if (window.id == action.user_id && window.input !== "") {
        return addons.update(window, { input: { $set: "" }})
      } else {
        return window
      }
    })
  default:
    return state
  }
}
