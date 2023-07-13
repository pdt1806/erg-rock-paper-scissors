var winCounter = 0;
var drawCounter = 0;
var lossCounter = 0;

var myHandAngle = -90;
var yourHandAngle = -90;

var myHandX = 200;
var yourHandX = 1080;

var myHandY = 360;
var yourHandY = 360;

const handValues = {
    0: "rock",
    1: "paper",
    2: "scissors"
};

var myHandValue = handValues[0];
var yourHandValue = handValues[0];

const delay = ms => new Promise(res => setTimeout(res, ms));

const handPlaying = async () => {
    const yourHandAnimation = (async () => {
      for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 15; i++) {
            yourHandAngle += 1;
            yourHandX += 2;
            yourHandY -= 5;
            await delay(10);
          }
          await delay(30);
          for (var i = 0; i < 15; i++) {
            yourHandAngle -= 1;
            yourHandX -= 2;
            yourHandY += 5;
            await delay(10);
          }
      }
    })();
  
    const myHandAnimation = (async () => {
        for (var j = 0; j < 3; j++) {
            for (var i = 0; i < 15; i++) {
                myHandAngle -= 1;
                myHandX -= 2;
                myHandY -= 5;
                await delay(10);
              }
              await delay(30);
              for (var i = 0; i < 15; i++) {
                myHandAngle += 1;
                myHandX += 2;
                myHandY += 5;
                await delay(10);
              }
          }
    })();
  
    await Promise.all([yourHandAnimation, myHandAnimation]);
  };

export default class InGame extends Phaser.Scene {
    constructor() {
        super("inGameScene");
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);

        this.menuButton = this.add.image(40, 685, 'menu_button');
        this.menuButton.setScale(0.08);
        this.menuButton.setInteractive();
        this.menuButton.on('pointerdown', () => this.scene.start("mainScreenScene"));
        
        this.wintext = this.add.text(125, 10, "Wins", {font: "50px Trebuchet MS", fill: "#FFFFFF"});
        this.winscore = this.add.text(155, 65, `${winCounter}`, {font: "75px Trebuchet MS", fill: "#FFFFFF"});

        this.wintext = this.add.text(575, 10, "Draws", {font: "50px Trebuchet MS", fill: "#FFFFFF"});
        this.winscore = this.add.text(620, 65, `${drawCounter}`, {font: "75px Trebuchet MS", fill: "#FFFFFF"});

        this.wintext = this.add.text(1045, 10, "Losses", {font: "50px Trebuchet MS", fill: "#FFFFFF"});
        this.winscore = this.add.text(1095, 65, `${lossCounter}`, {font: "75px Trebuchet MS", fill: "#FFFFFF"});

        this.myhand = this.add.image(myHandX, myHandY, `${myHandValue}`);
        this.myhand.setScale(0.5, -0.5);
        this.myhand.angle = myHandAngle;

        this.yourhand = this.add.image(yourHandX, yourHandY, `${yourHandValue}`);
        this.yourhand.setScale(0.5);
        this.yourhand.angle = yourHandAngle;

        this.handsmenu = this.add.image(640, 720, 'hands_menu');
        this.handsmenu.setScale(0.2);

        this.rockbutton = this.add.image(400, 680, 'rock');
        this.rockbutton.setScale(0.2);
        this.rockbutton.setInteractive();
        this.rockbutton.on('pointerdown', () => handPlaying());

        this.paperbutton = this.add.image(640, 680, 'paper');
        this.paperbutton.setScale(0.2);
        this.paperbutton.setInteractive();
        this.paperbutton.on('pointerdown', () => handPlaying());

        this.scissorsbutton = this.add.image(880, 680, 'scissors');
        this.scissorsbutton.setScale(0.2);
        this.scissorsbutton.setInteractive();
        this.scissorsbutton.on('pointerdown', () => handPlaying());

    }

    update() {
        this.myhand.angle = myHandAngle;
        this.myhand.x = myHandX;
        this.myhand.y = myHandY;

        this.yourhand.angle = yourHandAngle;
        this.yourhand.x = yourHandX;
        this.yourhand.y = yourHandY;
    }
}