var menuShowing = "";

var invalidIdIndicator = false;

export default class PvPModeChoosing extends Phaser.Scene {
  constructor() {
    super("pvpModeChoosingScene");
  }

  create() {
    this.background = this.add
      .image(800, 450, "background_pvp")
      .setOrigin(0.5, 0.5)
      .setScale(0.5);

    this.title = this.add.image(800, 250, "title").setScale(0.25);

    this.version = this.add
      .text(1580, 870, `Version ${version}`, {
        font: "20px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5);

    this.classic = this.add
      .image(800, 570, "pvp_mode_button")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.classic.setScale(0.105);
        this.classic_text.setScale(1.05);
        setTimeout(() => {
          this.classic.setScale(0.1);
          this.classic_text.setScale(1);
        }, 100);
        setTimeout(() => {
          window.currentGameMode = "CL";
          this.scene.launch("pvpingameScene");
          this.scene.stop("pvpModeChoosingScene");
        }, 150);
      });
    this.classic_text = this.add
      .text(800, 570, "Classic", {
        font: "40px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.tenToWin = this.add
      .image(560, 680, "pvp_mode_button")
      .setScale(0.11, 0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.tenToWin.setScale(0.115, 0.105);
        this.tenToWin_text.setScale(1.05);
        setTimeout(() => {
          this.tenToWin.setScale(0.11, 0.1);
          this.tenToWin_text.setScale(1);
        }, 100);
        setTimeout(() => {
          window.currentGameMode = "TE";
          this.scene.launch("pvpingameScene");
          this.scene.stop("pvpModeChoosingScene");
        }, 150);
      });
    this.tenToWin_text = this.add
      .text(560, 680, "10 to Win", {
        font: "40px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.twentyToWin = this.add
      .image(800, 680, "pvp_mode_button")
      .setScale(0.11, 0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.twentyToWin.setScale(0.115, 0.105);
        this.twentyToWin_text.setScale(1.05);
        setTimeout(() => {
          this.twentyToWin.setScale(0.11, 0.1);
          this.twentyToWin_text.setScale(1);
        }, 100);
        setTimeout(() => {
          window.currentGameMode = "TW";
          this.scene.launch("pvpingameScene");
          this.scene.stop("pvpModeChoosingScene");
        }, 150);
      });
    this.twentyToWin_text = this.add
      .text(800, 680, "20 to Win", {
        font: "40px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.customRound = this.add
      .image(1040, 680, "pvp_mode_button")
      .setScale(0.11, 0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.customRound.setScale(0.115, 0.105);
        this.customRound_text.setScale(1.05);
        setTimeout(() => {
          this.customRound.setScale(0.11, 0.1);
          this.customRound_text.setScale(1);
        }, 100);
        setTimeout(() => {
          menuShowing = "customround";
        }, 150);
      });
    this.customRound_text = this.add
      .text(1040, 680, "Custom", {
        font: "40px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.joinRoom = this.add
      .image(800, 790, "pvp_mode_button")
      .setScale(0.13, 0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.joinRoom.setScale(0.135, 0.105);
        this.joinRoom_text.setScale(1.05);
        setTimeout(() => {
          this.joinRoom.setScale(0.13, 0.1);
          this.joinRoom_text.setScale(1);
        }, 100);
        setTimeout(() => {
          menuShowing = "joinroom";
        }, 150);
      });
    this.joinRoom_text = this.add
      .text(800, 790, "Join a room", {
        font: "40px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.musicButton = this.add
      .image(500, 570, "music")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.musicButton.setScale(0.105);
        setTimeout(() => {
          this.musicButton.setScale(0.1);
        }, 100);
        setTimeout(async () => {
          this.game.sound.mute = !this.game.sound.mute;
        }, 10);
      });

    this.globalButton = this.add
      .image(600, 570, "global")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.globalButton.setScale(0.105);
        setTimeout(() => {
          this.globalButton.setScale(0.1);
        }, 100);
        setTimeout(async () => {
          window.publicPvP = !window.publicPvP;
        }, 10);
      });

    this.homeButton = this.add
      .image(1000, 570, "home")
      .setScale(0.1)
      .setInteractive()
      .on("pointerdown", () => {
        this.homeButton.setScale(0.105);
        setTimeout(() => {
          this.homeButton.setScale(0.1);
        }, 100);
        setTimeout(async () => {
          this.scene.launch("mainScreenScene");
          this.scene.stop("pvpModeChoosingScene");
        }, 150);
      });

    this.brand_white = this.add
      .image(130, 860, "erg_brand_white")
      .setScale(0.06);

    this.github = this.add
      .image(70, 800, "github")
      .setScale(0.06)
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://github.com/pdt1806");
      });

    this.greyoverlay = this.add
      .image(800, 360, "grey_overlay")
      .setInteractive()
      .on("pointerdown", () => {
        menuShowing = "";
        invalidIdIndicator = false;
      })
      .setVisible(menuShowing != "");

    this.menubackground = this.add
      .image(800, 450, "menu_bg")
      .setOrigin(0.5, 0.5)
      .setScale(0.2, 0.3)
      .setVisible(menuShowing != "")
      .setInteractive()
      .on("pointerdown", () => null);

    this.idInput = this.add
      .dom(800, 420)
      .createFromCache("joinroomForm")
      .setVisible(menuShowing == "joinroom");

    this.numberofroundsInput = this.add
      .dom(800, 420)
      .createFromCache("customroundForm")
      .setVisible(menuShowing == "customround");

    this.invalidIdIndicatorText = this.add
      .text(800, 500, "Invalid ID", {
        font: "40px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(invalidIdIndicator);

    this.enterIdButton = this.add
      .image(1000, 500, "enter")
      .setOrigin(0.5, 0.5)
      .setScale(0.08)
      .setInteractive()
      .on("pointerdown", () => {
        this.enterIdButton.setScale(0.085);
        setTimeout(() => {
          this.enterIdButton.setScale(0.08);
        }, 100);
        setTimeout(() => {
          if (menuShowing == "customround") {
            window.customRound = parseInt(
              this.numberofroundsInput.getChildByName("customround").value
            );
            window.currentGameMode = "CU";
            menuShowing = false;
            this.scene.launch("pvpingameScene");
            this.scene.stop("pvpModeChoosingScene");
          } else {
            const id = this.idInput.getChildByName("id").value;
            if (id.length !== 10) {
              invalidIdIndicator = true;
            } else {
              window.socket.emit("askForPrivateRoom", id);
              window.socket.on("answerForPrivateRoom", (value) => {
                if (value[0] == id) {
                  if (value[1]) {
                    window.publicPvP = false;
                    window.joinById = true;
                    window.roomId = value[0];
                    window.currentGameMode = id.slice(0, 2);
                    if (id.slice(0, 2) == "CU") {
                      window.customRound = parseInt(id.slice(2, 4));
                    }
                    this.scene.launch("pvpingameScene");
                    this.scene.stop("pvpModeChoosingScene");
                    menuShowing = false;
                    invalidIdIndicator = false;
                  } else {
                    invalidIdIndicator = true;
                  }
                }
              });
            }
          }
        }, 150);
      })
      .setVisible(menuShowing);
  }

  update() {
    this.musicButton.setTexture(!this.game.sound.mute ? "music" : "music_off");
    this.globalButton.setTexture(window.publicPvP ? "global" : "global_off");
    this.greyoverlay.setVisible(menuShowing != "");
    this.menubackground.setVisible(menuShowing != "");
    this.idInput.setVisible(menuShowing == "joinroom");
    this.numberofroundsInput.setVisible(menuShowing == "customround");
    this.invalidIdIndicatorText.setVisible(invalidIdIndicator);
    this.enterIdButton.setVisible(menuShowing);
  }
}
