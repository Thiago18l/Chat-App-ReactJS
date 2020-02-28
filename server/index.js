const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000;

const router = require('./router'); // Importando a rota...
// 
const App = express();
const server = http.createServer(App);
const io = socketio(server);
App.use(router);

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });

    socket.on('sendMessage', (message, callback)=> {    
        const user = getUser(socket.id);
        
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();

    });
    
    socket.on('disconnect', () => { // sem parametro na função por que o usuário vai sair.
        console.log('User had left');
    })
})




server.listen(PORT, () => {
    console.log(`Server has Started on Port ${PORT}`);
});


