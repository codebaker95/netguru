import { SET_QUERY } from '../actions/query'

export default function query(state = "", action) {
  switch(action.type) {
  case SET_QUERY:
    return action.query
  default:
    return state
  }
}
