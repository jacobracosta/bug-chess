export class CellState {
    constructor(refCoord) {
        this.bug = null
        this.top = null
        this.refCoord = refCoord
    }

    isEmpty() {
        return this.bug ? 1 : 0
    }
}

export default CellState;