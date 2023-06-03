const { io } = require("socket.io-client");
const socket = io("https://simon-clicks.onrender.com:10000");

module.exports = socket;
