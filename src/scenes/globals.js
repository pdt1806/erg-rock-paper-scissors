window.version = "1.3.2";
window.publicPvP = true;
window.socket = io();
window.delay = (ms) => new Promise((res) => setTimeout(res, ms));
window.joinById = false;
window.roomId = "";
