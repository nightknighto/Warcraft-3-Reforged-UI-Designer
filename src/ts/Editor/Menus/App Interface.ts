import { ICallableDivInstance } from "../../Classes & Functions/ICallableDivInstance"

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
    }
}
export class AppInterfaceBrownColors implements ICallableDivInstance {
    run() {
        var elements = document.querySelectorAll<HTMLDivElement>('.panels');
        for(var i=0; i<elements.length; i++){
            elements[i].style.color = "black"
            elements[i].style.backgroundImage = 'none'
        }

        
        var elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground');
        for(var i=0; i<elements.length; i++){
            elements[i].style.backgroundImage = 'none'
        }

        let element = document.getElementById('barTab')
        element.style.backgroundImage = 'none'
        element = document.getElementById('barRibbon')
        element.style.backgroundImage = 'none'
        element = document.getElementById('panelDebug')
        element.style.backgroundImage = 'none'
        
    }
}