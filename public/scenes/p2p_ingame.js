function generateRandomId(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return "CL" + result;
}

var roomJoined = false;

var playerLeft = false;

var winCounter = 0;
var drawCounter = 0;
var lossCounter = 0;

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
  await window.delay(1234);
  hideHandButtons(false);
  myHandValue = handValues[0];
  opponentHandValue = handValues[0];
  playerChoice = 0;
  opponentChoice = null;
  resultText = "";
};

const animationAndResult = async () => {
  await handPlaying();
  await result();
};

const reloadGame = () => {
  opponentLeft = false;
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
  hideHandButtons(true);
  resultText = "Waiting for another player...";
};

const opponentLeftProcedure = async () => {
  resultText = "The opponent has left the game!";
  hideHandButtons(true);
  await window.delay(3000);
};

export default class P2Pingame extends Phaser.Scene {
  constructor() {
    super("p2pingameScene");
  }

  create() {
    if (window.publicP2P) {
      window.socket.emit("getAvailableRoomsForClassic");

      window.socket.on("availableRoomsForClassic", (availableRoomId) => {
        if (availableRoomId && !roomJoined) {
          roomId = availableRoomId;
        } else if (!roomJoined) {
          roomId = generateRandomId(8);
        }
        window.socket.emit("joinRoom", roomId, window.publicP2P);
        roomJoined = true;
      });
    } else {
      roomId = generateRandomId(8);
      window.socket.emit("joinRoom", roomId, window.publicP2P);
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
      hideHandButtons(false);
      reloadGame();
      hideHandButtons(false);
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

    this.idtext = this.add
      .text(1580, 870, `ID: ${roomId}`, {
        font: "20px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5)
      .setVisible(!window.publicP2P);

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
        font: "60px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);
    this.winscore = this.add
      .text(125, 120, `${winCounter}`, {
        font: "80px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.drawtext = this.add
      .text(800, 40, "Draws", {
        font: "60px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);
    this.drawscore = this.add
      .text(800, 120, `${drawCounter}`, {
        font: "80px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.losstext = this.add
      .text(1475, 40, "Losses", {
        font: "60px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);
    this.lossscore = this.add
      .text(1475, 120, `${lossCounter}`, {
        font: "80px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.opponentindicator = this.add
      .text(1430, 650, "Opponent", {
        font: "75px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);
    this.playerindicator = this.add
      .text(150, 650, "You", {
        font: "75px Trebuchet MS",
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
        window.socket.emit("playerHand", 0, roomId, publicP2P);
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
        window.socket.emit("playerHand", 1, roomId, publicP2P);
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
        window.socket.emit("playerHand", 2, roomId, publicP2P);
        this.opponentindicator.setVisible(false);
        this.playerindicator.setVisible(false);
        waitingForOpponent();
      });

    this.resulttext = this.add
      .text(800, 830, resultText, {
        font: `${
          resultText === "The opponent has left the game!" ? "50" : "60"
        }px Trebuchet MS`,
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

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
          window.socket.emit("leaveRoom", roomId, window.publicP2P);
          reloadGame();
          menuShowing = false;
          playerLeft = true;
          this.playerindicator.setVisible(true);
          this.opponentindicator.setVisible(true);
          this.scene.switch("mainScreenScene");
          this.scene.stop("p2pingameScene");
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
      }px Trebuchet MS`
    );

    this.musicbutton.setTexture(!this.game.sound.mute ? "music" : "music_off");

    this.greyoverlay.setVisible(menuShowing);
    this.menubackground.setVisible(menuShowing);
    this.homebutton.setVisible(menuShowing);
    this.reloadbutton.setVisible(menuShowing);
    this.musicbutton.setVisible(menuShowing);
  }
}
