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
    // setTimeout(() => {
    //   console.log('Simulating incoming message');
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const messages = [...this.state.messages, newMessage];
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

    let socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    socket.onopen = () => {
      console.log('Connected to server');
    }
  }

  addNewMessage(user, message) {
    const newMessage = { id: generateRandomId(), username: user, content: message };
    const messages = [...this.state.messages, newMessage];
    this.setState({messages: messages, currentUser: { name: newMessage.username }});
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
