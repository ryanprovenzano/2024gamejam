const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};




const game = new Phaser.Game(config);
let player;
let text;
let text2;
let text3;
let text4;

function preload () {
    this.load.image('test', 'assets/Painting_catastrophe.jpg');
    this.load.bitmapFont('testFont', 'assets/fonts/test-font.png', 'assets/fonts/test-font.xml');
    this.load.bitmapFont('testFont2', 'assets/fonts/spacing-test.png', 'assets/fonts/spacing-test.xml');
    this.load.bitmapFont('jgs-10', 'assets/fonts/jgs-test10.png', 'assets/fonts/jgs-test10.xml') //use at 10px size
    this.load.bitmapFont('jgs-20', 'assets/fonts/jgs-test20.png', 'assets/fonts/jgs-test20.xml') //use at 20px size
    

}
function create () {

    /*
    this way of adding rectangle to scene is a lot more annoying
    const rect2 = new Phaser.GameObjects.Rectangle(this, 300, 300, 200, 100, 0xff0000 )
    rect2.addToDisplayList();
    */
    
   

    player = this.add.rectangle(500, 100, 20, 20, 0x656eeb);
    this.physics.add.existing(player);
    console.log(player.body);

    /**@type {Phaser.Physics.Arcade.StaticGroup} */
    let platforms = this.physics.add.staticGroup();
    

    function createText(scene, text, x, y){
      let hOffset = 0;
      let vOffset = 0;
      for (let i = 0; i < text.length; i++) {
        if (text[i] == "\n"){
          hOffset = 0;
          vOffset++;
          continue;
        }
        scene.add.bitmapText(x + 10 * hOffset, y + 20 * vOffset, 'jgs-20', text[i], 20);
        hOffset++;
      }
    }


    // Parameters: x, y, font key, text to display, font size (should match the bitmapfile's font size)
    text = this.add.bitmapText(200, 200, 'testFont', 'Hel     lllllllll    llllllll    lllllsdf lo wo  r  ld\nadsasd', 28);
    text2 = this.add.bitmapText(200, 50, 'testFont2', 'Hel     lllllllll    llllllll    lllllsdf lo wo  r  ld\nadsasd', 28);
    text3 = this.add.bitmapText(200, 25, 'jgs-10', 'Uhhh why is this shit upside down', 10);
    text4 = this.add.bitmapText(200, 150, 'jgs-20', 'Uhhh why is this shit upside down', 20);
    this.add.bitmapText(100, 400, 'jgs-20', "Testing text iteration with loops.\n Need to make sure it works longerrrr.", 20);
    createText(this, "Testing text iteration with loops.\n Need to make sure it works longerrrr.", 100, 500);
    //text3.setLetterSpacing(0); does nothing, but is valid code

    
   

    


    /**@type {Phaser.GameObjects.Rectangle} */
    const rect = this.add.rectangle(400, 300, 400, 10, 0xff0000);
    platforms.add(rect);
    this.physics.add.existing(text);
    text.body.setImmovable();
    text.body.moves = false;
    text.body.syncBounds = true; //this is what we needed do to get the text's collider to change when the text did
    
    //can pass Group (static group in this case) to the collider
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, text);
    


}   

function update () {
    //console.log(text.width);
    //console.log(text.body);
    //console.log(player.body.blocked.down);
    if(player.body.blocked.down) {
        //text.setText("asdas           asdasd");
        //text.body.updateBounds(); doesn't do anything here
        
        
    }
}