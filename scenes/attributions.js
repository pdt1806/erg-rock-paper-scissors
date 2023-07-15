var attributionsText = [
  "Rock Paper Scissors Hands from Flaticon",
  "Wood background from Vecteezy",
  "Hamburger Menu icon from The Noun Project",
  "Music Note icon from IconsPlace",
  "Home icon from Flaticon",
  "Reload icon from Wikipedia",
  "Attribution icon from Flaticon",
];

var attributionsURL = [
  "https://www.flaticon.com/free-icon/rock-paper-scissors_4144572?term=rock+paper+scissors&page=1&position=13&origin=tag&related_id=4144572",
  "https://www.vecteezy.com/vector-art/18735545-drawing-cartoon-art-of-bright-wood-texture-pattern-landscape-wide-template-vector-background",
  "https://thenounproject.com/icon/hamburger-152847/",
  "https://iconsplace.com/white-icons/note-icon-18/",
  "https://www.flaticon.com/free-icon/home_25694",
  "https://commons.wikimedia.org/wiki/File:Reload_icon_with_two_arrows.svg",
  "https://www.flaticon.com/free-icon/attribution_104660",
];

export default class Attributions extends Phaser.Scene {
  constructor() {
    super("attributionsScene");
  }

  create() {
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.title = this.add.image(640, 150, "title");
    this.title.setScale(0.15);

    this.version = this.add
      .text(1270, 700, "Version 1.1", {
        font: "20px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5);

    this.attributionsTitle = this.add
      .text(640, 310, "Attributions", {
        font: "30px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    for (var i = 0; i < attributionsText.length; i++) {
      this["attributionsTexts" + i] = this.add
        .text(640, 320 + 40 * (i + 1), attributionsText[i], {
          font: "25px Trebuchet MS",
          fill: "#FFFFFF",
        })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown", urlClickHandler(i));
    }

    function urlClickHandler(i) {
      return function () {
        window.open(attributionsURL[i]);
      };
    }

    this.homebutton = this.add
      .image(640, 680, "home")
      .setOrigin(0.5, 0.5)
      .setScale(0.08)
      .setInteractive()
      .on("pointerdown", () => {
        this.homebutton.setScale(0.085);
        setTimeout(() => {
          this.homebutton.setScale(0.08);
        }, 100);
        setTimeout(() => {
          this.scene.switch("mainScreenScene");
        }, 150);
      });

    this.brand_white = this.add.image(110, 690, "erg_brand_white");
    this.brand_white.setScale(0.05);
  }
}
