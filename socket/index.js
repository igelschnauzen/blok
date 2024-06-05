const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: "http://localhost:5173"
});

io.on("connection", (socket) => {
  console.log("New connection: " + socket.id);
});

httpServer.listen(3000);