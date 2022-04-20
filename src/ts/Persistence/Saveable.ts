import SaveContainer from './SaveContainer'

export default interface Saveable {
    save(container: SaveContainer): void
}
