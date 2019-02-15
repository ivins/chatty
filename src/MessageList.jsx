import React, {Component} from 'react';
import Message from './Message.jsx';

// Message List Component- creates a message component for each message in the messages array.
export default class MessageFeed extends Component {
    render() {
        const messages = this.props.messages.map((message) => {
            return (<Message key={message.id} message={message} />);
        })
      return (
        <ul>{messages}</ul>
      )
    }
  }