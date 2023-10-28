import getSingleHexMoveLength from "../logic.util.js"

export function checkHopperMove(move) {
    let bIsMoveGood = false
    bIsMoveGood = isMoveAStraightHop(move)
    return bIsMoveGood
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