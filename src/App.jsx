import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageFeed from './MessageList.jsx';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      currentUser: {
        name: 'Anonymous',
        color: this.randomColor()
      }, // optional.
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

    let socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    socket.onopen = () => {
      console.log('Connected to server');
    } 
    //Receive any new messages from the server and add message to clients state.
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

  updateUser(user) {
    this.setState({currentUser: { name: user, color: this.state.currentUser.color }});
  }

  randomColor() {
    const colors = ['#791E94','#407899','#41D3BD','#8EA604'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  addNewMessage(user, message) {
    //grab message and send to server
    const newMessage = { username: user, color: this.state.currentUser.color, content: message, type: 'message' };
    const toServer = JSON.stringify(newMessage);
    this.socket.send(toServer);
  }

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
