import Intro from './scenes/intro.js';
import MainScreen from './scenes/main_screen.js';

var config = {
    scale: {
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: 1280,
    height: 720,
    backgroundColor: 0x000000,
    scene: [Intro, MainScreen],
}

window.onload = function () {
    var game = new Phaser.Game(config);
}