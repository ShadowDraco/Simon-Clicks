const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");

const emitPlayerMove = (position) => {
  socket.emit("PLAYER MOVE", position);
};

// Player2 is RED for both players
const movePlayer2 = (position) => {
  player2.top = position.top;
  player2.left = position.left;
};

socket.on("UPDATE PLAYER 2", (payload) => {
  movePlayer2(payload);
});

const blessed = require("blessed");

//?
//!
//TODO
// *

const movePlayer = require("./moveBox");
// Create the Blessed screen
const screen = blessed.screen({
  smartCSR: true,
  title: "Terminal Interaction",
  cursor: {
    artificial: true,
    shape: "line",
    blink: true,
    color: null,
  },
});
// Create a box element
const player1 = blessed.box({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  parent: screen,
  width: "5%",
  height: "15%",
  style: {
    bg: "blue",
  },
  content: "player 1",
});

const player2 = blessed.box({
  parent: screen,
  width: "5%",
  height: "15%",
  style: {
    bg: "red",
  },
  content: "player 2",
});

// Handle keyboard events
screen.key(["up", "down", "left", "right"], function (ch, key) {
  const { name } = key;
  movePlayer(screen, player1, name);
  emitPlayerMove({ top: player1.top, left: player1.left });
});

// test player2 movement
screen.key("enter", function (ch, key) {
  movePlayer2({
    top: `${Math.random() * 10}%`,
    left: `${Math.random() * 10}%`,
  });
});

// Start the Blessed screen
screen.render();
screen.key(["escape", "q", "C-c"], function () {
  process.exit(0);
});

// On start update positions because they are random!
emitPlayerMove({ top: player1.top, left: player1.left });
