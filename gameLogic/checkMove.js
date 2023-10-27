import Bug from "../gameObjects/bugs.js"

function isHexOccupied(move) { //is the space where the player intends to move occupied already
    let bIsHexOccupied = false
    if((move.destBug).isAdjacentSpotEmpty(move.destIndex)) bIsHexOccupied = true; //need to exclude the 0th element because bugs can stack forever
    return bIsHexOccupied
}

function isMoveLegal(move) { //does the move follow the movement rules for that bug
    let moveBug = new Bug()
    moveBug = move.moveBug
    const bugType = moveBug.type
    let bIsMoveLegal = false
    if(bugType == "queenBee") {
        bIsMoveLegal = checkQueenBeeMove(move)
    } else if (bugType == "beetle") {
        bIsMoveLegal = checkBeetleMove(move)
    } else if (bugType == "hopper") {
        bIsMoveLegal = checkHopperMove(move)
    } else if (bugType == "spider") {
        bIsMoveLegal = checkSpiderMove(move)
    } else {
        bIsMoveLegal = checkAntMove(move)
    }
    return bIsMoveLegal
}

function isMoveContinuous(move) { //does the move break the board continuity, ie does it break the one hive rule
    return true
}

export function checkMove(move) {  //main function for checking movement logic, calls all others
    let bIsMoveGood = false
    if(isHexOccupied(move)) {
        if(isMoveContinuous(move)) { //should we switch these
            if(isMoveLegal(move)) {
                bIsMoveGood = true
            } else console.log("Move Not Legal")
        } else console.log("Move Breaks Continuity")
    }
    else console.log("Hex Occupied") //need to log this error
    return bIsMoveGood
}

export default checkMove;

function areBugsAdjacent(move) {
    return(move.moveBug.isAdjacentToBug(move.destBug))
}

function isMoveOneHop(move) {
    const moveLength = Math.abs(move.destIndex - move.destBug.adjacentArray.indexOf(move.moveBug))
    if( moveLength == 1 || moveLength == 5) return true //equal to 5 only when moving from 0 to 5, or 5 to 0
    else return false
}

//could maybe simplfy/consolidate to "checkSingleHexMove" and use that for the beetle as well
function checkQueenBeeMove(move) {
    let bIsMoveGood = false
    if(areBugsAdjacent(move)) {
        bIsMoveGood = isMoveOneHop(move)
    //} else {
      //  bIsMoveGood = false
    }
    return bIsMoveGood
    //check if move is to another side on the same bug
    //if not then move must be on a side of the adjacent bug, the queen will also be on the adjacence list of that bug, so all we have to do 
    //check to see if that new side is "one away"
}

function checkBeetleMove(move) {
    let bIsMoveGood = true
    return bIsMoveGood
    //similar to queen bee, just need to include the on top case
}

function checkHopperMove(move) {
    let bIsMoveGood = true
    return bIsMoveGood
    //check that all sides in a straight line through the move have bugs attached
}

function checkSpiderMove(move) {
    // also need to check that end state doesn't break continuity, also need to check that end state is three "hexes" away
    // no necessarily 3 sides away
    let bIsMoveGood = true
    return bIsMoveGood
}

function checkAntMove(move) {
    let bIsMoveGood = true
    return bIsMoveGood
    // a little different, need to check that end state doesn't break continuity
}