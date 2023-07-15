var winCounter = 0;
var drawCounter = 0;
var lossCounter = 0;

var menuShowing = false;

var myHandAngle = -90;
var yourHandAngle = -90;

var myHandX = 200;
var yourHandX = 1080;

var myHandY = 360;
var yourHandY = 360;

var rockButtonVisible = true;
var paperButtonVisible = true;
var scissorsButtonVisible = true;

var playerChoice = 0;

var resultText = "";

const handValues = {
  0: "rock",
  1: "paper",
  2: "scissors",
};

var myHandValue = handValues[0];
var yourHandValue = handValues[0];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const handPlaying = async () => {
  const yourHandAnimation = (async () => {
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < 15; i++) {
        yourHandAngle++;
        yourHandX += 2;
        yourHandY -= 5;
        await delay(10);
      }
      await delay(30);
      for (var i = 0; i < 15; i++) {
        yourHandAngle--;
        yourHandX -= 2;
        yourHandY += 5;
        await delay(10);
      }
    }
  })();

  const myHandAnimation = (async () => {
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < 15; i++) {
        myHandAngle--;
        myHandX -= 2;
        myHandY -= 5;
        await delay(10);
      }
      await delay(30);
      for (var i = 0; i < 15; i++) {
        myHandAngle++;
        myHandX += 2;
        myHandY += 5;
        await delay(10);
      }
    }
  })();

  await Promise.all([yourHandAnimation, myHandAnimation]);
};

const hideHandButtons = (value) => {
  rockButtonVisible = !value;
  paperButtonVisible = !value;
  scissorsButtonVisible = !value;
};

const result = async () => {
  myHandValue = handValues[playerChoice];
  yourHandValue = handValues[Math.floor(Math.random() * 3)];
  if (myHandValue == yourHandValue) {
    drawCounter++;
    resultText = "Draw!";
  } else if (
    (myHandValue == "rock" && yourHandValue == "scissors") ||
    (myHandValue == "paper" && yourHandValue == "rock") ||
    (myHandValue == "scissors" && yourHandValue == "paper")
  ) {
    winCounter++;
    resultText = "You win!";
  } else {
    lossCounter++;
    resultText = "You lose!";
  }
  await delay(1234);
  hideHandButtons(false);
  myHandValue = handValues[0];
  yourHandValue = handValues[0];
  resultText = "";
};

const animationAndResult = async () => {
  hideHandButtons(true);
  await handPlaying();
  result();
};

export default class InGame extends Phaser.Scene {
  constructor() {
    super("inGameScene");
  }

