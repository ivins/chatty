import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageFeed from './MessageList.jsx';
import { generateRandomId } from './helpers'

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
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.setState({ loading: false })

    let socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    socket.onopen = () => {
      console.log('Connected to server');
    }
    //Receive any new messages from the server and add message to clients state.
    this.socket.onmessage = (event) => {
      const newServerMessage = JSON.parse(event.data);
      const messages = [...this.state.messages, newServerMessage];
      this.setState({messages: messages, currentUser: { name: newServerMessage.username }});
    }
  }

  addNewMessage(user, message) {
    //grab message and send to server
    const newMessage = { username: user, content: message };
    const toServer = JSON.stringify(newMessage);
    this.socket.send(toServer);
  }

  render() {
    if (this.state.loading) {
      return <h1>Page Loading...</h1>
    } else {
      return (
        <div>
        <Navbar />
        <main className="messages">
          <MessageFeed messages={this.state.messages} />
        </main>
        <Chatbar user={this.state.currentUser} newMessage={this.addNewMessage}/>
        </div>
      );
    }
  } 
}
export default App;
