var attributionsText = [
  "Rock Paper Scissors Hands from Flaticon",
  "Hamburger Menu icon from The Noun Project",
  "Music Note icon from IconsPlace",
  "Home icon from Flaticon",
  "Reload icon from Wikipedia",
  "Attribution icon from Wikipedia",
  "Global icon from Flaticon",
  "Locked icon from Flaticon",
  "Right arrow icon from Freepik",
  "Star icon from Flaticon",
  "Background Music from Pekora Ch. 兎田ぺこら (COVER Corporation)",
];

var attributionsURL = [
  "https://www.flaticon.com/free-icon/rock-paper-scissors_4144572?term=rock+paper+scissors&page=1&position=13&origin=tag&related_id=4144572",
  "https://thenounproject.com/icon/hamburger-152847/",
  "https://iconsplace.com/white-icons/note-icon-18/",
  "https://www.flaticon.com/free-icon/home_25694",
  "https://commons.wikimedia.org/wiki/File:Reload_icon_with_two_arrows.svg",
  "https://commons.wikimedia.org/wiki/File:Cc-by_new.svg",
  "https://www.flaticon.com/free-icon/global_1383676",
  "https://www.flaticon.com/free-icon/locked-padlock_61457",
  "https://www.freepik.com/icon/right-arrow_59209",
  "https://www.flaticon.com/free-icon/star_118669",
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

    this.title = this.add.image(800, 150, "title").setScale(0.15);

    this.version = this.add
      .text(1580, 870, `Version ${version}`, {
        font: "20px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5);

    this.attributionsTitle = this.add
      .text(800, 300, "Attributions", {
        font: "30px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    for (var i = 0; i < attributionsText.length; i++) {
      this["attributionsTexts" + i] = this.add
        .text(800, 310 + 40 * (i + 1), attributionsText[i], {
          font: "25px Sarala",
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
          this.scene.launch("mainScreenScene");
          this.scene.stop("attributionsScene");
        }, 150);
      });

    this.brand_white = this.add
      .image(130, 860, "erg_brand_white")
      .setScale(0.06);

    this.github = this.add
      .image(70, 800, "github")
      .setScale(0.06)
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://github.com/pdt1806");
      });
  }
}
