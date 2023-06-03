"use strict";

require("dotenv").config();
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3001;

// socket server singleton
const server = new Server();

// create a namespace

// create / allow for connections to the caps namespace
server.on("connection", (socket) => {
  // confirmation that a client is connected
  console.log("connected to the game namespace", socket.id);

  socket.on("join", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined the ${room} room`);
  });

  // any event emitted is read by onAny
  socket.onAny((event, payload) => {
    let timestamp = new Date();
    // will log everything as required by lab
    console.log("EVENT", event, timestamp, payload);
  });

  // listens for and relays pickup event
  socket.on("PLAYER MOVE", (payload) => {
    socket.broadcast.emit("UPDATE PLAYER 2", payload);
  });
});

console.log("listening on PORT:", PORT);
server.listen(PORT);
