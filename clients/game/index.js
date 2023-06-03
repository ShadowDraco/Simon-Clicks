//? import socket
const io = require("socket.io-client");
const socket = io("http://localhost:3001");

//?turn queue to store clicked box ids
const turnQueue = [];

//server-side code
socket.on("connection", (client) => {
  console.log("New client connected:", client.id);
});

// ? on playerclick - get the box that was clicked and store in the turn queue (handles player clicks)
client.on("playedClick", (boxId) => {
  turnQueue.pus({playerId: client.id, boxId});
});
//broadcast toplayers to update them
client.broadcast.emit('updatePlayer', { player: client.id, position: boxId });

//handle disconnects
client.on('disconnect', () =>
)
