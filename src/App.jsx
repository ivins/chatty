import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageFeed from './MessageList.jsx';
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
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      messages: {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 234544,
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 456788,
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <h1>Page Loading...</h1>
    } else {
      return (
        <div>
        <Navbar />
        <main className="messages">
          <MessageFeed messages={this.state.messages.messages} />
        </main>
        <Chatbar user={this.state.messages.currentUser} />
        </div>
      );
    }
  } 
}
export default App;
