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
        font: "20px Trebuchet MS",
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
          this.scene.start("ingameScene");
        }, 150);
      });

    this.twoPlayersButton = this.add
      .image(800, 700, "p2p_button")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.twoPlayersButton.setScale(0.105);
        setTimeout(() => {
          this.twoPlayersButton.setScale(0.1);
        }, 100);
        setTimeout(() => {
          this.scene.start("p2pModeChoosingScene");
        }, 150);
      });

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
          this.scene.start("attributionsScene");
        }, 150);
      });

    this.brand_white = this.add.image(130, 860, "erg_brand_white");
    this.brand_white.setScale(0.06);
  }

  update() {
    this.musicButton.setTexture(!this.game.sound.mute ? "music" : "music_off");
  }
}
