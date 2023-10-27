import getSingleHexMoveLength from "../logic.util.js"

//could maybe simplfy/consolidate to "checkSingleHexMove" and use that for the beetle as well
export function checkQueenBeeMove(move) {
    let bIsMoveGood = false
    if(areBugsAdjacent(move)) {
        bIsMoveGood = isMoveOneHex(move)
    //} else {
      //  bIsMoveGood = false
    }
    return bIsMoveGood
    //check if move is to another side on the same bug
    //if not then move must be on a side of the adjacent bug, the queen will also be on the adjacence list of that bug, so all we have to do 
    //check to see if that new side is "one away"
}

function isMoveOneHex(move) {
    const moveLength = getSingleHexMoveLength(move.moveBug, move.destBug, move.destIndex)
    if( moveLength == 1 || moveLength == 5) return true //equal to 5 only when moving from 0 to 5, or 5 to 0
    else return false
}

function areBugsAdjacent(move) {
    return(move.moveBug.isAdjacentToBug(move.destBug))
}

export default checkQueenBeeMove;