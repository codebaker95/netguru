window.React = require('react')
import { Provider } from 'react-redux'
import Chat from './container'
import store from './store'
import chatter from './chatter'

let containerRender = null

if(__DEVTOOLS__) {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
  containerRender = (
    <div>
      <Provider store={store}>
        {() => <Chat chatter={chatter} />}
      </Provider>
      <DebugPanel top right bottom key="debugPanel">
        <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
      </DebugPanel>
    </div>
  )
} else {
  containerRender = (
    <Provider store={store}>
      {() => <Chat chatter={chatter} />}
    </Provider>
  )
}

class ChatContainer extends React.Component {
  render = () => containerRender
}

$(document).on("ready page:load", () => {
  $('.datepicker').datepicker({
    format: "dd MM yyyy",
    clearBtn: true
  })
  $('.datepicker').on('focus', () =>
    $('div.datepicker').css('top', parseInt($('div.datepicker').css('top')) + 55)
  )
  $('#datatables').DataTable()
  let element = $('#chat-container')[0];
  if(element) {
    component = React.render(<ChatContainer />, element)
  }
})

$(document).on("page:before-unload", () => {
  let element = $('#chat-container')[0];
  if(element) {
    React.unmountComponentAtNode(element)
  }
})
