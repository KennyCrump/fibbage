import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4762");

function subscribeToTimer(interval, cb) {
  socket.on("timer", timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", interval);
}

function updateAnswers(data, cb) {
    socket.on('answer', cb(null, data))
    socket.emit('answer', data)
}
export { subscribeToTimer, updateAnswers };
