const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credential: true,
  },
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// track player count
let readyPlayerCount = 0;

io.on("connection", (socket) => {
  let clientId = socket.id;
  console.log(`Client connected ${clientId}`);

  socket.on("ready", () => {
    console.log(`Player ready ${clientId}`);

    readyPlayerCount++;

    if (readyPlayerCount === 2) {
      io.emit("startGame", clientId);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });
});
