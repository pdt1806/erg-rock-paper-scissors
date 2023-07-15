export default class MainScreen extends Phaser.Scene {
  constructor() {
    super("mainScreenScene");
  }

  create() {
    this.background = this.add
      .image(640, 360, "background")
      .setOrigin(0.5, 0.5);

    this.title = this.add.image(640, 230, "title").setScale(0.25);

    this.version = this.add
      .text(1270, 700, "Version 1.2", {
        font: "20px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5);

    this.playButton = this.add
      .image(640, 520, "play_button")
      .setScale(0.08)
      .setInteractive()
      .on("pointerdown", () => {
        this.playButton.setScale(0.085);
        setTimeout(() => {
          this.playButton.setScale(0.08);
        }, 100);
        setTimeout(() => {
          this.scene.start("inGameScene");
        }, 150);
      });

    // this.twoPlayersButton = this.add
    //   .image(640, 620, "two_players_button")
    //   .setScale(0.08)
    //   .setInteractive()
    //   .on("pointerdown", () => {
    //     this.twoPlayersButton.setScale(0.085);
    //     setTimeout(() => {
    //       this.twoPlayersButton.setScale(0.08);
    //     }, 100);
    //     setTimeout(() => {
    //       this.scene.start("twoPlayersScene");
    //     }, 150);
    //   });

    this.musicButton = this.add
      .image(500, 520, "music")
      .setScale(0.08)
      .setInteractive()
      .on("pointerdown", () => {
        this.musicButton.setScale(0.085);
        setTimeout(() => {
          this.musicButton.setScale(0.08);
        }, 100);
        setTimeout(async () => {
          this.game.sound.mute = !this.game.sound.mute;
        }, 10);
      });

    this.attributionsButton = this.add
      .image(780, 520, "attributions")
      .setScale(0.08)
      .setInteractive()
      .on("pointerdown", () => {
        this.attributionsButton.setScale(0.085);
        setTimeout(() => {
          this.attributionsButton.setScale(0.08);
        }, 100);
        setTimeout(async () => {
          this.scene.start("attributionsScene");
        }, 150);
      });

    this.brand_white = this.add.image(110, 690, "erg_brand_white");
    this.brand_white.setScale(0.05);
  }

  update() {
    this.musicButton.setTexture(!this.game.sound.mute ? "music" : "music_off");
  }
}
