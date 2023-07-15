export default class Preload extends Phaser.Scene {
  constructor() {
    super("preloadScene");
  }

  preload() {
    this.load.image("erg_brand_white", "lib/ERG-brand-white.png");
    this.load.image("background", "lib/background.jpg");
    this.load.image("background_ingame", "lib/background_ingame.jpg");
    this.load.image("title", "lib/title.png");
    this.load.image("rock", "lib/hands/rock.png");
    this.load.image("paper", "lib/hands/paper.png");
    this.load.image("scissors", "lib/hands/scissors.png");
    this.load.image("play_button", "lib/play_button.png");
    this.load.image("two_players_button", "lib/two_players_button.png");
    this.load.image("menu_button", "lib/menu_button.png");
    this.load.image("hands_menu", "lib/hands/hands_menu.png");
    this.load.audio("bgm", "lib/audio/bgm.mp3");
    this.load.image("music", "lib/music.png");
    this.load.image("music_off", "lib/music_off.png");
    this.load.image("grey_overlay", "lib/grey_overlay.png");
    this.load.image("home", "lib/home.png");
    this.load.image("reload", "lib/reload.png");
    this.load.image("menu_bg", "lib/menu_bg.png");
    this.load.image("attributions", "lib/attributions_button.png");
  }

  create() {
    this.add.text(
      20,
      20,
      "Rock Paper Scissors - Egg Recreates Games\n\nLoading...",
      {
        font: "25px Consolas",
        fill: "#FFFFFF",
      }
    );
    const bgm = this.sound.add("bgm", { loop: true, volume: 0.1 });
    bgm.play();
    this.scene.start("mainScreenScene");
  }
}
