const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const rooms = {};

function hasEnoughPlayers(roomId) {
  const room = rooms[roomId];
  return room && room.length == 2;
}

io.on("connection", (socket) => {
  console.log("A user connected.");

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    rooms[roomId].push(socket.id);

    if (hasEnoughPlayers(roomId)) {
      io.to(roomId).emit("gameStart");
    }
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);

    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter(
        (playerId) => playerId !== socket.id
      );

      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }
    }

    io.to(roomId).emit("opponentLeft");
  });

  socket.on("playerHand", (data, roomId) => {
    io.to(roomId).emit("opponentHand", data);
  });

  socket.on("createRoom", (roomId) => {
    socket.broadcast.emit("createRoom", roomId);
  });

  socket.on("getAvailableRooms", () => {
    const availableRoomId = Object.keys(rooms).find((roomId) => {
      return roomId.startsWith("CL") && rooms[roomId].length === 1;
    });

    socket.emit("availableRooms", availableRoomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.");

    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter(
        (playerId) => playerId !== socket.id
      );

      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }
    }
  });
});

const port = 3000;
http.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
