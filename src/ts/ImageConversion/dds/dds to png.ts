import { DdsImage, getDdsMipmap } from './ddsImage'

export function dds_to_png(buffer: ArrayBuffer) {
    try {
        const dds = new DdsImage()
        try {
            dds.load(buffer)
        } catch (e) {
            console.log(`An error occured before the test could finish: ${e}`)
        }

        const imagedata = getDdsMipmap(dds, 0)

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = imagedata.width
        canvas.height = imagedata.height
        ctx?.putImageData(imagedata, 0, 0)

        const imageString = canvas.toDataURL()
        canvas.remove()
        return imageString

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
