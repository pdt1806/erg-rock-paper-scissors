export default class Preload extends Phaser.Scene {
  constructor() {
    super("preloadScene");
  }

  preload() {
    this.load.image("erg_brand_white", "lib/ERG-brand-white.png");
    this.load.image("background", "lib/background.png");
    this.load.image("background_p2p", "lib/background_p2p.png");
    this.load.image("background_ingame", "lib/background_ingame.png");
    this.load.image("title", "lib/title.png");
    this.load.image("rock", "lib/hands/rock.png");
    this.load.image("paper", "lib/hands/paper.png");
    this.load.image("scissors", "lib/hands/scissors.png");
    this.load.image("play_button", "lib/play_button.png");
    this.load.image("p2p_button", "lib/p2p_button.png");
    this.load.image("p2p_mode_button", "lib/p2p_mode_button.png");
    this.load.image("menu_button", "lib/menu_button.png");
    this.load.image("hands_menu", "lib/hands/hands_menu.png");
    this.load.audio("bgm", "lib/audio/bgm.mp3");
    this.load.image("music", "lib/music.png");
    this.load.image("music_off", "lib/music_off.png");
    this.load.image("grey_overlay", "lib/grey_overlay.png");
    this.load.image("home", "lib/home.png");
    this.load.image("reload", "lib/reload.png");
    this.load.image("reload_disabled", "lib/reload_disabled.png");
    this.load.image("menu_bg", "lib/menu_bg.png");
    this.load.image("attributions", "lib/attributions_button.png");
    this.load.image("global", "lib/global.png");
    this.load.image("global_off", "lib/global_off.png");
    this.load.image("enter", "lib/enter_button.png");
    this.load.html("form", "form.html");
  }

  create() {
    this.scale.displaySize.setAspectRatio(16 / 9);
    this.scale.refresh();
    this.cameras.main.setBackgroundColor("#000082");
    this.add.text(
      20,
      20,
      `Egg Recreates Games - Rock Paper Scissors
Version ${version}
      

If you are encountering this message, it indicates that the game is currently loading or an error has occurred. 

If you have IDM (Internet Download Manager) installed and it prompts you to download any files, kindly disable it \nfrom downloading files from this particular website. 

Alternatively, please refresh the page.`,
      {
        font: "25px Consolas",
        fill: "#FFFFFF",
      }
    );
    const bgm = this.sound.add("bgm", { loop: true, volume: 0.1 });
    bgm.play();

    this.scene.launch("mainScreenScene");
  }
}
