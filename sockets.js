// track player count
let readyPlayerCount = 0;

function listen(io) {
  io.on("connection", (socket) => {
    let clientId = socket.id;
    console.log(`Client connected ${clientId}`);

    socket.on("ready", () => {
      console.log(`Player ready ${clientId}`);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        io.emit("startGame", clientId);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${clientId} disconnected: ${reason}`);
    });
  });
}

module.exports = {
  listen,
};