  create() {
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.menuButton = this.add.image(40, 685, "menu_button");
    this.menuButton.setScale(0.08);
    this.menuButton.setInteractive();
    this.menuButton.on("pointerdown", () => {
      this.menuButton.setScale(0.085);
      setTimeout(() => {
        this.menuButton.setScale(0.08);
      }, 100);
      menuShowing = !menuShowing;
    });

    this.wintext = this.add
      .text(125, 40, "Wins", { font: "50px Trebuchet MS", fill: "#FFFFFF" })
      .setOrigin(0.5, 0.5);
    this.winscore = this.add
      .text(125, 110, `${winCounter}`, {
        font: "75px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.drawtext = this.add
      .text(640, 40, "Draws", { font: "50px Trebuchet MS", fill: "#FFFFFF" })
      .setOrigin(0.5, 0.5);
    this.drawscore = this.add
      .text(640, 110, `${drawCounter}`, {
        font: "75px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.losstext = this.add
      .text(1155, 40, "Losses", { font: "50px Trebuchet MS", fill: "#FFFFFF" })
      .setOrigin(0.5, 0.5);
    this.lossscore = this.add
      .text(1155, 110, `${lossCounter}`, {
        font: "75px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.aiindicator = this.add
      .text(1155, 560, "AI", { font: "50px Trebuchet MS", fill: "#FFFFFF" })
      .setOrigin(0.5, 0.5);
    this.playerindicator = this.add
      .text(125, 560, "You", { font: "50px Trebuchet MS", fill: "#FFFFFF" })
      .setOrigin(0.5, 0.5);

    this.myhand = this.add.image(myHandX, myHandY, `${myHandValue}`);
    this.myhand.setScale(0.5, -0.5);
    this.myhand.angle = myHandAngle;

    this.yourhand = this.add.image(yourHandX, yourHandY, `${yourHandValue}`);
    this.yourhand.setScale(0.5);
    this.yourhand.angle = yourHandAngle;

    this.handsmenu = this.add.image(640, 720, "hands_menu");
    this.handsmenu.setScale(0.2);

    this.rockbutton = this.add.image(400, 680, "rock");
    this.rockbutton.setScale(0.2);
    this.rockbutton.setInteractive();
    this.rockbutton.on("pointerdown", async () => {
      playerChoice = 0;
      animationAndResult();
      this.playerindicator.setVisible(false);
      this.aiindicator.setVisible(false);
    });

    this.paperbutton = this.add.image(640, 680, "paper");
    this.paperbutton.setScale(0.2);
    this.paperbutton.setInteractive();
    this.paperbutton.on("pointerdown", async () => {
      playerChoice = 1;
      animationAndResult();
      this.playerindicator.setVisible(false);
      this.aiindicator.setVisible(false);
    });

    this.scissorsbutton = this.add.image(880, 680, "scissors");
    this.scissorsbutton.setScale(0.2);
    this.scissorsbutton.setInteractive();
    this.scissorsbutton.on("pointerdown", async () => {
      playerChoice = 2;
      animationAndResult();
      this.playerindicator.setVisible(false);
      this.aiindicator.setVisible(false);
    });

    this.resulttext = this.add
      .text(640, 650, resultText, {
        font: "50px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.greyoverlay = this.add.image(640, 360, "grey_overlay");
    this.greyoverlay.setInteractive();
    this.greyoverlay.on("pointerdown", () => (menuShowing = !menuShowing));
    this.greyoverlay.setVisible(menuShowing);

    this.menubackground = this.add
      .image(640, 360, "menu_bg")
      .setOrigin(0.5, 0.5);
    this.menubackground.setScale(0.2);
    this.menubackground.setVisible(menuShowing);

    this.homebutton = this.add.image(640, 360, "home").setOrigin(0.5, 0.5);
    this.homebutton.setScale(0.1);
    this.homebutton.setVisible(menuShowing);
    this.homebutton.setInteractive();
    this.homebutton.on("pointerdown", () => {
      this.homebutton.setScale(0.105);
      setTimeout(() => {
        this.homebutton.setScale(0.1);
      }, 100);
      setTimeout(() => {
        this.scene.switch("mainScreenScene");
        menuShowing = !menuShowing;
      }, 150);
    });

    this.reloadbutton = this.add.image(500, 360, "reload").setOrigin(0.5, 0.5);
    this.reloadbutton.setScale(0.1);
    this.reloadbutton.setVisible(menuShowing);
    this.reloadbutton.setInteractive();
    this.reloadbutton.on("pointerdown", () => {
      this.reloadbutton.setScale(0.105);
      setTimeout(() => {
        this.reloadbutton.setScale(0.1);
      }, 100);
      setTimeout(() => {
        winCounter = 0;
        drawCounter = 0;
        lossCounter = 0;
        this.playerindicator.setVisible(true);
        this.aiindicator.setVisible(true);
        menuShowing = !menuShowing;
      }, 150);
    });

    this.musicbutton = this.add.image(780, 360, "music").setOrigin(0.5, 0.5);
    this.musicbutton.setScale(0.1);
    this.musicbutton.setVisible(menuShowing);
    this.musicbutton.setInteractive();
    this.musicbutton.on("pointerdown", () => {
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
    this.myhand.angle = myHandAngle;
    this.myhand.x = myHandX;
    this.myhand.y = myHandY;

    this.yourhand.angle = yourHandAngle;
    this.yourhand.x = yourHandX;
    this.yourhand.y = yourHandY;

    this.rockbutton.setVisible(rockButtonVisible);
    this.paperbutton.setVisible(paperButtonVisible);
    this.scissorsbutton.setVisible(scissorsButtonVisible);

    this.myhand.setTexture(`${myHandValue}`);
    this.yourhand.setTexture(`${yourHandValue}`);

    this.winscore.setText(`${winCounter}`);
    this.drawscore.setText(`${drawCounter}`);
    this.lossscore.setText(`${lossCounter}`);

    this.resulttext.setText(resultText);

    this.musicbutton.setTexture(!this.game.sound.mute ? "music" : "music_off");

    this.greyoverlay.setVisible(menuShowing);
    this.menubackground.setVisible(menuShowing);
    this.homebutton.setVisible(menuShowing);
    this.reloadbutton.setVisible(menuShowing);
    this.musicbutton.setVisible(menuShowing);
  }
}
