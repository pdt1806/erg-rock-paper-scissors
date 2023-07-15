export default class MainScreen extends Phaser.Scene {
  constructor() {
    super("mainScreenScene");
  }

  create() {
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.title = this.add.image(640, 260, "title");
    this.title.setScale(0.5);

    this.playButton = this.add.image(640, 460, "play_button");
    this.playButton.setScale(0.08);
    this.playButton.setInteractive();
    this.playButton.on("pointerdown", () => {
      this.playButton.setScale(0.085);
      setTimeout(() => {
        this.playButton.setScale(0.08);
      }, 100);
      setTimeout(() => {
        this.scene.start("inGameScene");
      }, 150);
    });

    this.musicButton = this.add.image(500, 460, "music");
    this.musicButton.setScale(0.08);
    this.musicButton.setInteractive();
    this.musicButton.on("pointerdown", () => {
      this.musicButton.setScale(0.085);
      setTimeout(() => {
        this.musicButton.setScale(0.08);
      }, 100);
      setTimeout(async () => {
        this.game.sound.mute = !this.game.sound.mute;
      }, 10);
    });

    this.brand_white = this.add.image(110, 690, "erg_brand_white");
    this.brand_white.setScale(0.05);
  }

  update() {
    this.musicButton.setTexture(!this.game.sound.mute ? "music" : "music_off");
  }
}
