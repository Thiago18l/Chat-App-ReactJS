const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router'); // Importando a rota...
// 
const App = express();
const server = http.createServer(App);
const io = socketio(server);


io.on('connection', (socket) => {
    console.log('New connection');
    
    socket.on('disconnect', () => { // sem parametro na função por que o usuário vai sair.
        console.log('User had left');
    })
})

App.use(router);


server.listen(PORT), () => {
    console.log(`Server has Started on Port ${PORT}`);
};


