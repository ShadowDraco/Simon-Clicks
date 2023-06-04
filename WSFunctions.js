//? Do functions with the web socket connection provided by the browser to the server
// * Its just like when we connect to the socket server from the terminal.
//* But this time We are updating the html instead of the blessed Boxes!! */
"use strict";
const position = {
  // position is equal to a number this time, then translate to percent when updating
  top: 20,
  left: 50,
};
const player1 = document.getElementById("player1");
// set initial position
player1.style.top = `${position.top}%`;
player1.style.left = `${position.left}%`;
const player2 = document.getElementById("player2");
const socket = io();
// Listen for all focus events in the document
document.addEventListener(
  "keydown",
  function (event) {
    if (event.keyCode === 37) {
      socket.emit("MOVE FROM BROWSER", "left");
      position.left--;
    } else if (event.keyCode === 38) {
      socket.emit("MOVE FROM BROWSER", "up");
      position.top--;
    } else if (event.keyCode === 39) {
      socket.emit("MOVE FROM BROWSER", "right");
      position.left++;
    } else if (event.keyCode === 40) {
      socket.emit("MOVE FROM BROWSER", "down");
      position.top++;
    }

    // offset because browser renders at different position then blessed
    player1.style.top = `${position.top}%`; //<-- offset by percent instead of pixels
    player1.style.left = `${position.left}%`;
  },
  true
);

socket.on("UPDATE PLAYER 2", (payload) => {
  player2.style.top = payload.top * 2 + "%";
  player2.style.left = payload.left * 2 + "%";
});
