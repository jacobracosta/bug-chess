import Board from "../../gameObjects/board.js"
import getSingleHexMoveLength from "../logic.util.js"

export function checkHopperMove(move, board) {
    return isMoveAStraightHop2(move, board)
}

function isMoveAStraightHop2(move, board){
    const isMoveGood = false
    const [x0,y0] = move.moveBug.coord
    const [x1,y1] = move.destCoord
    const x = x1 - x0
    const y = y1 - y0
    const boardMatrix = board.boardMatrix
    if ( x == 0 ) {
        if(Math.abs(y) > 1) {
            const underCells = boardMatrix[x1]
            for (let i=y0; i < y1; i++) {
                const checkCell = underCells[i]
                if (checkCell.isEmpty()) {
                    isMoveGood = false
                    break
                }
            }
            isMoveGood = true
        } else isMoveGood = false

    } else { //the +x,+y,-x,-y are all relative directional, not literal
        if ( y > 0) {
            if( x > 0) {
                // +x +y [0,0] -> [2,1], [3,1], [4,2], ([5,3])?, [0,1]->[2,2], [3,2]
            } else {
                // -x +y [2,0] -> [0,1], [3,0] -> [0,2],[1,1]
            }
        } else if ( y < 0) {
            if( x > 0) {
                // +x -y [0,1] -> [2,0], [0,2] -> [3,0]
            } else {
                // -x -y [2,1] -> [0,0], [3,2] -> [0,1]
            }
        } else isMoveGood = false
    }
    return isMoveGood
    //same row case, iterate over all cells in between
 

}

function isMoveAStraightHop(move) {
    //trace bugs in the line using their adjacent arrays
    var isMoveGood = false
    var currentBug = move.moveBug
    var nextBug = move.moveBug.adjacentArray[move.destIndex]
    if(nextBug) {
        const moveLength = getSingleHexMoveLength(currentBug, nextBug, move.destIndex)

        //can find a cleaner way of doing this
        if(moveLength == 3) {
            if(nextBug == move.destBug) {
                isMoveGood = true
            } else {
                isMoveGood = true
                while (currentBug != move.destBug) {
                    if(nextBug === null) {
                        isMoveGood = false
                        break
                    }
                    currentBug = nextBug
                    if(currentBug == move.destBug)
                        break
                    nextBug = currentBug.adjacentArray[move.destIndex]
                }
            }
        }
    }
    return isMoveGood
}

export default checkHopperMove;