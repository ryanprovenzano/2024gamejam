import * as Util from "./util.js";

class FirstScene extends Phaser.Scene {
  constructor() {
    super("FirstScene");
    this.player;
    this.movingPlatform;
    this.movingPlatform2;
    this.importantCollider;
    this.font1;
    this.font2;
    this.unnamedTestGroup;
    this.myTime = 0;
  }

  preload() {
    this.load.bitmapFont(
      "jgs5-20",
      "assets/fonts/jgs5-20px.png",
      "assets/fonts/jgs5-20px.xml"
    ); //use at 20px size
    this.load.bitmapFont(
      "cp437-20",
      "assets/fonts/cp437-20px.png",
      "assets/fonts/cp437-20px.xml"
    ); //use at 20px size
    this.load.bitmapFont(
      "qbic-10",
      "assets/fonts/qbicfeet-10px.png",
      "assets/fonts/qbicfeet-10px.xml"
    ); //use at 20px size
    this.font1 = "qbic-10";
    this.font2 = "cp437-20";
    this.font3 = "jgs5-20";
    this.load.text("sad_guy", "assets/sad_guy.txt");
    this.load.text("poo", "assets/poo.txt");
    this.load.text("enemy", "assets/enemy.txt");
    this.load.text("box", "assets/box.txt");
    this.load.text("player", "assets/player.txt");
    this.load.text("unnamed", "assets/unnamed.txt");
  }

  create() {
    /*
      this way of adding rectangle to scene is a lot more annoying
      const rect2 = new Phaser.GameObjects.Rectangle(this, 300, 300, 200, 100, 0xff0000 )
      rect2.addToDisplayList();
      */
    // a way of adding rectangles to the scene;   this.player = this.add.rectangle(500, 40, 20, 40, 0x656eeb);
    this.player = Util.createDynamicTextGroup(
      this,
      400,
      0,
      this.font1,
      `▼        ▼
▼   DD   ▼
▼▼ DDDD ▼▼
 ▼[    ]▼
  [ DD ]
  [[  ]]
   [▼▼]
    ▼▼`
    );
    console.log(this.player);
    this.physics.add.existing(this.player);
    console.log(this.player.body);

    // Parameters: x, y, font key, text to display, font size (should match the bitmapfile's font size)
    let text = this.add.bitmapText(
      500,
      300,
      this.font1,
      String.fromCharCode(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
      10
    );
    this.add.bitmapText(
      200,
      150,
      this.font1,
      "Uhhh why is this shit upside down↑↑↑↑↑↑☺☻☻☻☻☻☻☻☻☻",
      10
    );
    this.add.bitmapText(
      100,
      300,
      this.font1,
      "Testing text iteration with loops.\nNeed to make sure it works longerrrr.",
      10
    );

    this.add.bitmapText(
      100,
      50,
      this.font1,
      String.fromCharCode(
        219,
        219,
        219,
        219,
        245,
        186,
        178,
        157,
        198,
        94,
        94,
        94,
        24,
        24
      ),
      10
    );

    let textGroup = Util.createDynamicTextGroup(
      this,
      100,
      400,
      this.font1,
      "Testing text iteration with loops.\nNeed to make sure it works longerrrr."
    );

    this.unnamedTestGroup = Util.createDynamicTextGroup(
      this,
      0,
      0,
      this.font2,
      this.cache.text.get("unnamed")
    );

    let sadGuy = Util.createDynamicTextGroup(
      this,
      100,
      0,
      this.font1,
      this.cache.text.get("sad_guy")
    );

    let poo = Util.createDynamicTextGroup(
      this,
      500,
      200,
      this.font1,
      this.cache.text.get("poo")
    );

    let enemy = Util.createDynamicTextGroup(
      this,
      300,
      50,
      this.font1,
      this.cache.text.get("enemy")
    );

    this.movingPlatform = Util.createDynamicTextGroup(
      this,
      100,
      275,
      this.font1,
      this.cache.text.get("box")
    );
    console.log(this.movingPlatform);
    this.importantCollider = this.physics.add.collider(
      this.player,
      this.movingPlatform
    );

    for (let child of this.movingPlatform.getChildren()) {
      child.body.moves = false; // Whether the Body's position and rotation are affected by its velocity, acceleration, drag, and gravity.
    }

    this.movingPlatform2 = Util.createDynamicTextGroup(
      this,
      100,
      450,
      this.font1,
      this.cache.text.get("enemy")
    );
    for (let child of this.movingPlatform2.getChildren()) {
      child.body.moves = false; // Whether the Body's position and rotation are affected by its velocity, acceleration, drag, and gravity.
    }

    //text3.setLetterSpacing(0); does nothing, but is valid code
    console.log(this.movingPlatform);

    /**@type {Phaser.Physics.Arcade.StaticGroup} */
    let platforms = this.physics.add.staticGroup();

    /**@type {Phaser.GameObjects.Rectangle} */
    const redRect = this.add.rectangle(400, 400, 400, 10, 0xff0000);
    platforms.add(redRect);
    this.physics.add.existing(text, true); //Static body here appears to be sufficient, since the text never moves.

    //can pass Group (static group in this case) to the collider
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, text);
  }

  update() {
    //console.log(text.width);
    //console.log(text.body);
    //console.log(player.body.blocked.down);
    //console.log(this.player);
    this.movingPlatform.incX(3);
    this.movingPlatform2.incX(6);
    // TODO(?): needs to be redoneif (this.player.body.blocked.down) {
    //text.setText("asdas           asdasd");
    //text.body.updateBounds(); doesn't do anything here
    this.unnamedTestGroup.children.entries[this.myTime].body.setAllowGravity(true);
    if (this.myTime < (this.unnamedTestGroup.children.size - 1)){
      this.myTime++;
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
    },
  },
  scene: FirstScene,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
const game = new Phaser.Game(config);
