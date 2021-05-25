import io from 'socket.io-client';
//pass down socket in app.js
const socket = io('http://localhost:3000/');

export function socketLogIn(user) {
  socket.emit('logged-in', user);
}
export function socketOtherLogIn(callback) {
  socket.on('logged-in', users => callback(users));
}

export function socketEmitChange(change) {
  socket.emit('stateChange', change);
}

// export function socketOnChange(callback) {
//   socket.on('stateChange', change => callback(change));
// }

export function socketOnChange(callback) {
  socket.on('stateChange', (draftedPlayers, userOneDrafted, userTwoDrafted, userThreeDrafted) => callback(draftedPlayers, userOneDrafted, userTwoDrafted, userThreeDrafted));
}