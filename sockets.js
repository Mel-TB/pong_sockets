// track player count
let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");

  pongNamespace.on("connection", (socket) => {
    let roomId = "room ";
    let clientId = socket.id;

    console.log(`Client connected ${clientId}`);

    socket.on("ready", () => {
      roomId = roomId + Math.floor(readyPlayerCount / 2);
      socket.join(roomId);

      console.log(`Player ready ${clientId}, in ${roomId}`);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        //
        pongNamespace.to(roomId).emit("startGame", clientId);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(roomId).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(roomId).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${clientId} disconnected: ${reason}`);
      socket.leave(roomId);
    });
  });
}

module.exports = {
  listen,
};
