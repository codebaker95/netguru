export const SET_USERS = "SET_USERS"
export const FETCH_USERS = "FETCH_USERS"
export const SET_STATUS = "SET_STATUS"
export const READ_MESSAGES = "READ_MESSAGES"

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  }
}

export function fetchUsers() {
  return (dispatch) => {
    $.getJSON("/users").done(data => {
      dispatch(setUsers(data))
    })
  }
}

export function setStatus(user_id, status) {
  return {
    type: SET_STATUS,
    user_id,
    status
  }
}

export function readMessages(user_id) {
  return {
    type: READ_MESSAGES,
    user_id,
    status
  }
}
