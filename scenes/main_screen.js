

export default class MainScreen extends Phaser.Scene {
    constructor() {
        super("mainScreenScene");
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);

        this.title = this.add.image(640, 260, 'title');
        this.title.setScale(0.5);

        this.playButton = this.add.image(640, 460, 'play_button');
        this.playButton.setScale(0.08);
        this.playButton.setInteractive();
        this.playButton.on('pointerdown', () => {
            this.playButton.setScale(0.085);
            setTimeout(() => {  this.playButton.setScale(0.08); }, 100);
            setTimeout(() => {  this.scene.start("inGameScene"); }, 150);
        });

        this.brand_white = this.add.image(110, 690, 'erg_brand_white');
        this.brand_white.setScale(0.05);
    }

}