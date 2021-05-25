import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

export function socketLogIn(user) {
  socket.emit('logged-in', user);
}

export function socketEmitChange(change) {
  socket.emit('stateChange', change);
}

export function socketOnChange(callback) {
  socket.on('stateChange', change => callback(change));
}