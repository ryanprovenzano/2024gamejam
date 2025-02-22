import * as Util from "./util.js";

class FirstScene extends Phaser.Scene {
  constructor() {
    super("FirstScene");
    this.player;
    this.movingPlatform;
    this.movingPlatform2;
    this.importantCollider;
  }

  preload() {
    this.load.bitmapFont(
      "jgs-10",
      "assets/fonts/jgs-test10.png",
      "assets/fonts/jgs-test10.xml"
    ); //use at 10px size
    this.load.bitmapFont(
      "jgs-20",
      "assets/fonts/jgs-test20.png",
      "assets/fonts/jgs-test20.xml"
    ); //use at 20px size
  }

  create() {
    /*
      this way of adding rectangle to scene is a lot more annoying
      const rect2 = new Phaser.GameObjects.Rectangle(this, 300, 300, 200, 100, 0xff0000 )
      rect2.addToDisplayList();
      */

    this.player = this.add.rectangle(500, 40, 20, 20, 0x656eeb);
    this.physics.add.existing(this.player);
    console.log(this.player.body);

    

    // Parameters: x, y, font key, text to display, font size (should match the bitmapfile's font size)
    let text = this.add.bitmapText(
      200,
      300,
      "jgs-20",
      "Well it is working. I need this line to be longer though",
      20
    );
    this.add.bitmapText(
      200,
      150,
      "jgs-20",
      "Uhhh why is this shit upside down",
      20
    );
    this.add.bitmapText(
      100,
      300,
      "jgs-20",
      "Testing text iteration with loops.\nNeed to make sure it works longerrrr.",
      20
    );

    var textGroup = Util.createDynamicTextGroup(
      this,
      "Testing text iteration with loops.\nNeed to make sure it works longerrrr.",
      100,
      400
    );
    this.movingPlatform = Util.createDynamicTextGroup(
      this,
      100,
      275,
      `╔═════════════════╗
║                 ║
║                 ║
║                 ║
║                 ║
║                 ║
╚═════════════════╝`
    );
    console.log(this.movingPlatform);
    this.importantCollider = this.physics.add.collider(
      this.player,
      this.movingPlatform
    );
    
    for (let child of this.movingPlatform.getChildren()){
      child.body.moves = false; // Whether the Body's position and rotation are affected by its velocity, acceleration, drag, and gravity.
    }
    console.log(textGroup);

    this.movingPlatform2 = this.add.bitmapText(
      100,
      400,
      "jgs-20",
      `╔═════════════════╗
║                 ║
║                 ║
║                 ║
║                 ║
║                 ║
╚═════════════════╝`,
      20
    );
    //text3.setLetterSpacing(0); does nothing, but is valid code
    console.log(this.movingPlatform);


    /**@type {Phaser.Physics.Arcade.StaticGroup} */
    let platforms = this.physics.add.staticGroup();
    
    /**@type {Phaser.GameObjects.Rectangle} */
    const rect = this.add.rectangle(400, 400, 400, 10, 0xff0000);
    platforms.add(rect);
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
    this.movingPlatform2.x = this.movingPlatform2.x + 3;
    if (this.player.body.blocked.down) {
      //text.setText("asdas           asdasd");
      //text.body.updateBounds(); doesn't do anything here
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
