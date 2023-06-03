"use strict";

const socket = io();
// Listen for all focus events in the document
document.addEventListener(
  "keydown",
  function (event) {
    console.log(event.keyCode);
    if (event.keyCode === 37) {
      socket.emit("MOVE FROM BROWSER", "left");
    } else if (event.keyCode === 38) {
      socket.emit("MOVE FROM BROWSER", "up");
    } else if (event.keyCode === 39) {
      socket.emit("MOVE FROM BROWSER", "right");
    } else if (event.keyCode === 40) {
      socket.emit("MOVE FROM BROWSER", "down");
    }
  },
  true
);
