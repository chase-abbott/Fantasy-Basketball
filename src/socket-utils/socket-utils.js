import io from 'socket.io-client';
//pass down socket in app.js
const socket = io('https://fathomless-springs-43889.herokuapp.com/');

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
export function socketOnStart(callback) {
  socket.on('start', (user, interval, time) => callback(user, interval, time));
}