import { ipcRenderer } from "electron"

const submit = document.getElementById('submit') as HTMLInputElement
const rows = document.getElementById('rows') as HTMLInputElement
const columns = document.getElementById('columns') as HTMLInputElement
const gapX = document.getElementById('gapX') as HTMLInputElement
const gapY = document.getElementById('gapY') as HTMLInputElement

rows.value = '3'
columns.value = '2'
gapX.value = '0.1'
gapY.value = '0.1'

submit.onclick = () => {try{
    //conditions plz

    ipcRenderer.send('TableArraySubmit', [rows.valueAsNumber, columns.valueAsNumber, gapX.valueAsNumber, gapY.valueAsNumber])
    window.close()
}catch(e){alert(e)}}