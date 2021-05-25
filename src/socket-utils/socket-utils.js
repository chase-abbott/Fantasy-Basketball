import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

export function socketLogIn(user) {
  socket.emit('logged in', user);
}