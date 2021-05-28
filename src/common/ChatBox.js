import { Component } from 'react';
import './ChatBox.css';
import { socketEmitMessage, socketOnMessageIn } from '../socket-utils/socket-utils.js';

export default class ChatBox extends Component {
 state = {
   messageOut: '',
   messages: [],
   user: localStorage.getItem('USER_NAME')
 }
 componentDidMount() {
   socketOnMessageIn((messages) => {
     this.setState({ messages }); 
   });

 }
 handleChat = e => {
   this.setState({ messageOut: e.target.value });
 }

handleSubmit = e => {
  const { messageOut, user } = this.state;
  const message = `${user}: ${messageOut}`;
  e.preventDefault();
  socketEmitMessage(message);
  this.setState({ messageOut: '' });
}

render() {
  const { messages, messageOut } = this.state;

  return (
    <div className="chat-container">
      <ul className="ChatBox">
        {messages.slice(-23).map((message, index) => {
          return <li key={index} className="my-message">{message}</li>;
        })}
      </ul>
      <form onSubmit={this.handleSubmit}>
        <input value={messageOut} onChange={this.handleChat} id="input" /><button>Send</button>
      </form>
    </div>
  );
}

}