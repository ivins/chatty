import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const notification = (newUser) => {
      const newMessage = `${this.props.user.name} changed their name to ${newUser}`;
      this.props.newNotification(newUser, newMessage);
      this.props.updateUser(newUser);
    }
    
    const onSubmit = evt => {
      evt.preventDefault();
      const newMessageUser = evt.currentTarget.elements.user.value;
      if (evt.keyCode === 13 && evt.target.name === 'message') {
        const newMessage = evt.target.value;
        if (newMessageUser !== this.props.user.name) {
          notification(newMessageUser);
          evt.target.value = newMessageUser;
        }
        this.props.newMessage(newMessageUser, newMessage);
        evt.target.value = '';
      } else if (evt.keyCode === 13 && evt.target.name === 'user') {
        notification(newMessageUser);
        evt.target.value = newMessageUser;
      }
    }

    return (
      <footer>
        <form className="chatbar" onKeyUp={onSubmit}>
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user.name} name="user"/>
          <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER"/>
        </form>
      </footer>
    )
  }
}

export default Chatbar