import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageFeed extends Component {
    render() {
        const messages = this.props.messages.map((message, index) => {
            return (<Message key={message.id} message={message} />);
        })
      return (
        <ul>{messages}</ul>
      )
    }
  }