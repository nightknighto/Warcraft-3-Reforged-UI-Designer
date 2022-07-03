import { Color, RGBA } from 'custom-electron-titlebar'
import { ICallableDivInstance } from '../../ClassesAndFunctions/ICallableDivInstance'
import { Editor } from '../Editor'
import { ProjectTree } from '../ProjectTree'

export enum AppInterfaces {
    wood = 0,
    brown = 1,
    purple = 2,
    blue = 3,
    dark = 4,
}

export class AppUIWoodenTexture implements ICallableDivInstance {
    private static instance: AppUIWoodenTexture
    static getInstance() {
        if (!AppUIWoodenTexture.instance) AppUIWoodenTexture.instance = new AppUIWoodenTexture()
        return AppUIWoodenTexture.instance
    }

    static texturedComponents = [
        document.getElementById('barTab') as HTMLElement,
        document.getElementById('barRibbon') as HTMLElement,
        document.getElementById('barTools') as HTMLElement,
        document.getElementById('panelDebug') as HTMLElement
    ]

    private constructor() {
        // Empty
    }
    run() {
        Editor.getInstance().titleBar.updateBackground(new Color(new RGBA(69, 49, 26, 255)))

        let elements = document.querySelectorAll<HTMLDivElement>('.panels')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color = 'rgb(248, 224, 197)'
            elements[i].style.backgroundImage = "url('./files/WoodenPanels.png')"
        }

        elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundImage = 'url(./files/woodenplankHorBig.png)'
        }

        for(let element of AppUIWoodenTexture.texturedComponents) {
            element.style.backgroundImage = 'url(./files/woodenplankHorBig.png)'
        }
        
        document.getElementById('panelDebug').style.color = 'rgb(248,224,197)'

        let element = document.getElementById('barTabInner') as HTMLElement
        element.style.backgroundColor = 'unset'
        element.style.border = 'unset'
        element = document.getElementById('barTabImg') as HTMLElement
        element.style.visibility = 'hidden'

        ProjectTree.AppInterface = AppInterfaces.wood
    }
}
export class AppUIBrownColors implements ICallableDivInstance {
    private static instance: AppUIBrownColors
    static getInstance() {
        if (!AppUIBrownColors.instance) AppUIBrownColors.instance = new AppUIBrownColors()
        return AppUIBrownColors.instance
    }

    private constructor() {
        // Empty
    }
    run() {
        Editor.getInstance().titleBar.updateBackground(new Color(new RGBA(69, 49, 26, 255)))

        let elements = document.querySelectorAll<HTMLDivElement>('.panels')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color = 'black'
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#ECBD87'
        }

        elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#CBB6A1'
        }

        for(let element of AppUIWoodenTexture.texturedComponents) {
            element.style.backgroundImage = 'none'
        }

        document.getElementById('barTab').style.backgroundColor = '#B87E59'
        document.getElementById('barTools').style.backgroundColor = '#B87E59'
        document.getElementById('barRibbon').style.backgroundColor = '#94471B'

        let element = document.getElementById('panelDebug') as HTMLElement
        element.style.backgroundColor = '#904619'
        element.style.color = 'rgb(248,224,197)'
        element = document.getElementById('barTabInner') as HTMLElement
        element.style.backgroundColor = '#28160C'
        element.style.border = '2px solid #B87E59'
        element.style.clipPath = 'polygon(0 0, 100% 0, 81% 100%, 0% 100%)'
        element.style.width = '600px'
        element = document.getElementById('originMode') as HTMLElement
        element.style.backgroundColor = '#5B4432'
        element.style.border = '6px solid #3A2718'
        element.style.color = 'rgb(248, 224, 197)'
        element = document.getElementById('barTabImg') as HTMLElement
        element.style.visibility = 'hidden'

        ProjectTree.AppInterface = AppInterfaces.brown
    }
}
export class AppUIPurpleColors implements ICallableDivInstance {
    private static instance: AppUIPurpleColors
    static getInstance() {
        if (!AppUIPurpleColors.instance) AppUIPurpleColors.instance = new AppUIPurpleColors()
        return AppUIPurpleColors.instance
    }

    private constructor() {
        // Empty
    }
    run() {
        Editor.getInstance().titleBar.updateBackground(new Color(new RGBA(119, 45, 160, 255)))

        let elements = document.querySelectorAll<HTMLDivElement>('.panels')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color = 'black'
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#D39EEC'
        }

        elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = 'rgb(115, 49, 146)'
        }

        for(let element of AppUIWoodenTexture.texturedComponents) {
            element.style.backgroundImage = 'none'
        }

        document.getElementById('barTab').style.backgroundColor = '#D29FEE'
        document.getElementById('barRibbon').style.backgroundColor = '#733192'
        document.getElementById('barTools').style.backgroundColor = '#733192'

        let element = document.getElementById('panelDebug') as HTMLElement
        element.style.backgroundColor = '#5A3E64'
        element.style.color = 'rgb(248,224,197)'
        element = document.getElementById('barTabInner') as HTMLElement
        element.style.backgroundColor = '#480B68'
        element.style.border = '2px solid #D29FEE'
        element.style.clipPath = 'polygon(0% 20%, 0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 0% 80%)'
        element.style.width = '550px'
        element = document.getElementById('originMode') as HTMLElement
        element.style.backgroundColor = '#492D56'
        element.style.border = '6px ridge #11819a'
        element.style.color = 'rgb(248, 224, 197)'
        element = document.getElementById('barTabImg') as HTMLElement
        element.style.visibility = 'visible'

        ProjectTree.AppInterface = AppInterfaces.purple
    }
}
export class AppUIBlueColors implements ICallableDivInstance {
    private static instance: AppUIBlueColors
    static getInstance() {
        if (!AppUIBlueColors.instance) AppUIBlueColors.instance = new AppUIBlueColors()
        return AppUIBlueColors.instance
    }

    private constructor() {
        // Empty
    }
    run() {
        Editor.getInstance().titleBar.updateBackground(new Color(new RGBA(75, 90, 193, 255)))

        let elements = document.querySelectorAll<HTMLDivElement>('.panels')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color = 'black'
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#67A2C2'
        }

        elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#4057C7'
        }

        for(let element of AppUIWoodenTexture.texturedComponents) {
            element.style.backgroundImage = 'none'
        }

        document.getElementById('barTab').style.backgroundColor = '#6EADBE'
        document.getElementById('barRibbon').style.backgroundColor = '#4057C7'
        document.getElementById('barTools').style.backgroundColor = '#4057C7'

        let element = document.getElementById('panelDebug') as HTMLElement
        element.style.backgroundColor = '#49539B'
        element.style.color = 'rgb(248,224,197)'
        element = document.getElementById('barTabInner') as HTMLElement
        element.style.backgroundColor = '#222B70'
        element.style.border = '2px solid #6EADBE'
        element.style.clipPath = 'polygon(0 0, 100% 0, 81% 100%, 0% 100%)'
        element.style.width = '600px'
        element = document.getElementById('originMode') as HTMLElement
        element.style.backgroundColor = '#1B3A4F'
        element.style.border = '6px ridge rgb(78, 114, 140)'
        element.style.color = 'rgb(248, 224, 197)'
        element = document.getElementById('barTabImg') as HTMLElement
        element.style.visibility = 'hidden'

        ProjectTree.AppInterface = AppInterfaces.blue
    }
}

export class AppUIDarkColors implements ICallableDivInstance {
    private static instance: AppUIDarkColors
    static getInstance() {
        if (!AppUIDarkColors.instance) AppUIDarkColors.instance = new AppUIDarkColors()
        return AppUIDarkColors.instance
    }

    private constructor() {
        // Empty
    }

    run() {
        Editor.getInstance().titleBar.updateBackground(new Color(new RGBA(0, 0, 0, 255)))

        let elements = document.querySelectorAll<HTMLDivElement>('.panels')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color = 'rgb(248, 224, 197)'
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#312B2B'
        }

        elements = document.querySelectorAll<HTMLDivElement>('.panelDebugBackground')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundImage = 'none'
            elements[i].style.backgroundColor = '#433D3D'
        }

        for(let element of AppUIWoodenTexture.texturedComponents) {
            element.style.backgroundImage = 'none'
        }

        document.getElementById('barTab').style.backgroundColor = '#827877'
        document.getElementById('barRibbon').style.backgroundColor = '#454140'
        document.getElementById('barTools').style.backgroundColor = '#454140'

        let element = document.getElementById('panelDebug') as HTMLElement
        element.style.backgroundColor = '#24130B'
        element.style.color = 'rgb(248,224,197)'
        element = document.getElementById('barTabInner') as HTMLElement
        element.style.backgroundColor = '#312B2B'
        element.style.border = '2px solid #827877'
        element.style.clipPath = 'polygon(0 0, 100% 0, 81% 100%, 0% 100%)'
        element.style.width = '600px'
        element = document.getElementById('originMode') as HTMLElement
        element.style.backgroundColor = '#827877'
        element.style.border = '6px ridge rgb(160, 68, 37)'
        element.style.color = 'rgb(248, 224, 197)'
        element = document.getElementById('barTabImg') as HTMLElement
        element.style.visibility = 'hidden'

        ProjectTree.AppInterface = AppInterfaces.dark
    }
}
