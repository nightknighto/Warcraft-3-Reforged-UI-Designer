export enum Language {
    Lua = 'lua',
    Jass = 'jass',
    Typescript = 'ts',
}

export interface IMLTextMulti {
    lua: string[]
    jass: string[]
    ts: string[]
}

export interface IMLTextSingle {
    lua: string
    jass: string
    ts: string
    name?: string
}

export class FrameMLText {
    name: string
    var: IMLTextSingle
    private output: IMLTextMulti

    private constructor(vars: IMLTextSingle) {
        this.var = vars
        this.name = vars.name ?? vars.jass ?? vars.lua ?? vars.ts
        this.output = { ts: [], lua: [], jass: [] }
    }

    /**
     *
     * @param language Choose the language you want to output
     * @param linePrefix Prefix this string to the beginning of each line; applies to first line as well.  Default is ""
     * @param lineSuffix Suffix this string to the end of each line. Default is "\n"
     * @returns string with the entire specified command
     */
    text = (language: Language, linePrefix?: string, lineSuffix = '\n') => {
        const typedIndent = linePrefix ? linePrefix : ''

        return lineSuffix + typedIndent + this.output[language].join(lineSuffix ? lineSuffix + typedIndent : '\n' + typedIndent) + lineSuffix
    }

    /**
     * returns the code as JASS stitching everything together using the prefix and postfix
     * @param linePrefix Prefix this string to the beginning of each line; applies to first line & last line as well.  Default is ""
     * @param lineSuffix Suffix this string to the end of each line and before the start of the code. Default is "\n"
     * @returns JASS String
     */
    jass = (linePrefix?: string, lineSuffix?: string) => {
        return this.text(Language.Jass, linePrefix, lineSuffix)
    }

    /**
     * returns the code as Lua stitching everything together using the prefix and postfix
     * @param linePrefix Prefix this string to the beginning of each line; applies to first line & last line as well.  Default is ""
     * @param lineSuffix Suffix this string to the end of each line and before the start of the code. Default is "\n"
     * @returns LUA String
     */
    lua = (linePrefix?: string, lineSuffix?: string) => {
        return this.text(Language.Lua, linePrefix, lineSuffix)
    }

    /**
     * returns the code as Typscript stitching everything together using the prefix and postfix
     * @param linePrefix Prefix this string to the beginning of each line; applies to first line & last line as well.  Default is ""
     * @param lineSuffix Suffix this string to the end of each line and before the start of the code. Default is "\n"
     * @returns TYPESCRIPT String
     */
    ts = (linePrefix?: string, lineSuffix?: string) => {
        return this.text(Language.Typescript, linePrefix, lineSuffix)
    }

    // All of the following commands can be chained together and generate code in all of the languages
    setAbsPoint = (point: string, x: number | string, y: number | string) => {
        this.output.jass.push(`call BlzFrameSetAbsPoint(${this.var.jass}, ${point}, ${x}, ${y})`)
        this.output.lua.push(`BlzFrameSetAbsPoint(${this.var.lua}, ${point}, ${x}, ${y})`)
        this.output.ts.push(`  .setAbsPoint(${point}, ${x}, ${y})`)
        return this
    }

    setAllPoints = (relativeFrame: FrameMLText | string) => {
        this.output.jass.push(`call BlzFrameSetAllPoints(${this.var.jass}, ${typeof relativeFrame === 'string' ? relativeFrame : relativeFrame.var.jass})`)
        this.output.lua.push(`BlzFrameSetAllPoints(${this.var.jass}, ${typeof relativeFrame === 'string' ? relativeFrame : relativeFrame.var.lua})`)
        this.output.ts.push(`.setAllPoints(${typeof relativeFrame === 'string' ? relativeFrame : relativeFrame.var.ts})`)
        return this
    }

    setTexture = (texFile: string, flag: number | string, blend: boolean | string) => {
        this.output.jass.push(`call BlzFrameSetTexture(${this.var.jass}, ${texFile}, ${flag}, ${blend})`)
        this.output.lua.push(`BlzFrameSetTexture(${this.var.lua}, ${texFile}, ${flag}, ${blend})`)
        this.output.ts.push(`  .setTexture(${texFile}, ${flag}, ${blend})`)
        return this
    }

    setText = (text: string) => {
        this.output.jass.push(`call BlzFrameSetText(${this.var.jass}, ${text})`)
        this.output.lua.push(`BlzFrameSetText(${this.var.lua}, ${text})`)
        this.output.ts.push(`  .setText(${text})`)
        return this
    }

    setValue = (value: number | string) => {
        this.output.jass.push(`call BlzFrameSetValue(${this.var.jass}, ${value})`)
        this.output.lua.push(`BlzFrameSetValue(${this.var.lua}, ${value})`)
        this.output.ts.push(`  .setValue(${value})`)
        return this
    }

    setScale = (value: number | string) => {
        this.output.jass.push(`call BlzFrameSetScale(${this.var.jass}, ${value})`)
        this.output.lua.push(`BlzFrameSetScale(${this.var.lua}, ${value})`)
        this.output.ts.push(`  .setScale(${value})`)
        return this
    }

