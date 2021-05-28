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
  const message = {
    message:`${user}: ${messageOut}`,
    userId: window.localStorage.getItem('USER_ID')
  };
  e.preventDefault();
  socketEmitMessage(message);
  this.setState({ messageOut: '' });
}

render() {
  const { messages, messageOut } = this.state;

  return (
    <div>
      <ul className="ChatBox">
        {messages.map((message, index) => {
          return (!(message === messageOut)
            ? <li key={index} className="my-message">{message}</li>
            : <li key={index} className="incoming-message">{message}</li>);
        })}
      </ul>
      <form onSubmit={this.handleSubmit}>
        <input value={messageOut} onChange={this.handleChat} id="input" /><button>Send</button>
      </form>
    </div>
  );
}

}