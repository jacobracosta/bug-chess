export class CellState {
    constructor(refCoord) {
        this.bug = null
        this.top = []
        this.refCoord = refCoord
    }

    isEmpty() {
        return this.bug ? 0 : 1
    }

    emptyCell() {
        this.bug = null
        this.top.length = 0
    }

    removeFromTop(bug) {
        const topIndex = this.top.indexOf(bug)
        if(topIndex != -1) this.top.splice(topIndex,1)
    }
}

export default CellState;