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
            }
        }
    }
    return bIsMoveGood
}

export default checkMove;

function checkQueenBeeMove(move) {
    let bIsMoveGood = true
    return bIsMoveGood
    //check if move is to another side on the same bug
    //if not then move must be on a side of the adjacent bug
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
    // ??
    let bIsMoveGood = true
    return bIsMoveGood
}

function checkAntMove(move) {
    let bIsMoveGood = true
    return bIsMoveGood
    // a little different, need to check that end state doesn't break continuity
}