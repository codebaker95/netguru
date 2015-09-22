import { Component, PropTypes } from 'react'
import { Spring } from 'react-motion'

class UsersList extends Component {
  static propTypes = {
    users: PropTypes.array
  }

  static defaultProps = {
    users: []
  }

  handleChange = (event) => {
    this.props.onSearch(event.target.value)
  }

  handleToggle = () => {
    this.props.onToggle()
  }

  handleUserClick = (n) => () => {
    if (this.props.users.filter(user => user.id == n)[0].active || this.props.active <= 4) {
      this.props.onUserClick(n)
    }
  }

  render = () => (
    <Spring endValue={{ val: this.props.show ? 0 : -240 }}>
      {bottom =>
        <div className="users-list" style={{bottom: `${bottom.val}px`}}>
          <div className="users-list-header" onClick={this.handleToggle}>Chat</div>
          <div className="users">
            { this.props.users.map(user => (
              <div
                className={`user-item${user.active ? " active" : ""}`}
                onClick={this.handleUserClick(user.id)}>
                <div className="user-username">{user.username}</div>
                {(user.online ? <div className="online" /> : "")}
                {user.unread > 0 ? <div className="unread">{user.unread}</div> : ""}
              </div>
            ))}
          </div>
          <input type="text" value={this.props.query} onChange={this.handleChange} placeholder="Search"/>
        </div>
      }
    </Spring>
  )
}

export default UsersList
