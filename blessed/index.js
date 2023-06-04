const { io } = require("socket.io-client");
// ? Play from the terminal instead???
//const socket = io("https://simon-clicks.onrender.com");
//* Play from local host */
const socket = io("http://localhost:3001");

//* Socket functions */

socket.on("UPDATE PLAYER 2", (payload) => {
  movePlayer2(payload);
});

socket.on("UPDATE MY PLAYER 2", (payload) => {
  socket.emit("HERES YOUR UPDATE", { top: player1.top, left: player1.left });
});

// receive the update
socket.on("HERES YOUR UPDATE", (payload) => {
  movePlayer2({ top: position.top, left: position.left });
});

socket.on("MOVE FROM BROWSER", (payload) => {
  //? Move player 2 in the direction name from browser
  movePlayer(screen, player2, payload.direction);
});

// update other player
const emitPlayerMove = (position) => {
  socket.emit("PLAYER MOVE", { top: position.top, left: position.left });
};
// update my player 2
const emitOponentMove = () => {
  socket.emit("UPDATE MY PLAYER 2", {});
};

//* Player functions */

const movePlayer = require("./movePlayers");
// Player2 is RED for both players
const movePlayer2 = (position) => {
  player2.top = position.top;
  player2.left = position.left;
};

//* CREATE BLESSED SCREEN 1 PER TERMINAL */

const blessed = require("blessed");

// Create the Blessed screen
const screen = blessed.screen({
  smartCSR: true,
  title: "Simon-Clicks",
  cursor: {
    artificial: true,
    shape: "line",
    blink: true,
    color: null,
  },
});

const GameArea = blessed.box({
  parent: screen,
  top: "center",
  left: "center",
  width: "100%-3",
  height: "100%-3",
  border: { type: "line" },
  style: { border: { fg: "cyan" } },
});

// Create a box that is tracked as player 1
const player1 = blessed.box({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  parent: screen,
  width: "5%",
  height: "20%",
  style: {
    bg: "blue",
  },
  content: "p 1",
});

// Create a box that is tracked by the other player
const player2 = blessed.box({
  parent: screen,
  width: "5%",
  height: "20%",
  style: {
    bg: "red",
  },
  content: "p 2",
});

// MOVE PLAYER 1
screen.key(["up", "down", "left", "right"], function (ch, key) {
  const { name } = key;
  //? Move player 1 in the direction name
  movePlayer(screen, player1, name);
  //* Notify the server a player moved */
  emitPlayerMove({ top: player1.top, left: player1.left });
});

// Start the Blessed screen

screen.render();
screen.key(["escape", "q", "C-c"], function () {
  process.exit(0);
});

// On start update positions because they are random!
// tell other player MY position
emitPlayerMove({ top: player1.top, left: player1.left });
// Ask other player to give me theirs
emitOponentMove();
