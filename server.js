const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("src"));

app.get("/", (res) => {
  res.sendFile(__dirname + "/src/index.html");
});

var userCounter = 0;

var rooms = {};

var privateRooms = {};

function hasEnoughPlayers(roomId, status) {
  if (status) {
    return rooms[roomId].length === 2;
  } else {
    return privateRooms[roomId].length === 2;
  }
}

function askForPrivateRoom(roomId) {
  return privateRooms[roomId];
}

io.on("connection", (socket) => {
  console.log("A user connected.");
  userCounter++;
  console.log(`Number of users: ${userCounter}`);

  socket.on("askForPrivateRoom", (roomId) => {
    const value = [roomId, askForPrivateRoom(roomId)];
    socket.emit("answerForPrivateRoom", value);
  });

  socket.on("joinRoom", (roomId, status) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    if (status) {
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      if (!rooms[roomId].some((arr) => arr.includes(socket.id))) {
        rooms[roomId].push([socket.id]);
      }
    } else {
      if (!privateRooms[roomId]) {
        privateRooms[roomId] = [];
      }

      if (!privateRooms[roomId].includes([socket.id])) {
        privateRooms[roomId].push([socket.id]);
      }
    }
    if (hasEnoughPlayers(roomId, status)) {
      io.to(roomId).emit("gameStart");
    }
  });

  socket.on("leaveRoom", (roomId, status) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
    userCounter--;
    console.log(`Number of users: ${userCounter}`);

    if (status) {
      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      } else {
        rooms[roomId] = rooms[roomId].filter(
          (playerId) => playerId[0] !== socket.id
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
          (playerId) => playerId[0] !== socket.id
        );
        if (privateRooms[roomId].length === 0) {
          delete privateRooms[roomId];
        }
      }
    }
    io.to(roomId).emit("opponentLeft");
  });

  socket.on("playerHand", (data, roomId, status) => {
    if (status) {
      if (rooms[roomId][0][0] === socket.id) {
        rooms[roomId][0].push(data);
      } else {
        rooms[roomId][1].push(data);
      }
      if (rooms[roomId][0].length === 2 && rooms[roomId][1].length === 2) {
        io.to(roomId).emit("opponentHand", rooms[roomId]);
        rooms[roomId][0].pop();
        rooms[roomId][1].pop();
      }
    } else {
      if (privateRooms[roomId][0][0] === socket.id) {
        privateRooms[roomId][0].push(data);
      } else {
        privateRooms[roomId][1].push(data);
      }
      if (
        privateRooms[roomId][0].length === 2 &&
        privateRooms[roomId][1].length === 2
      ) {
        io.to(roomId).emit("opponentHand", privateRooms[roomId]);
        privateRooms[roomId][0].pop();
        privateRooms[roomId][1].pop();
      }
    }
  });

  socket.on("getAvailableRooms", (gamemode, number) => {
    socket.emit(
      "availableRooms",
      Object.keys(rooms).find(
        (roomId) =>
          rooms[roomId].length === 1 &&
          roomId.startsWith(
            number !== null
              ? gamemode + String(number).padStart(2, "0")
              : gamemode
          )
      )
    );
  });

  socket.on("getAvailableRoomsForPrivate", () => {
    const availableRoomId = Object.keys(privateRooms).find(
      (roomId) => privateRooms[roomId].length === 1 && roomId.length === 10
    );
    socket.emit("availableRoomsForPrivate", availableRoomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.");
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter(
        (playerId) => playerId[0] !== socket.id
      );

      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      } else if (rooms[roomId].length === 1) {
        io.to(roomId).emit("opponentLeft");
      }
    }
    for (const roomId in privateRooms) {
      privateRooms[roomId] = privateRooms[roomId].filter(
        (playerId) => playerId[0] !== socket.id
      );

      if (privateRooms[roomId].length === 0) {
        delete privateRooms[roomId];
      } else if (privateRooms[roomId].length === 1) {
        io.to(roomId).emit("opponentLeft");
      }
    }
  });
});

const port = 3000;
http.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
