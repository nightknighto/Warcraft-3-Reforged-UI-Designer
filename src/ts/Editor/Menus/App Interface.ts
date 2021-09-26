import { Color, RGBA } from 'custom-electron-titlebar'
import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance"
import { Editor } from "../Editor";

export class AppInterfaceWoodenTexture implements ICallableDivInstance {
    run() {
        Editor.GetDocumentEditor().titleBar.updateBackground(new Color( new RGBA(69,49,26,255)))

        var elements = document.querySelectorAll<HTMLDivElement>('.panels');
        for(var i=0; i<elements.length; i++){
            elements[i].style.color = "white"
            elements[i].style.backgroundImage = "url('./files/WoodenPanels.png')"
        }

        
        var elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground');
        for(var i=0; i<elements.length; i++){
            elements[i].style.backgroundImage = "url(./files/woodenplankHorBig.png)"
        }

        let element = document.getElementById('barTab')
        element.style.backgroundImage = 'url(./files/woodenplankHorBig.png)'
        element = document.getElementById('barRibbon')
        element.style.backgroundImage = 'url(./files/woodenplankHorBig.png)'
        element = document.getElementById('panelDebug')
        element.style.backgroundImage = 'url(./files/woodenplankHorBig.png)'
        element.style.color = 'rgb(248,224,197)'
        element = document.getElementById('barTabInner')
        element.style.backgroundColor = 'unset'
        element.style.border = 'unset'
        element = document.getElementById('barTabImg')
        element.style.visibility = 'hidden'
    }
}
export class AppInterfaceBrownColors implements ICallableDivInstance {
    run() {
        Editor.GetDocumentEditor().titleBar.updateBackground(new Color( new RGBA(69,49,26,255)))

        var elements = document.querySelectorAll<HTMLDivElement>('.panels');
        for(var i=0; i<elements.length; i++){
            elements[i].style.color = "black"
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#ECBD87'
        }

        
        var elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground');
        for(var i=0; i<elements.length; i++){
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#CBB6A1'
        }

        let element = document.getElementById('barTab')
        element.style.backgroundImage = 'none'
        element.style.backgroundColor = '#B87E59'
        element = document.getElementById('barRibbon')
        element.style.backgroundImage = 'none'
        element.style.backgroundColor = '#94471B'
        element = document.getElementById('panelDebug')
        element.style.backgroundImage = 'none'
        element.style.backgroundColor = '#904619'
        element.style.color = 'rgb(248,224,197)'
        element = document.getElementById('barTabInner')
        element.style.backgroundColor = '#28160C'
        element.style.border = '2px solid #B87E59'
        element.style.clipPath = 'polygon(0 0, 100% 0, 81% 100%, 0% 100%)';
        element.style.width = "500px"
        element = document.getElementById('originMode')
        element.style.backgroundColor = '#5B4432'
        element.style.border = '6px solid #3A2718'
        element.style.color = 'white';
        element = document.getElementById('barTabImg')
        element.style.visibility = 'hidden'
    }
}
export class AppInterfacePurpleColors implements ICallableDivInstance {
    run() {
        Editor.GetDocumentEditor().titleBar.updateBackground(new Color( new RGBA(119,45,160,255)))

        var elements = document.querySelectorAll<HTMLDivElement>('.panels');
        for(var i=0; i<elements.length; i++){
            elements[i].style.color = "black"
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#D39EEC'
        }

        
        var elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground');
        for(var i=0; i<elements.length; i++){
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = 'rgb(115, 49, 146)'
        }

        let element = document.getElementById('barTab')
        element.style.backgroundImage = 'none'
        element.style.backgroundColor = '#D29FEE'
        element = document.getElementById('barRibbon')
        element.style.backgroundImage = 'none'
        element.style.backgroundColor = '#733192'
        element = document.getElementById('panelDebug')
        element.style.backgroundImage = 'none'
        element.style.backgroundColor = '#5A3E64'
        element.style.color = 'rgb(248,224,197)'
        element = document.getElementById('barTabInner')
        element.style.backgroundColor = '#480B68'
        element.style.border = '2px solid #D29FEE'
        element.style.clipPath = 'polygon(0% 20%, 0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 0% 80%)';
        element.style.width = "450px"
        element = document.getElementById('originMode')
        element.style.backgroundColor = '#492D56'
        element.style.border = '6px ridge #11819a'
        element.style.color = 'white';
        element = document.getElementById('barTabImg')
        element.style.visibility = 'visible'

    }
}
export class AppInterfaceBlueColors implements ICallableDivInstance {
    run() {
        Editor.GetDocumentEditor().titleBar.updateBackground(new Color( new RGBA(75,90,193,255)))

        var elements = document.querySelectorAll<HTMLDivElement>('.panels');
        for(var i=0; i<elements.length; i++){
            elements[i].style.color = "black"
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#67A2C2'
        }

        
        var elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground');
        for(var i=0; i<elements.length; i++){
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#4057C7'
        }

        let element = document.getElementById('barTab')
        element.style.backgroundImage = 'none'
        element.style.backgroundColor = '#6EADBE'
        element = document.getElementById('barRibbon')
        element.style.backgroundImage = 'none'
        element.style.backgroundColor = '#4057C7'
        element = document.getElementById('panelDebug')
        element.style.backgroundImage = 'none'
        element.style.backgroundColor = '#49539B'
        element.style.color = 'rgb(248,224,197)'
        element = document.getElementById('barTabInner')
        element.style.backgroundColor = '#222B70'
        element.style.border = '2px solid #6EADBE'
        element.style.clipPath = 'polygon(0 0, 100% 0, 81% 100%, 0% 100%)';
        element.style.width = "450px"
        element = document.getElementById('originMode')
        element.style.backgroundColor = '#1B3A4F'
        element.style.border = '6px ridge rgb(78, 114, 140)'
        element.style.color = 'white';
        element = document.getElementById('barTabImg')
        element.style.visibility = 'hidden'

    }
}