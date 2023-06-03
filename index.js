"use strict";

require("dotenv").config();
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3001;

// socket server singleton
const server = new Server();

// create / allow for connections to the server
server.on("connection", (socket) => {
  // confirmation that a client is connected
  console.log("connected to the game namespace", socket.id);

  // any event emitted is read by onAny
  socket.onAny((event, payload) => {
    let timestamp = new Date().getMilliseconds();
    // will log everything as required by lab
    console.log(event, timestamp, payload);
  });

  // relay player movement
  socket.on("PLAYER MOVE", (payload) => {
    socket.broadcast.emit("UPDATE PLAYER 2", payload);
  });
});

console.log("listening on PORT:", PORT);
server.listen(PORT);
