import io from 'socket.io-client';
// const SOCKET_URL = 'http://localhost:3000/';
// socket
const SOCKET_URL = 'https://fathomless-springs-43889.herokuapp.com/';

const socket = io(SOCKET_URL);

export function socketEmitLogin(user) {
  socket.emit('logged-in', user);
}

export function socketOnLogin(callback) {
  socket.on('logged-in', callback);
}

export function socketEmitChange(change, players) {
  socket.emit('state-change', change, players);
}

// // export function socketOnChange(callback) {
// //   socket.on('stateChange', change => callback(change));
// // }
// //
// export function socketOnChange(callback) {
//   socket.on('state-change', change => callback(change));
// }
//

// just pass in the callback! you don't need to wrap a callback in a callback

export function socketOnChange(callback) {
  socket.on('state-change', callback);
}
export function socketOnStart(callback) {
  socket.on('start', callback);
}
export function socketOnCurrentPlayer(callback) {
  socket.on('current-user', callback);
}
export function socketOnEndDraft(callback) {
  socket.on('end-draft', callback);
}

export function socketOnMessageIn(callback) {
  socket.on('chat-message', callback);
}

export function socketEmitMessage(message) {
  socket.emit('chat-message', (message));
}

