const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: "http://localhost:5173"
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New connection: " + socket.id);

  socket.on("addNewUser", (userId) => {
    if(!onlineUsers.some(user => user.userId === userId)) { //check if user is already online
      onlineUsers.push({
        userId,
        socketId: socket.id,
      }); 
    }
  });

  console.log("onlineUsers", onlineUsers);

  io.emit("getOnlineUsers", onlineUsers);
});

io.listen(5000);