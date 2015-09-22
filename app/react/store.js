import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

let finalCreateStore = null

if(__DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools')
  finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = applyMiddleware(thunk)(createStore)
}

export default finalCreateStore(reducer)
