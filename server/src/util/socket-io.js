let io;
exports.socketConnection = (server) => {
  io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.join(socket.request._query.id);
    socket.on("inventory-modified", (msg) => {
      console.log(`\nBroadcast: ${msg}`);
      io.emit("inventory-modified", msg);
    });
  });
};

exports.sendMessage = (key, message) => io.emit(key, message);