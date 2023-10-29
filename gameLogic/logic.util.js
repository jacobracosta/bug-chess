
export function getSingleHexMoveLength(moveBug, staticBug, destIndex) { //need better name
    //need protection here if staticBug doesn't have an entry matching movebug?
    return(Math.abs(destIndex - staticBug.adjacentArray.indexOf(moveBug)))
}

export function isMoveOneHex(move) {
    const moveLength = getSingleHexMoveLength(move.moveBug, move.destBug, move.destIndex)
    if( moveLength == 1 || moveLength == 5) return true //equal to 5 only when moving from 0 to 5, or 5 to 0
    else return false
}

export function checkSingleHexMove(move) {
    let bIsMoveGood = false
    if(move.moveBug.isAdjacentToBug(move.destBug)) {
        bIsMoveGood = isMoveOneHex(move)
    }
    return bIsMoveGood
}

export default getSingleHexMoveLength;