    setEnabled = (value: boolean | string) => {
        this.output.jass.push(`call BlzFrameSetEnable(${this.var.jass}, ${value})`)
        this.output.lua.push(`BlzFrameSetEnable(${this.var.lua}, ${value})`)
        this.output.ts.push(`  .setEnabled(${value})`)
        return this
    }

    setVisible = (value: boolean | string) => {
        this.output.jass.push(`call BlzFrameSetVisible(${this.var.jass}, ${value})`)
        this.output.lua.push(`BlzFrameSetVisible(${this.var.lua}, ${value})`)
        this.output.ts.push(`  .setVisible(${value})`)
        return this
    }

    setTextAlignment = (vert: string, horz: string) => {
        this.output.jass.push(`call BlzFrameSetTextAlignment(${this.var.jass}, ${vert}, ${horz})`)
        this.output.lua.push(`BlzFrameSetTextAlignment(${this.var.lua}, ${vert}, ${horz})`)
        this.output.ts.push(`BlzFrameSetTextAlignment(${this.var.ts}.handle, ${vert}, ${horz})`)
        return this
    }

    setToolTip = (tooltipFrame: string | this) => {
        this.output.jass.push(`call BlzFrameSetTooltip(${this.var.jass}, ${typeof tooltipFrame === 'string' ? tooltipFrame : tooltipFrame.var.jass})`)
        this.output.lua.push(`BlzFrameSetTooltip(${this.var.lua}, ${typeof tooltipFrame === 'string' ? tooltipFrame : tooltipFrame.var.lua})`)
        this.output.ts.push(`  .setTooltip(${typeof tooltipFrame === 'string' ? tooltipFrame : tooltipFrame.var.lua})`)
        return this
    }

    clear = () => {
        this.output = { jass: [], lua: [], ts: [] }
        return this
    }

    // Static Creations
    static fromOrigin = (originFrame: string, createContext = 0) => {
        const frameText = new FrameMLText({
            jass: `BlzGetOriginFrame(${originFrame}, ${createContext})`,
            lua: `BlzGetOriginFrame(${originFrame}, ${createContext})`,
            ts: `Frame.fromOrigin(${originFrame}, ${createContext})`,
            name: originFrame,
        })
        return frameText
    }

    static fromName = (frameName: string, createContext = 0) => {
        const frameText = new FrameMLText({
            jass: `BlzGetFrameByName(${frameName}, ${createContext})`,
            lua: `BlzGetFrameByName(${frameName}, ${createContext})`,
            ts: `Frame.fromName(${frameName}, ${createContext})`,
            name: frameName,
        })
        return frameText
    }

    static newFrameByType = (
        varName: string,
        name: string,
        owner: FrameMLText | string,
        priority: number,
        createContext: number,
        type: string,
        inherits: string
    ) => {
        const frameText = new FrameMLText({
            jass: `${varName}`,
            lua: `${varName}`,
            ts: `this.${varName}`,
            name: name,
        })
        frameText.output.jass.push(
            `set ${frameText.var.jass} = BlzCreateFrameByType("${type}", "${frameText.name}", ${
                typeof owner === 'string' ? owner : owner.var.jass
            }, "${inherits}", ${createContext})`
        )
        frameText.output.lua.push(
            `${frameText.var.lua} = BlzCreateFrameByType("${type}", "${frameText.name}", ${
                typeof owner === 'string' ? owner : owner.var.lua
            }, "${inherits}", ${createContext})`
        )
        frameText.output.ts.push(
            `${frameText.var.ts} = new Frame("${frameText.name}", ${
                typeof owner === 'string' ? owner : owner.var.ts
            }, ${priority}, ${createContext}, '${type}', "${inherits}")`
        )
        return frameText
    }

    static newFrame = (varName: string, name: string, owner: FrameMLText | string, priority: number, createContext: number) => {
        const frameText = new FrameMLText({
            jass: `${varName}`,
            lua: `${varName}`,
            ts: `this.${varName}`,
            name: name,
        })
        frameText.output.jass.push(
            `set ${frameText.var.jass} = BlzCreateFrame("${frameText.name}", ${typeof owner === 'string' ? owner : owner.var.jass}, ${priority}, ${createContext})`
        )
        frameText.output.lua.push(
            `${frameText.var.lua} = BlzCreateFrame("${frameText.name}", ${typeof owner === 'string' ? owner : owner.var.lua}, ${priority}, ${createContext})`
        )
        frameText.output.ts.push(
            `${frameText.var.ts} = new Frame("${frameText.name}", ${typeof owner === 'string' ? owner : owner.var.ts}, ${priority}, ${createContext})`
        )
        return frameText
    }

    static newEmpty = (varName: string, name = '') => {
        const frameText = new FrameMLText({
            jass: `${varName}`,
            lua: `${varName}`,
            ts: `this.${varName}`,
            name: name,
        })
        return frameText
    }
}
