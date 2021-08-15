import { ipcRenderer } from "electron"

const submit = document.getElementById('submit') as HTMLInputElement
const rows = document.getElementById('rows') as HTMLInputElement
const columns = document.getElementById('columns') as HTMLInputElement
const gapX = document.getElementById('gapX') as HTMLInputElement
const gapY = document.getElementById('gapY') as HTMLInputElement
const chPar = document.getElementById('checkParent') as HTMLInputElement
const chSel = document.getElementById('selectParent') as HTMLSelectElement

rows.value = '3'
columns.value = '2'
gapX.value = '0.05'
gapY.value = '0.05'

chPar.onchange = ( () => {
    if(chPar.checked) {
        rows.value = ''
        columns.value = ''
        // gapX.value = ''
        // gapY.value = ''

        rows.disabled = true
        columns.disabled = true
        // gapX.disabled = true
        // gapY.disabled = true

        chSel.style.display = "initial"

    } else {
        rows.value = '3'
        columns.value = '2'
        // gapX.value = '0.05'
        // gapY.value = '0.05'

        rows.disabled = false
        columns.disabled = false
        // gapX.disabled = false
        // gapY.disabled = false

        chSel.style.display = "none"
    }
})

submit.onclick = () => {
    try {
        //conditions plz
        if (+rows.value <= 0 || +columns.value <= 0 || +gapX.value <= 0 || +gapY.value <= 0) {

            if (+rows.value <= 0) { rows.value = "" }
            if (+columns.value <= 0) { columns.value = '' }
            if (+gapX.value <= 0) { gapX.value = '' }
            if (+gapY.value <= 0) { gapY.value = '' }
            return;
        }

        
        if (+rows.value > 10 || +columns.value > 10) {

            if (+rows.value > 10) { rows.value = "" }
            if (+columns.value > 10) { columns.value = '' }
            alert("Max Limit: 10 rows/columns")
            return;
        }

        ipcRenderer.send('TableArraySubmit', [rows.valueAsNumber, columns.valueAsNumber, gapX.valueAsNumber, gapY.valueAsNumber])
        window.close()
    } catch (e) { alert(e) }
}