export default class Preload extends Phaser.Scene {
    constructor() {
        super("preloadScene");
    }

    preload() {
        this.load.image('erg_brand_white', 'lib/ERG-brand-white.png');
        this.load.image('background', 'lib/background.jpg')
        this.load.image('title', 'lib/title.png')
        this.load.image('rock', 'lib/hands/rock.png');
        this.load.image('paper', 'lib/hands/paper.png');
        this.load.image('scissors', 'lib/hands/scissors.png');
        this.load.image('play_button', 'lib/play_button.png');
        this.load.image('menu_button', 'lib/menu_button.png');
        this.load.image('hands_menu', 'lib/hands/hands_menu.png');
    }
    
    create() {
        this.add.text(20, 20, "Rock Paper Scissors - Egg Recreates Games", {font: "25px Arial", fill: "#FFFFFF"});
        this.scene.start("inGameScene")
    }
}