import { TOGGLE_LIST } from '../actions/show'

export default function show(state = false, action) {
  switch(action.type) {
  case TOGGLE_LIST:
    return !state
  default:
    return state
  }
}
