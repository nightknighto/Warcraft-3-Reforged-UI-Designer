import { Color, RGBA } from 'custom-electron-titlebar'
import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance"
import { Editor } from "../Editor";

export class AppInterfaceWoodenTexture implements ICallableDivInstance {
    run() {
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
        element = document.getElementById('barTabInner')
        element.style.backgroundColor = 'none'
        element.style.border = 'none'
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
        element = document.getElementById('barTabInner')
        element.style.backgroundColor = '#28160C'
        element.style.border = '2px solid #B87E59'
        element.style.clipPath = 'polygon(0 0, 100% 0, 81% 100%, 0% 100%)';
        element.style.width = "500px"
        element = document.getElementById('originMode')
        element.style.backgroundColor = '#5B4432'
        element.style.border = '6px solid #3A2718'
        element.style.color = 'white';
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
            elements[i].style.backgroundColor = '#951CCF'
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
        element = document.getElementById('barTabInner')
        element.style.backgroundColor = '#480B68'
        element.style.border = '2px solid #D29FEE'
        element.style.clipPath = 'polygon(0% 20%, 0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 0% 80%)';
        element.style.width = "450px"
        element = document.getElementById('originMode')
        element.style.backgroundColor = '#492D56'
        element.style.border = '6px solid #C6D0D9'
        element.style.color = 'white';

    }
}