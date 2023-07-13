import Preload from './scenes/preload.js';
import MainScreen from './scenes/main_screen.js';
import InGame from './scenes/ingame.js';

var config = {
    scale: {
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: 1280,
    height: 720,
    backgroundColor: 0x000000,
    scene: [Preload, MainScreen, InGame],
}

window.onload = function () {
    var game = new Phaser.Game(config);
}