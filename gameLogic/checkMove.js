function isHexOccupied(bug, move, board) { //is the space the player intends to move occupied already
    return true
}

function isMoveLegal(bug, move, board) { //does the move follow the movement rules for that bug
    return true
}

function isMoveContinuous(bug, move, board) { //does the move break the board continuity, ie does it break the one hive rule
    return true
}

function checkMove(bug, move, board) {  //main function for checking movement logic, calls all others
    let isMoveLegal = false
    if(isHexOccupied(bug,move,board)) {
        if(isMoveLegal(bug,move,board)) {
            if(isMoveContinuous(bug,move,board)) {
                isMoveLegal = true
            }
        }
    }
    return isMoveLegal
}