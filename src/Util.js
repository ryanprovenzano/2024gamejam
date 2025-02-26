import * as GroupConfigs from "./GroupConfigs.js";

var physicsConf = {
  allowGravity: false,
  immovable: true
};
const containsWhitespace = str => /\s/.test(str);
export function createDynamicTextGroup(scene, x, y, font, text, active=true){
    const arrayOfText = [];
    let hOffset = 0;
    let vOffset = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "\n"){
        hOffset = 0;
        vOffset++;
        continue;
      }
      
      if(!containsWhitespace(text[i])){
        arrayOfText.push(scene.add.bitmapText(x + 10 * hOffset, y + 10 * vOffset, font, text[i], 10).setActive(active));
      }
      hOffset++;
    }
    const group = scene.add.group(arrayOfText, GroupConfigs.BITMAP) // Game group object
    const physGroup = scene.physics.add.group(arrayOfText); //.group() for dynamic group; .staticGroup() for static groups // physics group
    for (let text of physGroup.children.entries){
      text.body.setAllowGravity(false)
    }
    console.log(group)
    return physGroup;
}