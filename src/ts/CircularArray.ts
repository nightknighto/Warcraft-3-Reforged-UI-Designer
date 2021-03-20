import { ipcRenderer } from "electron"

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace CircularArray {
    
    const submit = document.getElementById('submit') as HTMLInputElement
    const radius = document.getElementById('radius') as HTMLInputElement
    const count = document.getElementById('count') as HTMLInputElement
    const initAng = document.getElementById('initAng') as HTMLInputElement

    radius.value = '0.1'
    count.value = '6'
    initAng.value = '0'

    submit.onclick = () => {try{
        //conditions plz
        if(+radius.value <= 0 || +radius.value > .4 || +count.value <= 0 || +initAng.value < 0 || +initAng.value > 360) {

            if(+radius.value <= 0 || +radius.value > .4) {radius.value = ""}
            if(+count.value <= 0) {count.value = ''}
            if(+initAng.value < 0 || +initAng.value > 360) {initAng.value = ''}
            return;
        }

        ipcRenderer.send('CircularArraySubmit', [radius.valueAsNumber, count.valueAsNumber, initAng.valueAsNumber])
        window.close()
    }catch(e){alert(e)}}

}