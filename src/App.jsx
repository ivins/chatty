import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageFeed from './MessageList.jsx';

// Main navbar -- displays connected users count.
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-usercount">{this.props.users} users online</span>
      </nav>
    )
  }
}

// Main application
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      currentUser: {
        name: 'Anonymous',
        color: this.randomColor()
      }, 
      messages: [],
      connections: 1
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewNotification = this.addNewNotification.bind(this);
    this.randomColor = this.randomColor.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.setState({ loading: false })
    // Once App is rendered the connection is made to server.
    let socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    socket.onopen = () => {
      console.log('Connected to server');
    } 
    //Receive any new messages from the server and add message to clients state. Size below refers to # of clients.
    this.socket.onmessage = (event) => {
      const newServerMessage = JSON.parse(event.data);
      if (newServerMessage.size) {
        this.setState({connections: newServerMessage.size})
      } else {
        const messages = [...this.state.messages, newServerMessage];
        this.setState({messages: messages});
      }
    }
  }

  // Updates username
  updateUser(user) {
    this.setState({currentUser: { name: user, color: this.state.currentUser.color }});
  }

  //Selects random color for user. Called in state.
  randomColor() {
    const colors = ['#791E94','#407899','#41D3BD','#8EA604'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  //Sends new message submission to server along with users color.
  addNewMessage(user, message) {
    const newMessage = { username: user, color: this.state.currentUser.color, content: message, type: 'message' };
    const toServer = JSON.stringify(newMessage);
    this.socket.send(toServer);
  }

  //Sends new notification submission to server along with users color.
  addNewNotification(user, message) {
    const newNotification = { username: user, color: this.state.currentUser.color, content: message, type: 'notification' };
    const toServer = JSON.stringify(newNotification);
    this.socket.send(toServer);
  }

  render() {
    if (this.state.loading) {
      return <h1>Page Loading...</h1>
    } else {
      return (
        <div>
        <Navbar users={this.state.connections}/>
        <main className="messages">
          <MessageFeed messages={this.state.messages} />
        </main>
        <Chatbar user={this.state.currentUser} newMessage={this.addNewMessage} newNotification={this.addNewNotification} updateUser={this.updateUser} />
        </div>
      );
    }
  } 
}
export default App;
