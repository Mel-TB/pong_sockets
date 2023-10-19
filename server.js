const { createServer } = require("http");
const { Server } = require("socket.io");

const apiServer = require("./api");
const httpServer = createServer(apiServer);
const socketServer = new Server(httpServer, {
  cors: true,
});

const sockets = require("./sockets");
const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

sockets.listen(socketServer);
