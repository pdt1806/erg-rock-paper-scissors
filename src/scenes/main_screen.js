export default class MainScreen extends Phaser.Scene {
  constructor() {
    super("mainScreenScene");
  }

  create() {
    this.background = this.add
      .image(800, 450, "background")
      .setOrigin(0.5, 0.5)
      .setScale(0.5);

    this.title = this.add.image(800, 250, "title").setScale(0.25);

    this.version = this.add
      .text(1580, 870, `Version ${version}`, {
        font: "20px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5);

    this.playButton = this.add
      .image(800, 570, "play_button")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.playButton.setScale(0.105);
        setTimeout(() => {
          this.playButton.setScale(0.1);
        }, 100);
        setTimeout(() => {
          this.scene.launch("ingameScene");
          this.scene.stop("mainScreenScene");
        }, 150);
      });

    this.twoPlayersButton = this.add
      .image(800, 700, "pvp_mode_button")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.twoPlayersButton.setScale(0.105);
        this.twoPlayersButton_text.setScale(1.05);
        setTimeout(() => {
          this.twoPlayersButton.setScale(0.1);
          this.twoPlayersButton_text.setScale(1);
        }, 100);
        setTimeout(() => {
          this.scene.launch("pvpModeChoosingScene");
          this.scene.stop("mainScreenScene");
        }, 150);
      });
    this.twoPlayersButton_text = this.add
      .text(800, 700, "2 Players", {
        font: "35px Sarala",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.musicButton = this.add
      .image(600, 570, "music")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.musicButton.setScale(0.105);
        setTimeout(() => {
          this.musicButton.setScale(0.1);
        }, 100);
        setTimeout(async () => {
          this.game.sound.mute = !this.game.sound.mute;
        }, 10);
      });

    this.attributionsButton = this.add
      .image(1000, 570, "attributions")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.attributionsButton.setScale(0.105);
        setTimeout(() => {
          this.attributionsButton.setScale(0.1);
        }, 100);
        setTimeout(async () => {
          this.scene.launch("attributionsScene");
          this.scene.stop("mainScreenScene");
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

  update() {
    this.musicButton.setTexture(!this.game.sound.mute ? "music" : "music_off");
  }
}
