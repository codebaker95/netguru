export const SEND_MESSAGE = "SEND_MESSAGE"
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
export const SET_MESSAGES = "SET_MESSAGES"

export function sendMessage(user_id, message) {
  return {
    type: SEND_MESSAGE,
    user_id,
    message,
    time: Date.now()
  }
}

export function receiveMessage(user_id, message, time) {
  return {
    type: RECEIVE_MESSAGE,
    user_id,
    message,
    time
  }
}

export function setMessages(user_id, messages) {
  return {
    type: SET_MESSAGES,
    user_id,
    messages
  }
}

export function fetchMessages(user_id) {
  return (dispatch) => {
    $.getJSON(`/users/${user_id}/messages`).done(data => {
      data.forEach(message => message.time = new Date(message.time))
      dispatch(setMessages(user_id, data))
    })
  }
}
