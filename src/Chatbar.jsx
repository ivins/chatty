import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const onSubmit = evt => {
      evt.preventDefault();
      if (evt.keyCode === 13 && evt.target.name === 'message') {
        const newMessage = evt.target.value;
        const newMessageUser = evt.currentTarget.elements.user.value;
        this.props.newMessage(newMessageUser, newMessage);
        evt.target.value = '';
      } else if (evt.keyCode === 13 && evt.target.name === 'user') {
        const newMessageUser = evt.currentTarget.elements.user.value;
        const newMessage = `${this.props.user.name} changed their name to ${newMessageUser}`;
        this.props.newNotification(newMessageUser, newMessage);
        evt.target.value = '';
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