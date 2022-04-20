export default class SaveContainer {
    private dataContainer = {}

    private static JSONPostProcess(instance: SaveContainer, JSONObject: any): any {
        if (Array.isArray(JSONObject)) {
            const array = []
            for (const object of JSONObject) {
                const newInstance = new SaveContainer(null)
                SaveContainer.JSONPostProcess(newInstance, object)
                array.push(newInstance)
            }
            return array
        } else {
            for (const key in JSONObject) {
                if (key == 'dataContainer') {
                    SaveContainer.JSONPostProcess(instance, JSONObject[key])
                } else if (typeof JSONObject[key] === 'object') {
                    instance.save(key, SaveContainer.JSONPostProcess(instance, JSONObject[key]))
                } else {
                    instance.save(key, JSONObject[key])
                }
            }
        }
    }

    public constructor(jsonString: string | null) {
        if (jsonString != null) {
            SaveContainer.JSONPostProcess(this, JSON.parse(jsonString))

            console.log(this.dataContainer)
        }

        return this
    }

    // eslint-disable-next-line
    public save(key: string, value: any): void {
        if (key == 'dataContainer') {
            console.error('Cannot use dataContainer as key.')
            return
        }
        this.dataContainer[key] = value
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public load(key: string): any {
        if (key == 'dataContainer') {
            console.error('Cannot use dataContainer as key.')
            return
        }
        return this.dataContainer[key]
    }

    public remove(key: string): void {
        if (key == 'dataContainer') {
            console.error('Cannot use dataContainer as key.')
            return
        }
        this.dataContainer[key] = undefined
    }

    public hasKey(key: string): boolean {
        if (key == 'dataContainer') {
            console.error('Cannot use dataContainer as key.')
            return
        }
        return this.dataContainer[key] != undefined
    }

    public exportToJSON(): string {
        return JSON.stringify(this.dataContainer)
    }
}
