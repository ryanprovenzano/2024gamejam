import * as GroupConfigs from "./GroupConfigs.js";

export function createTextGroup(scene, x, y, text){
    const arrayOfText = [];
    let hOffset = 0;
    let vOffset = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "\n"){
        hOffset = 0;
        vOffset++;
        continue;
      }
      ;
      arrayOfText.push(scene.add.bitmapText(x + 10 * hOffset, y + 20 * vOffset, 'jgs-20', text[i], 20));
      hOffset++;
    }
    return scene.add.group(arrayOfText, GroupConfigs.BITMAP);
}