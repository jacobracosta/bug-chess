export class CellState {
    constructor() {
        this.bug = null
        this.top = null
    }

    isEmpty() {
        return this.bug ? 1 : 0
    }
}

export default CellState;