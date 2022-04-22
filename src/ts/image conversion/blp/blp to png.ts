import { BlpImage } from './blpImage'

export function blp_to_png(buffer: ArrayBuffer) {
    try {
        const blp = new BlpImage()
        try {
            blp.load(buffer)
        } catch (e) {
            console.log(`An error occurred before the test could finish: ${e}`)
        }

        const imagedata = blp.getMipmap(0)

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = imagedata.width
        canvas.height = imagedata.height
        ctx.putImageData(imagedata, 0, 0)

        const imageString = canvas.toDataURL()
        canvas.remove()
        return imageString

        // //note: "electron-canvas-to-buffer" was uninstalled. Also, is bugged. Look into its issues.
        // var canvasBuffer = require('electron-canvas-to-buffer-fixed')

        // var buffer2 = canvasBuffer(canvas, 'image/png')
        // console.log(buffer2)
        // // write canvas to file
        // writeFile('image.png', buffer2, function (err) {
        //   throw err
        // });
    } catch (e) {
        console.log('buffer: ' + e)
    }
}
