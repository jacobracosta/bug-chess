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
    //check if the specified move is to the spot the moving bug is already in
    if(isHexOccupied(move)) {
        if(isMoveContinuous(move)) {
            if(isMoveLegal(move)) {
                bIsMoveGood = true
            } else console.log("Move Not Legal")
        } else console.log("Move Breaks Continuity")
    }
    else console.log("Hex Occupied") //need to log these errors
    return bIsMoveGood
}

export default checkMove;

function areBugsAdjacent(move) {
    return(move.moveBug.isAdjacentToBug(move.destBug))
}

function getSingleHexMoveLength(moveBug, staticBug, destIndex) {
    //need protection here if staticBug doesn't have an entry matching movebug?
    return(Math.abs(destIndex - staticBug.adjacentArray.indexOf(moveBug)))
}

function isMoveOneHex(move) {
    const moveLength = getSingleHexMoveLength(move.moveBug, move.destBug, move.destIndex)
    if( moveLength == 1 || moveLength == 5) return true //equal to 5 only when moving from 0 to 5, or 5 to 0
    else return false
}

function isMoveAStraightHop(move) {
    //trace bugs in the line using their adjacent arrays
    var isMoveGood = false
    var currentBug = move.moveBug
    var nextBug = move.moveBug.adjacentArray[move.destIndex]
    const moveLength = getSingleHexMoveLength(currentBug, nextBug, move.destIndex)

    //can find a cleaner way of doing this
    if(moveLength == 3) {
        if(nextBug == move.destBug) {
            isMoveGood = true
        }
        else {
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
    return isMoveGood
}

//could maybe simplfy/consolidate to "checkSingleHexMove" and use that for the beetle as well
function checkQueenBeeMove(move) {
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

function checkBeetleMove(move) {
    let bIsMoveGood = true
    return bIsMoveGood
    //similar to queen bee, just need to include the on top case
}

function checkHopperMove(move) {
    let bIsMoveGood = false
    bIsMoveGood = isMoveAStraightHop(move)
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