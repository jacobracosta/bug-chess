export class Player {
    constructor(isFirst) {
        this.isFirst = isFirst
        this.queenBee = null
        this.ants = []
        this.hoppers = []
        this.beetles = []
        this.spiders = []
    }

    setQueen(bug) {
        this.queenBee = bug
    }
    
    isQueenSurrounded(board) {
        let isQueenSurrounded = false
        if(this.queenBee) {
            const refCoord = this.queenBee.coord
            const emptyCellsAroundQueen = board.getNumberOfEmptyCellsAroundCoord(refCoord)
            if(emptyCellsAroundQueen == 0) isQueenSurrounded = true
        }
        return isQueenSurrounded
    }
}

export default Player