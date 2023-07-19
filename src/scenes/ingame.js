var winCounter = 0;
var drawCounter = 0;
var lossCounter = 0;

var menuShowing = false;

var myHandAngle = -90;
var yourHandAngle = -90;

var myHandX = 240;
var yourHandX = 1360;

var myHandY = 420;
var yourHandY = 420;

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

const handPlaying = async () => {
  const yourHandAnimation = (async () => {
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < 15; i++) {
        yourHandAngle++;
        yourHandX += 2;
        yourHandY -= 5;
        await window.delay(10);
      }
      await window.delay(30);
      for (var i = 0; i < 15; i++) {
        yourHandAngle--;
        yourHandX -= 2;
        yourHandY += 5;
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
  await window.delay(1234);
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

export default class ingame extends Phaser.Scene {
  constructor() {
    super("ingameScene");
  }

  create() {
    this.background = this.add
      .image(800, 450, "background_ingame")
      .setOrigin(0.5, 0.5)
      .setScale(0.5);

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

    this.aiindicator = this.add
      .text(1450, 650, "AI", {
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

    this.yourhand = this.add
      .image(yourHandX, yourHandY, `${yourHandValue}`)
      .setScale(0.6);
    this.yourhand.angle = yourHandAngle;

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
        animationAndResult();
        this.playerindicator.setVisible(false);
        this.aiindicator.setVisible(false);
      });

    this.paperbutton = this.add
      .image(800, 850, "paper")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", async () => {
        playerChoice = 1;
        animationAndResult();
        this.playerindicator.setVisible(false);
        this.aiindicator.setVisible(false);
      });

    this.scissorsbutton = this.add
      .image(1040, 850, "scissors")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", async () => {
        playerChoice = 2;
        animationAndResult();
        this.playerindicator.setVisible(false);
        this.aiindicator.setVisible(false);
      });

    this.resulttext = this.add
      .text(800, 830, resultText, {
        font: "60px Trebuchet MS",
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
          this.scene.switch("mainScreenScene");
          menuShowing = !menuShowing;
        }, 150);
      });

    this.reloadbutton = this.add
      .image(650, 450, "reload")
      .setOrigin(0.5, 0.5)
      .setScale(0.1)
      .setVisible(menuShowing)
      .setInteractive()
      .on("pointerdown", () => {
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
