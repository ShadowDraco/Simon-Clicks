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
  // socket.emit('PLAYER MOVE', { my position })
}
module.exports = movePlayer;
