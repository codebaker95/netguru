export const TOGGLE_MESSAGE_WINDOW = "TOGGLE_MESSAGE_WINDOW"
export const SET_INPUT = "SET_INPUT"

export function toggleMessageWindow(user_id) {
  return {
    type: TOGGLE_MESSAGE_WINDOW,
    user_id
  }
}

export function setInput(user_id, input) {
  return {
    type: SET_INPUT,
    user_id,
    input
  }
}
