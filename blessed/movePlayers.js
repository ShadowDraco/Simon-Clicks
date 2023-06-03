"use strict";

//? Pass screen to render, box to move, and direction
function movePlayer(screen, box, direction) {
  switch (direction) {
    case "up":
      box.top--;
      break;
    case "down":
      box.top++;
      break;
    case "left":
      box.left--;
      break;
    case "right":
      box.left++;
      break;
  }
  screen.render();
}
module.exports = movePlayer;
