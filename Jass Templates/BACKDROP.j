globals
//start copying
    framehandle FRvar = null;
//end copying
endglobals

library REFORGEDUIMAKER initializer init
    private function init takes nothing returns nothing
    //starts copying
        set FRvar = BlzCreateFrameByType("BACKDROP", "FRvar", OWNERvar, "", 1)
        call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_TOPLEFT, TOPLEFTXvar, TOPLEFTYvar)
        call BlzFrameSetAbsPoint(FRvar, FRAMEPOINT_BOTTOMRIGHT, BOTRIGHTXvar, BOTRIGHTYvar)
        call BlzFrameSetTexture(FRvar, PATHvar, 0, true)
    //end copying
    endfunction
endlibrary
