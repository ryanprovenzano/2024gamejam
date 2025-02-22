import * as GroupConfigs from "./GroupConfigs.js";

//TODO: This function should not create a character when the character is blank(null) 
export function createDynamicTextGroup(scene, x, y, text){
    const arrayOfText = [];
    let hOffset = 0;
    let vOffset = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "\n"){
        hOffset = 0;
        vOffset++;
        continue;
      }
      
      if(text[i] != " "){
        arrayOfText.push(scene.add.bitmapText(x + 10 * hOffset, y + 20 * vOffset, 'jgs-20', text[i], 20));
      }
      hOffset++;
    }
    const group = scene.add.group(arrayOfText, GroupConfigs.BITMAP)
    scene.physics.world.enable(group, 0); //1 for static body, 0 for dynamic body. Since this text moves, it needs to be a dynamic body.
    return group;
}