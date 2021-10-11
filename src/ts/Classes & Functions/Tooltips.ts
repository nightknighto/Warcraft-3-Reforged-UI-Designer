import tippy from "tippy.js";

export class Tooltips {

    static TooltipFunc = tippy('#ElementInfoFunc', {
        content: `This is successful. It has a lot of information about functionality for the
        selected element. its really great. <hr>call BlzFrameSetText(framename, text) to set the text of the variable`,
        allowHTML: true,
        interactive: true,
        placement: "right-start",
        zIndex: 9999,
        appendTo: document.body,
        theme: "light",
        maxWidth: 500

    })
    
    static TooltipDesc = tippy('#ElementInfoDesc', {
        content: `This is successful. It has a lot of information about functionality for the
        selected element. its really great. <hr>call BlzFrameSetText(framename, text) to set the text of the variable`,
        allowHTML: true,
        interactive: true,
        placement: "right",
        zIndex: 9999,
        appendTo: document.body,
        theme: "light"

    })
}