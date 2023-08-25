window.version = "1.4.4";
window.publicPvP = true;
window.socket = io();
window.delay = (ms) => new Promise((res) => setTimeout(res, ms));
window.joinById = false;
window.roomId = "";
window.currentGameMode = "";
window.customRound = null;
