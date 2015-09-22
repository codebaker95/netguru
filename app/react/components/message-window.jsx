import { Component, PropTypes } from 'react'

class MessageWindow extends Component {
  componentDidMount = () => {
    this.props.fetchMessages(this.props.id)
    this.props.readMessages(this.props.id)
    this.scrollDown()
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps.messages.filter(message => !message.mine).length
      != this.props.messages.filter(message => !message.mine).length) {
      this.props.readMessages(this.props.id)
    }
  }

  componentDidUpdate = (oldProps) => {
    if (oldProps.messages.length != this.props.messages.length) {
      this.scrollDown()
    }
  }

  handleInputChange = (e) => {
    this.props.onInputChange(this.props.id, e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.input === "") return
    this.props.onSubmit(this.props.id, this.props.input)
  }

  scrollDown = () => {
    let div = $("#messages-"+this.props.id)
    div.scrollTop(div[0].scrollHeight)
  }

  formatDate = (date) => {
    const pad = n => n < 10 ? "0"+n : n
    let day = pad(date.getDate())
    let month = pad(date.getMonth())
    let year = date.getFullYear()
    let hours = pad(date.getHours())
    let minutes = pad(date.getMinutes())
    let seconds = pad(date.getSeconds())
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
  }

  render = () => (
    <div className="message-window" style={{left: (this.props.index+1)*220 + 100}}>
      <div className="message-window-header">{this.props.user.username}</div>
      <div className="messages" id={`messages-${this.props.id}`}>
        {this.props.messages.map(message => (
          <div className={`message${message.mine ? " mine" : ""}`}>
            <div className="message-content">{message.body}</div>
            <div className="message-time">{this.formatDate(message.time)}</div>
          </div>
        ))}
      </div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your message" value={this.props.input} onChange={this.handleInputChange} />
      </form>
    </div>
  )
}

export default MessageWindow
