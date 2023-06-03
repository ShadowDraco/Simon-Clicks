"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
// integrate express and io
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// io server singleton
const io = new Server(server);
const PORT = process.env.PORT || 3001;

//? allow importing js files into html from THIS directory
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  //? Send THIS html file to the client
  res.sendFile(__dirname + "/index.html");
});

// create / allow for connections to the server
io.on("connection", (socket) => {
  // confirmation that a client is connected
  console.log("connected to the game namespace", socket.id);

  // any event emitted is read by onAny
  socket.onAny((event, payload) => {
    let timestamp = new Date().getMilliseconds();
    // will log everything as required by lab
    console.log(event, timestamp, payload);
  });

  socket.on("MOVE FROM BROWSER", (payload) => {
    socket.broadcast.emit("MOVE FROM BROWSER", payload);
  });

  // update my player 2
  socket.on("UPDATE MY PLAYER 2", (payload) => {
    socket.broadcast.emit("UPDATE MY PLAYER 2", payload);
  });

  // send HERES YOUR UPDATE BACK TO OTHER PLAYER
  socket.on("HERES YOUR UPDATE", (payload) => {
    socket.broadcast.emit("UPDATE PLAYER 2", payload);
  });

  // relay player movement
  socket.on("PLAYER MOVE", (payload) => {
    socket.broadcast.emit("UPDATE PLAYER 2", payload);
  });
  //When oponent asks for update
});

console.log("listening on PORT:", PORT);
server.listen(PORT);
