require("dotenv").config();
const express = require("express");
const socket = require("socket.io");
const massive = require("massive");
const session = require('express-session')
const axios = require("axios");
const app = express();
const { SERVER_PORT } = process.env;

app.use(express.json());

// massive(CONNECTION_STRING).then((db) => {
//     app.set('db', db)
// })
const server = app.listen(SERVER_PORT, () => {
  console.log(`server running on port ${SERVER_PORT}`);
});

const io = socket(server);

io.on("connection", socket => {
  console.log("hello");
  socket.on("create room", data => {
    console.log(data.room);
    socket.join(data.room);
    io.to(data.room).emit("room created", data.room);
  });

  socket.on("joined game", data => {
    console.log(data.name, "has joined the game");
    io.to(data.room).emit("player joined", data.name)
  });


});
