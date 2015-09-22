import store from './store'
import { setStatus } from './actions/users'
import { receiveMessage } from './actions/messages'

const onmessage = (id, message, time) => {
  store.dispatch(receiveMessage(id, message, time))
}

const onconnection = (id, status) => {
  store.dispatch(setStatus(id, status))
}

const chatter = new WsChatter(onmessage, onconnection)

export default chatter
