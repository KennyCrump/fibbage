require("dotenv").config();
const express = require("express");
const socket = require("socket.io");
const massive = require("massive");
// const session = require('express-session')
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

io.on("connection", client => {
  client.on("subscribeToTimer", interval => {
    console.log("client is subscribed with interval", interval, client.id);
    setInterval(() => {
      client.emit("timer", new Date())
    }, interval);
  });
});
