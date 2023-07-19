window.version = "1.3.2";
window.publicP2P = true;
window.socket = io();
window.delay = (ms) => new Promise((res) => setTimeout(res, ms));
