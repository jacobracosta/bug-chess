import getSingleHexMoveLength from "../logic.util.js"

export function checkHopperMove(move) {
    return isMoveAStraightHop2(move)
}

function isMoveAStraightHop2(move, board){
    const isMoveGood = false
    const [x0,y0] = move.moveBug.location
    const [x1,y1] = move.destIndex
    const x = x1 - x0
    const y = y1 - y0
    if ( y > 0) {
        if( x > 0) {

        } else {

        }
    } else if ( y < 0) {
        if( x > 0) {

        } else {
            
        }
    } else isMoveGood = false
    return isMoveGood
    //same row case, iterate over all cells in between
    // +x -y [0,0] -> [2,1], [3,1]
    // +x +y [2,0] -> [0,1]
    // -x +y [2,1] -> [0,0]
    // -x -y [0,1] -> [2,0]

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