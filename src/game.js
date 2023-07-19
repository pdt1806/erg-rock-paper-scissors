import Attributions from "./scenes/attributions.js";
import ingame from "./scenes/ingame.js";
import MainScreen from "./scenes/main_screen.js";
import P2Pingame from "./scenes/p2p_ingame.js";
import P2PModeChoosing from "./scenes/p2p_mode_choosing.js";
import Preload from "./scenes/preload.js";

var config = {
  scale: {
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },

  width: 1600,
  height: 900,
  backgroundColor: 0x000000,
  dom: {
    createContainer: true,
  },
  scene: [
    Preload,
    MainScreen,
    ingame,
    Attributions,
    P2PModeChoosing,
    P2Pingame,
  ],
};

window.onload = function () {
  var game = new Phaser.Game(config);
};
