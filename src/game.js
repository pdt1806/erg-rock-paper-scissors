import Attributions from "./scenes/attributions.js";
import ingame from "./scenes/ingame.js";
import MainScreen from "./scenes/main_screen.js";
import Preload from "./scenes/preload.js";
import PvPingame from "./scenes/pvp_ingame.js";
import PvPModeChoosing from "./scenes/pvp_mode_choosing.js";

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
    PvPModeChoosing,
    PvPingame,
  ],
};

window.onload = function () {
  this.game = new Phaser.Game(config);
};
