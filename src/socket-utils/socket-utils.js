import io from 'socket.io-client';
const SOCKET_URL = 'http://localhost:3000/';
// const SOCKET_URL = 'https://fathomless-springs-43889.herokuapp.com/';
const socket = io(SOCKET_URL);
//
export function socketEmitLogin(user) {
  socket.emit('logged-in', user);
}

export function socketOnLogin(callback) {
  socket.on('logged-in', users => callback(users));
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
export function socketOnChange(callback) {
  socket.on('state-change', (players, draftedPlayers, userOneDrafted, userTwoDrafted, userThreeDrafted) => callback(players, draftedPlayers, userOneDrafted, userTwoDrafted, userThreeDrafted));
}
export function socketOnStart(callback) {
  socket.on('start', (user, draftTime, time) => callback(user, draftTime, time));
}
export function socketOnCurrentPlayer(callback) {
  socket.on('current-user', (user) => callback(user));
}
export function socketOnEndDraft(callback) {
  socket.on('end-draft', () => callback());
}


export function socketEmitMessage(message) {
  socket.emit('chat-message', (message));
}

export function socketOnMessageIn(callback) {
  socket.on('chat-message', (messages) => callback(messages));
}
