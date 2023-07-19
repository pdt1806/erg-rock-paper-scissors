var menuShowing = false;

var invalidIdIndicator = false;

export default class P2PModeChoosing extends Phaser.Scene {
  constructor() {
    super("p2pModeChoosingScene");
  }

  create() {
    this.background = this.add
      .image(800, 450, "background_p2p")
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
      .image(800, 570, "p2p_mode_button")
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
          this.scene.launch("p2pingameScene");
        }, 150);
      });
    this.classic_text = this.add
      .text(800, 570, "Classic", {
        font: "40px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    // this.tenToWin = this.add
    //   .image(660, 680, "p2p_mode_button")
    //   .setScale(0.11, 0.1)
    //   .setInteractive()
    //   .on("pointerdown", () => {
    //     this.tenToWin.setScale(0.115, 0.105);
    //     this.tenToWin_text.setScale(1.05);
    //     setTimeout(() => {
    //       this.tenToWin.setScale(0.11, 0.1);
    //       this.tenToWin_text.setScale(1);
    //     }, 100);
    //     setTimeout(() => {
    //       this.scene.start("ingameScene");
    //     }, 150);
    //   });
    // this.tenToWin_text = this.add
    //   .text(660, 680, "10 to Win", {
    //     font: "40px Trebuchet MS",
    //     fill: "#FFFFFF",
    //   })
    //   .setOrigin(0.5, 0.5);

    // this.twentyToWin = this.add
    //   .image(940, 680, "p2p_mode_button")
    //   .setScale(0.11, 0.1)
    //   .setInteractive()
    //   .on("pointerdown", () => {
    //     this.twentyToWin.setScale(0.115, 0.105);
    //     this.twentyToWin_text.setScale(1.05);
    //     setTimeout(() => {
    //       this.twentyToWin.setScale(0.11, 0.1);
    //       this.twentyToWin_text.setScale(1);
    //     }, 100);
    //     setTimeout(() => {
    //       this.scene.start("ingameScene");
    //     }, 150);
    //   });
    // this.twentyToWin_text = this.add
    //   .text(940, 680, "20 to Win", {
    //     font: "40px Trebuchet MS",
    //     fill: "#FFFFFF",
    //   })
    //   .setOrigin(0.5, 0.5);

    this.joinRoom = this.add
      .image(800, 790, "p2p_mode_button")
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
          menuShowing = !menuShowing;
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
          window.publicP2P = !window.publicP2P;
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
          this.scene.start("mainScreenScene");
        }, 150);
      });

    this.tba = this.add
      .text(800, 680, "More modes coming soon!", {
        font: "40px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5);

    this.brand_white = this.add.image(130, 860, "erg_brand_white");
    this.brand_white.setScale(0.06);

    this.greyoverlay = this.add
      .image(800, 360, "grey_overlay")
      .setInteractive()
      .on("pointerdown", () => {
        menuShowing = !menuShowing;
        invalidIdIndicator = false;
      })
      .setVisible(menuShowing);

    this.menubackground = this.add
      .image(800, 450, "menu_bg")
      .setOrigin(0.5, 0.5)
      .setScale(0.2, 0.3)
      .setVisible(menuShowing)
      .setInteractive()
      .on("pointerdown", () => null);

    this.idInput = this.add
      .dom(800, 420)
      .createFromCache("form")
      .setVisible(menuShowing);

    this.invalidIdIndicatorText = this.add
      .text(800, 500, "Invalid ID", {
        font: "40px Trebuchet MS",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(invalidIdIndicator);

    this.enterIdButton = this.add
      .image(1000, 500, "home")
      .setOrigin(0.5, 0.5)
      .setScale(0.08)
      .setInteractive()
      .on("pointerdown", () => {
        this.enterIdButton.setScale(0.085);
        setTimeout(() => {
          this.enterIdButton.setScale(0.08);
        }, 100);
        setTimeout(() => {
          var id = this.idInput.getChildByName("id");
          if (id.value.length === 6) {
            this.scene.launch("p2pingameScene", { roomId: id.value });
            menuShowing = !menuShowing;
            invalidIdIndicator = false;
          } else {
            invalidIdIndicator = true;
          }
        }, 150);
      })
      .setVisible(menuShowing);

    // this.idText.on("down", (event) => {
    //   var id = this.idInput.getChildByName("id");
    //   menuShowing = !menuShowing;
    // });
  }

  update() {
    this.musicButton.setTexture(!this.game.sound.mute ? "music" : "music_off");
    this.globalButton.setTexture(window.publicP2P ? "global" : "global_off");
    this.greyoverlay.setVisible(menuShowing);
    this.menubackground.setVisible(menuShowing);
    this.idInput.setVisible(menuShowing);
    this.invalidIdIndicatorText.setVisible(invalidIdIndicator);
    this.enterIdButton.setVisible(menuShowing);
  }
}
