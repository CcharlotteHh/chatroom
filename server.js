const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname,'public')));

const botName = 'Chat Admin';

//Run when client connects
io.on('connection' , socket =>{
    console.log ('New WS connection...');

    //we
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    //broadcast when user connects
    socket.broadcast.emit('message', formatMessage(botName,'a user had joined the chat'));
    //run when user disconnects

    socket.on('disconnect',() =>{
        io.emit('message', formatMessage(botName,'user had left the chat'));
    });

    //listen for chat message

    socket.on('chatMessage', (msg)=>{
        io.emit('message', formatMessage('USER',msg));
        
    })



});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));