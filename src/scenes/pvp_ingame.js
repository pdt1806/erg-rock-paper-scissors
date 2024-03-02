function generateRandomId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return window.currentGameMode !== "CU"
    ? window.currentGameMode + result
    : window.currentGameMode +
        String(window.customRound).padStart(2, "0") +
        result.slice(0, 6);
}

var roomJoined = false;

var playerLeft = false;

var winCounter = 0;
var drawCounter = 0;
var lossCounter = 0;

var updatingScore = false;

var goal;

var menuShowing = false;

var opponentLeft = false;

var myHandAngle = -90;
var opponentHandAngle = -90;

var myHandX = 240;
var opponentHandX = 1360;

var myHandY = 420;
var opponentHandY = 420;

var rockButtonVisible = false;
var paperButtonVisible = false;
var scissorsButtonVisible = false;

var playerChoice = 0;
var opponentChoice = null;

var resultText = "Waiting for another player...";

const handValues = {
  0: "rock",
  1: "paper",
  2: "scissors",
};

var myHandValue = handValues[0];
var opponentHandValue = handValues[0];

var roomId;

const handPlaying = async () => {
  hideHandButtons(true);
  const opponentHandAnimation = (async () => {
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < 15; i++) {
        opponentHandAngle++;
        opponentHandX += 2;
        opponentHandY -= 5;
        await window.delay(10);
      }
      await window.delay(30);
      for (var i = 0; i < 15; i++) {
        opponentHandAngle--;
        opponentHandX -= 2;
        opponentHandY += 5;
        await window.delay(10);
      }
    }
  })();

  const myHandAnimation = (async () => {
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < 15; i++) {
        myHandAngle--;
        myHandX -= 2;
        myHandY -= 5;
        await window.delay(10);
      }
      await window.delay(30);
      for (var i = 0; i < 15; i++) {
        myHandAngle++;
        myHandX += 2;
        myHandY += 5;
        await window.delay(10);
      }
    }
  })();

  await Promise.all([opponentHandAnimation, myHandAnimation]);
};

const hideHandButtons = (value) => {
  rockButtonVisible = !value;
  paperButtonVisible = !value;
  scissorsButtonVisible = !value;
};

const waitingForOpponent = () => {
  hideHandButtons(true);
  resultText = "The opponent is choosing...";
  if (opponentChoice !== null) {
    resultText = "";
    animationAndResult();
    return;
  } else if (opponentLeft || playerLeft) {
    return;
  }
  window.socket.on("opponentHand", (value) => {
    if (value[0][0] !== window.socket.id) {
      opponentChoice = value[0][1];
    } else {
      opponentChoice = value[1][1];
    }
  });
  window.socket.on("opponentLeft", () => {
    opponentLeft = true;
  });
  setTimeout(waitingForOpponent, 1);
};

const endGame = async () => {
  hideHandButtons(true);
  resultText = "Game over!";
};

const result = async () => {
  myHandValue = handValues[playerChoice];
  opponentHandValue = handValues[opponentChoice];
  if (myHandValue == opponentHandValue) {
    drawCounter++;
    resultText = "Draw!";
  } else if (
    (myHandValue == "rock" && opponentHandValue == "scissors") ||
    (myHandValue == "paper" && opponentHandValue == "rock") ||
    (myHandValue == "scissors" && opponentHandValue == "paper")
  ) {
    winCounter++;
    resultText = "You win!";
  } else {
    lossCounter++;
    resultText = "You lose!";
  }
  updatingScore = true;
  if (
    (lossCounter === goal || winCounter === goal) &&
    window.currentGameMode !== "CL"
  ) {
    endGame();
  } else {
    await window.delay(1234);
    hideHandButtons(false);
    myHandValue = handValues[0];
    opponentHandValue = handValues[0];
    playerChoice = 0;
    opponentChoice = null;
    resultText = "";
  }
};

