import { Component } from 'react'
import UsersList from './users-list'
import MessageWindow from './message-window'

class Chat extends Component {
  componentDidMount = () => {
    this.props.fetchUsers()
  }

  sendMessage = (user_id, message) => {
    this.props.chatter.send(user_id, message)
    this.props.sendMessage(user_id, message)
  }

  readMessages = (user_id) => {
    this.props.chatter.read(user_id)
    this.props.readMessages(user_id)
  }

  fetchMessages = (user_id) => {
    this.props.fetchMessages(user_id)
  }

  render = () => (
    <div>
      <UsersList
        {...this.props.usersList}
        onSearch={this.props.setQuery}
        onToggle={this.props.toggleList}
        onUserClick={this.props.toggleMessageWindow} />
      {this.props.messageWindows.map((window, i) =>
        <MessageWindow
          {...window}
          index={i}
          onInputChange={this.props.setInput}
          onSubmit={this.sendMessage}
          readMessages = {this.readMessages}
          fetchMessages = {this.fetchMessages} />
      )}
    </div>
  )
}

export default Chat
