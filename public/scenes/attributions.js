var attributionsText = [
  "Rock Paper Scissors Hands from Flaticon",
  "Hamburger Menu icon from The Noun Project",
  "Music Note icon from IconsPlace",
  "Home icon from Flaticon",
  "Reload icon from Wikipedia",
  "Attribution icon from Flaticon",
  "Background Music from Pekora Ch. 兎田ぺこら (COVER Corporation)",
];

var attributionsURL = [
  "https://www.flaticon.com/free-icon/rock-paper-scissors_4144572?term=rock+paper+scissors&page=1&position=13&origin=tag&related_id=4144572",
  "https://thenounproject.com/icon/hamburger-152847/",
  "https://iconsplace.com/white-icons/note-icon-18/",
  "https://www.flaticon.com/free-icon/home_25694",
  "https://commons.wikimedia.org/wiki/File:Reload_icon_with_two_arrows.svg",
  "https://www.flaticon.com/free-icon/attribution_104660",
  "https://www.youtube.com/@usadapekora",
];

export default class Attributions extends Phaser.Scene {
  constructor() {
    super("attributionsScene");
  }

  create() {
    this.background = this.add
      .image(800, 450, "background")
      .setOrigin(0.5, 0.5)
      .setScale(0.5);

    this.title = this.add.image(800, 200, "title").setScale(0.2);

    this.version = this.add
      .text(1580, 870, `Version ${version}`, {
        font: "20px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5);

    this.attributionsTitle = this.add
      .text(800, 400, "Attributions", {
        font: "30px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    for (var i = 0; i < attributionsText.length; i++) {
      this["attributionsTexts" + i] = this.add
        .text(800, 410 + 40 * (i + 1), attributionsText[i], {
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
      .image(800, 850, "home")
      .setOrigin(0.5, 0.5)
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.homebutton.setScale(0.105);
        setTimeout(() => {
          this.homebutton.setScale(0.1);
        }, 100);
        setTimeout(() => {
          this.scene.switch("mainScreenScene");
        }, 150);
      });

    this.brand_white = this.add.image(130, 860, "erg_brand_white");
    this.brand_white.setScale(0.06);
  }
}
