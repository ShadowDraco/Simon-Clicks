// create a socket connection when the browser loads
const socket = io();

//? Do functions with the web socket connection provided by the browser to the server
// * Its just like when we connect to the socket server from the terminal.
//* But this time We are updating the html instead of the blessed Boxes!! */
"use strict";
const position = {
  // position is equal to a number this time, then translate to percent when updating
  top: 20,
  left: 50,
};

// get the divs from the html
const player1 = document.getElementById("player1");
// set initial position
player1.style.top = `${position.top}%`;
player1.style.left = `${position.left}%`;
const player2 = document.getElementById("player2");


// Listen for all focus events in the document
document.addEventListener(
  "keydown",
  function (event) {
    let direction = "";
    if (event.keyCode === 37) {
      position.left--;
      direction = "left";
    } else if (event.keyCode === 38) {
      position.top--;
      direction = "up";
    } else if (event.keyCode === 39) {
      position.left++;
      direction = "right";
    } else if (event.keyCode === 40) {
      position.top++;
      direction = "down";
    }

    // offset because browser renders at different position then blessed
    player1.style.top = `${position.top}%`; //<-- offset by percent instead of pixels
    player1.style.left = `${position.left}%`;
    // on
    socket.emit("MOVE FROM BROWSER", {
      position: position, // for the browser support
      direction: direction, // for the terminal support
    });
  },
  true
);

// listen for the form submision event
  const input = document.getElementById("input");
  const messages = document.getElementById('messages');
  const form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
      event.preventDefault();


      const message = input.value.trim();

      if (message) {
        //emit chat message to server
        socket.emit("chat message", message);

        const item = document.createElement('li');
        item.textContent = message;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);

        input.value = "";
      }
    });

  socket.on('chat message', function(message) {
      const item = document.createElement('li');
      item.textContent = message;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
  });

socket.onAny((event, payload) => {
  console.log(event, payload);
});

// update my player 2 when the terminal moves
socket.on("UPDATE PLAYER 2", (payload) => {
  player2.style.top = payload.top * 2 + "%";
  player2.style.left = payload.left * 2 + "%"; // multiply because terminal is smaller
});

// update my player 2 when browser moves
socket.on("MOVE FROM BROWSER", (payload) => {
  player2.style.top = payload.position.top + "%"; // don't multiply because its already in browser support
  player2.style.left = payload.position.left + "%";
});


