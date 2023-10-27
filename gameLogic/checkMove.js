
function isHexOccupied(move) { //is the space where the player intends to move occupied already
    let bIsHexOccupied = false
    if((move.destBug).isAdjacentSpotEmpty(move.destIndex)) bIsHexOccupied = true;
    return bIsHexOccupied
}

function isMoveLegal(move) { //does the move follow the movement rules for that bug
    return true
}

function isMoveContinuous(move) { //does the move break the board continuity, ie does it break the one hive rule
    return true
}
export function checkMove(move) {  //main function for checking movement logic, calls all others
    let bIsMoveLegal = false
    if(isHexOccupied(move)) {
        if(isMoveLegal(move)) {
            if(isMoveContinuous(move)) {
                bIsMoveLegal = true
            }
        }
    }
    return bIsMoveLegal
}

export default checkMove;