export class Player {
    constructor(color, isFirst) {
        this.color = color
        this.queenBee = null
        this.ants = []
        this.hoppers = []
        this.beetles = []
        this.spiders = []
        this.isFirst = isFirst
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