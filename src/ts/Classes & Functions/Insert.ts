/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-namespace */
import { ipcRenderer } from "electron";
import { CustomImage } from "./CustomImage";
import { ImageFunctions } from "./ImageFunctions";

/**kinds: 0 for declare, 1 for backdrop and Inserts? */
export namespace Insert {
    export function Init() {
        ipcRenderer.on('Insert', (e,i) => {
            const el = document.createElement('img')
            let src = './files/images/'
            switch (i) {
                case 0:
                        
                    src += 'ScriptDialogButton.png'
                    break; 
                case 1:
                        
                    src += 'BrowserButton.png'
                    break;
                case 2:
                        
                    src += 'QuestCheckBox.png'
                    break;
                case 3:
            
                                
                    src += 'CheckListBox.png'
                break;
                case 4:
                                
                    src += 'OptionsPopupMenuBackdropTemplate.png'
                break;
                case 5:
                                
                    src += 'QuestButtonBaseTemplate.png'
                break;
                case 6:
                                
                    src += 'QuestButtonPushedBackdropTemplate.png'
                break;
                case 7:
                                
                    src += 'QuestButtonDisabledBackdropTemplate.png'
                break;
                case 8:
                                
                    src += 'EscMenuBackdrop.png'
                break;
                case 9:
                                    
                    src += ''
                break;
                case 10:

            }
            const img = new CustomImage(el, src)
            let type = src.slice(15)
            type = type.slice(0,type.length-4)
            img.type = type
            img.typeEditable = false;

            ImageFunctions(img,0,0,0,0)
        })
    }
}