const animationAndResult = async () => {
  await handPlaying();
  await result();
};

const reloadGame = () => {
  opponentLeft = false;
  updatingScore = false;
  winCounter = 0;
  drawCounter = 0;
  lossCounter = 0;
  myHandAngle = -90;
  opponentHandAngle = -90;
  myHandX = 240;
  opponentHandX = 1360;
  myHandY = 420;
  opponentHandY = 420;
  opponentChoice = null;
  myHandValue = handValues[0];
  opponentHandValue = handValues[0];
  playerChoice = null;
  roomJoined = false;
  resultText = "Waiting for another player...";
};

const opponentLeftProcedure = async () => {
  resultText = "The opponent has left the game!";
  hideHandButtons(true);
  await window.delay(3000);
};

export default class PvPingame extends Phaser.Scene {
  constructor() {
    super("pvpingameScene");
  }

  create() {
    if (window.currentGameMode !== "CL") {
      if (window.currentGameMode === "CU") {
        goal = window.customRound;
      } else {
        goal = window.currentGameMode === "TE" ? 10 : 20;
      }
    }
    if (window.publicPvP) {
      window.socket.emit(
        "getAvailableRooms",
        window.currentGameMode,
        window.customRound
      );

      window.socket.on("availableRooms", (availableRoomId) => {
        if (availableRoomId && !roomJoined) {
          roomId = availableRoomId;
        } else if (!roomJoined) {
          roomId = generateRandomId();
        }
        window.socket.emit("joinRoom", roomId, window.publicPvP);
        roomJoined = true;
      });
    } else if (!window.joinById) {
      roomId = generateRandomId();
      window.socket.emit("joinRoom", roomId, window.publicPvP);
      roomJoined = true;
    } else {
      window.socket.emit("joinRoom", window.roomId, window.publicPvP);
      roomId = window.roomId;
      roomJoined = true;
    }

    window.socket.on("opponentLeft", () => {
      opponentLeft = true;
      this.playerindicator.setVisible(true);
      this.opponentindicator.setVisible(true);
    });

    window.socket.on("gameStart", () => {
      playerLeft = false;
      resultText = "";
      reloadGame();
      hideHandButtons(false);
      if (window.currentGameMode !== "CL" && window.currentGameMode !== "CU") {
        for (var i = 0; i < goal; i++) {
          this["star" + i].setTexture("star_none");
          this["star_Opponent" + i].setTexture("star_none");
        }
      }
      resultText = "";
    });

    window.socket.on("opponentHand", (value) => {
      if (value[0][0] !== window.socket.id) {
        opponentChoice = value[0][1];
      } else {
        opponentChoice = value[1][1];
      }
    });

    this.background = this.add
      .image(800, 450, "background_ingame")
      .setOrigin(0.5, 0.5)
      .setScale(0.5);

    this.copyIdReminder = this.add
      .text(1580, 835, "Copy by clicking on the ID", {
        font: "20px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5)
      .setVisible(!window.publicPvP && !window.joinById);

    this.idtext = this.add
      .text(1580, 870, `ID: ${roomId}`, {
        font: "25px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5)
      .setVisible(!window.publicPvP)
      .setInteractive()
      .on("pointerdown", () => {
        this.copyIdReminder.setVisible(true);
        navigator.clipboard.writeText(roomId);
        this.copyIdReminder.setText("ID copied!");
        setTimeout(() => {
          this.copyIdReminder.setVisible(false);
        }, 2000);
      });

    this.menuButton = this.add
      .image(50, 850, "menu_button")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.menuButton.setScale(0.105);
        setTimeout(() => {
          this.menuButton.setScale(0.1);
        }, 100);
        menuShowing = !menuShowing;
      });

    this.wintext = this.add
      .text(125, 40, "Wins", {
        font: "60px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(
        window.currentGameMode === "CL" || window.currentGameMode === "CU"
      );
    this.winscore = this.add
      .text(125, 120, `${winCounter}`, {
        font: "80px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(
        window.currentGameMode === "CL" || window.currentGameMode === "CU"
      );

    this.drawtext = this.add
      .text(800, 40, "Draws", {
        font: "60px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(window.currentGameMode === "CL");
    this.drawscore = this.add
      .text(800, 120, `${drawCounter}`, {
        font: "80px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(window.currentGameMode === "CL");

    this.losstext = this.add
      .text(1475, 40, "Losses", {
        font: "60px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(
        window.currentGameMode === "CL" || window.currentGameMode === "CU"
      );
    this.lossscore = this.add
      .text(1475, 120, `${lossCounter}`, {
        font: "80px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(
        window.currentGameMode === "CL" || window.currentGameMode === "CU"
      );

    this.goalindicator = this.add
      .text(800, 40, `First to ${goal}`, {
        font: "40px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(window.currentGameMode === "CU");

    if (window.currentGameMode !== "CL" && window.currentGameMode !== "CU") {
      for (var i = 0; i < goal; i++) {
        this["star" + i] = this.add
          .image(50 + (i > 9 ? i - 10 : i) * 52, i > 9 ? 110 : 50, "star_none")
          .setOrigin(0.5, 0.5)
          .setScale(0.01);
        this["star_Opponent" + i] = this.add
          .image(
            1550 - (i > 9 ? i - 10 : i) * 52,
            i > 9 ? 110 : 50,
            "star_none"
          )
          .setOrigin(0.5, 0.5)
          .setScale(0.01);
      }
    }

    this.opponentindicator = this.add
      .text(1400, 650, "Opponent", {
        font: "75px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);
    this.playerindicator = this.add
      .text(150, 650, "You", {
        font: "75px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.myhand = this.add
      .image(myHandX, myHandY, `${myHandValue}`)
      .setScale(0.6, -0.6);
    this.myhand.angle = myHandAngle;

    this.opponentHand = this.add
      .image(opponentHandX, opponentHandY, `${opponentHandValue}`)
      .setScale(0.6);
    this.opponentHand.angle = opponentHandAngle;

    this.handsmenu = this.add
      .image(800, 860, "hands_menu")
      .setOrigin(0.5, 0.5)
      .setScale(0.3, 0.25);

    this.rockbutton = this.add
      .image(560, 850, "rock")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", async () => {
        playerChoice = 0;
        window.socket.emit("playerHand", 0, roomId, publicPvP);
        this.opponentindicator.setVisible(false);
        this.playerindicator.setVisible(false);
        waitingForOpponent();
      });

    this.paperbutton = this.add
      .image(800, 850, "paper")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", async () => {
        playerChoice = 1;
        window.socket.emit("playerHand", 1, roomId, publicPvP);
        this.opponentindicator.setVisible(false);
        this.playerindicator.setVisible(false);
        waitingForOpponent();
      });

    this.scissorsbutton = this.add
      .image(1040, 850, "scissors")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", async () => {
        playerChoice = 2;
        window.socket.emit("playerHand", 2, roomId, publicPvP);
        this.opponentindicator.setVisible(false);
        this.playerindicator.setVisible(false);
        waitingForOpponent();
      });

    this.resulttext = this.add
      .text(800, 830, resultText, {
        font: `${
          resultText === "The opponent has left the game!" ? "50" : "60"
        }px Sarala`,
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.youwin = this.add
      .image(800, 450, "you_win")
      .setOrigin(0.5, 0.5)
      .setScale(0.2)
      .setVisible(false);

    this.youlose = this.add
      .image(800, 450, "you_lose")
      .setOrigin(0.5, 0.5)
      .setScale(0.2)
      .setVisible(false);

    this.greyoverlay = this.add
      .image(800, 360, "grey_overlay")
      .setInteractive()
      .on("pointerdown", () => (menuShowing = !menuShowing))
      .setVisible(menuShowing);

    this.menubackground = this.add
      .image(800, 450, "menu_bg")
      .setOrigin(0.5, 0.5)
      .setScale(0.2)
      .setVisible(menuShowing)
      .setInteractive()
      .on("pointerdown", () => null);

    this.homebutton = this.add
      .image(800, 450, "home")
      .setOrigin(0.5, 0.5)
      .setScale(0.1)
      .setVisible(menuShowing)
      .setInteractive()
      .on("pointerdown", () => {
        this.homebutton.setScale(0.105);
        setTimeout(() => {
          this.homebutton.setScale(0.1);
        }, 100);
        setTimeout(() => {
          window.socket.emit("leaveRoom", roomId, window.publicPvP);
          reloadGame();
          hideHandButtons(true);
          menuShowing = false;
          playerLeft = true;
          window.publicPvP = true;
          window.joinById = false;
          window.roomId = "";
          window.currentGameMode = "";
          window.customRound = null;
          this.playerindicator.setVisible(true);
          this.opponentindicator.setVisible(true);
          this.scene.launch("pvpModeChoosingScene");
          this.scene.stop("pvpingameScene");
        }, 150);
      });

    this.reloadbutton = this.add
      .image(650, 450, "reload_disabled")
      .setOrigin(0.5, 0.5)
      .setScale(0.1)
      .setVisible(menuShowing)
      .setInteractive();

    this.musicbutton = this.add
      .image(950, 450, "music")
      .setOrigin(0.5, 0.5)
      .setScale(0.1)
      .setVisible(menuShowing)
      .setInteractive()
      .on("pointerdown", () => {
        this.musicbutton.setScale(0.105);
        setTimeout(() => {
          this.musicbutton.setScale(0.1);
        }, 100);
        setTimeout(async () => {
          this.game.sound.mute = !this.game.sound.mute;
        }, 10);
      });
  }

  update() {
    if (opponentLeft) {
      opponentLeftProcedure();
    }

    if (
      updatingScore &&
      window.currentGameMode !== "CL" &&
      window.currentGameMode !== "CU"
    ) {
      for (var i = 0; i < goal; i++) {
        if (i + 1 <= winCounter) {
          this["star" + i].setTexture("star");
        }
        if (i + 1 <= lossCounter) {
          this["star_Opponent" + i].setTexture("star");
        }
      }

      updatingScore = false;
    }

    this.myhand.angle = myHandAngle;
    this.myhand.x = myHandX;
    this.myhand.y = myHandY;

    this.opponentHand.angle = opponentHandAngle;
    this.opponentHand.x = opponentHandX;
    this.opponentHand.y = opponentHandY;

    this.rockbutton.setVisible(rockButtonVisible);
    this.paperbutton.setVisible(paperButtonVisible);
    this.scissorsbutton.setVisible(scissorsButtonVisible);

    this.myhand.setTexture(`${myHandValue}`);
    this.opponentHand.setTexture(`${opponentHandValue}`);

    this.winscore.setText(`${winCounter}`);
    this.drawscore.setText(`${drawCounter}`);
    this.lossscore.setText(`${lossCounter}`);

    this.resulttext.setText(resultText);
    this.resulttext.setFont(
      `${
        resultText === "The opponent has left the game!" ? "50" : "60"
      }px Sarala`
    );

    this.musicbutton.setTexture(!this.game.sound.mute ? "music" : "music_off");

    this.greyoverlay.setVisible(menuShowing);
    this.menubackground.setVisible(menuShowing);
    this.homebutton.setVisible(menuShowing);
    this.reloadbutton.setVisible(menuShowing);
    this.musicbutton.setVisible(menuShowing);

    this.youwin.setVisible(
      winCounter === goal && window.currentGameMode !== "CL"
    );
    this.youlose.setVisible(
      lossCounter === goal && window.currentGameMode !== "CL"
    );
  }
}
