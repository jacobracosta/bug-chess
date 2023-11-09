export class Player {
    constructor(color) {
        this.color = color
        this.queenBee = null
        this.antsInPlay = []
        this.hoppersInPlay = []
        this.beetlesInPlay = []
        this.spidersInPlay = []
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