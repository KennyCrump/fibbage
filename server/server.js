require("dotenv").config();
const express = require("express");
const socket = require("socket.io");
const massive = require("massive");
const session = require('express-session')
const axios = require("axios");
const app = express();
const { SERVER_PORT, SESSION_SECRET } = process.env;

const ctrl = require('./controller')

app.use(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// massive(CONNECTION_STRING).then((db) => {
//     app.set('db', db)
// })
const server = app.listen(SERVER_PORT, () => {
  console.log(`server running on port ${SERVER_PORT}`);
});

const io = socket(server);

app.get('/api/session', ctrl.getSession)
app.post('/api/session', ctrl.createSession)

io.on("connection", socket => {
  // console.log("hello");
  socket.on("create room", data => {
    console.log(data.room);
    socket.join(data.room);
    io.to(data.room).emit("room created", data.room);
  });

  socket.on("joined game", data => {
    // console.log('socket: ', io.sockets.clients)
    console.log(data.name, "has joined the game");
    io.to(data.room).emit("player joined", data.name)
  });

  socket.on('start game', data => {
    io.to(data.room).emit('the game is starting')
  })


});
