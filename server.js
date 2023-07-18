const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (res) => {
  res.sendFile(__dirname + "/public/index.html");
});

var rooms = {};

var privateRooms = {};

function hasEnoughPlayers(roomId) {
  const room = rooms[roomId];
  return room && room.length == 2;
}

function askForPrivateRoom(roomId) {
  return privateRooms[roomId];
}

io.on("connection", (socket) => {
  console.log("A user connected.");

  socket.on("askForPrivateRoom", (roomId) => {
    socket.emit("answerForPrivateRoom", askForPrivateRoom(roomId));
  });

  socket.on("joinRoom", (roomId, status) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    if (status) {
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      if (!rooms[roomId].includes(socket.id)) {
        rooms[roomId].push(socket.id);
      }

      console.log(rooms);
    } else {
      if (!privateRooms[roomId]) {
        privateRooms[roomId] = [];
      }

      if (!privateRooms[roomId].includes(socket.id)) {
        privateRooms[roomId].push(socket.id);
      }

      console.log(privateRooms);
    }

    if (hasEnoughPlayers(roomId)) {
      io.to(roomId).emit("gameStart");
    }
  });

  socket.on("leaveRoom", (roomId, status) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);

    if (status) {
      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      } else {
        rooms[roomId] = rooms[roomId].filter(
          (playerId) => playerId !== socket.id
        );
        if (rooms[roomId].length === 0) {
          delete rooms[roomId];
        }
      }
    } else {
      if (privateRooms[roomId].length === 0) {
        delete privateRooms[roomId];
      } else {
        privateRooms[roomId] = privateRooms[roomId].filter(
          (playerId) => playerId !== socket.id
        );
        if (privateRooms[roomId].length === 0) {
          delete privateRooms[roomId];
        }
      }
    }

    console.log(rooms);
    console.log(privateRooms);

    io.to(roomId).emit("opponentLeft");
  });

  socket.on("playerHand", (data, roomId) => {
    value = [socket.id, data];
    io.to(roomId).emit("opponentHand", value);
  });

  socket.on("getAvailableRoomsForClassic", () => {
    const availableRoomId = Object.keys(rooms).find(
      (roomId) => rooms[roomId].length === 1 && roomId.startsWith("CL")
    );
    socket.emit("availableRoomsForClassic", availableRoomId);
  });

  socket.on("getAvailableRoomsForPrivate", () => {
    const availableRoomId = Object.keys(rooms).find(
      (roomId) => rooms[roomId].length === 1 && roomId.length === 10
    );
    socket.emit("availableRoomsForPrivate", availableRoomId);
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
