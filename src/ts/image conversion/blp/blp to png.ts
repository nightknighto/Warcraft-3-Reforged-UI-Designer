import CustomComplex from "../../Editor/FrameLogic/CustomComplex";
import { BlpImage } from "./blpImage";

export function blp_to_png(file: File, custom: CustomComplex, normal: boolean) {
  
    console.log(file.path)
    const buf = file.arrayBuffer()
    buf.then((buffer) => {try{

      const blp = new BlpImage();
        try {
          blp.load(buffer)
        } catch (e) {
          console.log(`An error occured before the test could finish: ${e}`)
        }

        const imagedata = blp.getMipmap(0)
        
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = imagedata.width;
        canvas.height = imagedata.height;
        ctx.putImageData(imagedata, 0, 0);
        
        if (normal) custom.setDiskTexture(canvas.toDataURL());
        else custom.setBackDiskTexture(canvas.toDataURL());
        
        // var canvasBuffer = require('electron-canvas-to-buffer-fixed')

        // var buffer2 = canvasBuffer(canvas, 'image/png')
        // console.log(buffer2)
        // // write canvas to file
        // writeFile('image.png', buffer2, function (err) {
        //   throw err
        // });

        console.log('finished!!!!')
    }catch(e){console.log('buffer: '+e)}})
}



