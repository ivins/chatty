import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageFeed from './MessageList.jsx';
import Message from './Message.jsx';
import messages from './MessageDB.json'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
      <Navbar />
      <main className="messages">
        <Message />
        <MessageFeed />
      </main>
      <Chatbar />
      </div>
    );
  }
}
export default App;
