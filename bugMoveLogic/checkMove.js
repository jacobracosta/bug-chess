import Bug from "../gameObjects/bugs.js"
import checkQueenBeeMove from "./bugLogic/queenBee.logic.js";
import checkBeetleMove from "./bugLogic/beetle.logic.js";
import checkHopperMove from "./bugLogic/hopper.logic.js";
import checkAntMove from "./bugLogic/ant.logic.js";
import checkSpiderMove from "./bugLogic/spider.logic.js";
import { isHexOpen, isDestHexAdjacent, isEndStateLegal } from "./logic.util.js";

function isMoveLegal(move,board) { //does the move follow the movement rules for that bug
    let bug = new Bug()
    bug = move.moveBug
    const bugType = bug.type
    let bIsMoveLegal = false
    if(bugType == "queenBee") {
        bIsMoveLegal = checkQueenBeeMove(move)
    } else if (bugType == "beetle") {
        bIsMoveLegal = checkBeetleMove(move)
    } else if (bugType == "hopper") {
        bIsMoveLegal = checkHopperMove(move,board)
    } else if (bugType == "spider") {
        bIsMoveLegal = checkSpiderMove(move,board)
    } else {
        bIsMoveLegal = checkAntMove(move,board)
    }
    return bIsMoveLegal
}

function isMoveContinuous(move, board) { //does the move break the board continuity, ie does it break the one hive rule
    //iterate through adjacent list on moving bug and make sure each bug is attached to something else
    //need to update adjacent lists before this check? because this implementation can break down in the base case
    //need to account for size of board to appropriately handle base case

    let isMoveContinuous = true
    /*
    let moveBug = new Bug()
    moveBug = move.moveBug
    let adjacent = moveBug.adjacentArray
    if(board.length == 2 && moveBug.isAdjacentToBug(move.destBug)) {
        isMoveContinuous = true //better structure to this, redundant
    } else {
        for (let i = 0; i < adjacent.length; i++) {
            if(adjacent[i]) {
                let tempBug = new Bug()
                tempBug = adjacent[i]
                if (!tempBug.hasAnyAdjacents(moveBug)) {
                    isMoveContinuous = false
                    break
                }
            }
        }
    }*/
    return isMoveContinuous
}

export function checkMove(move, board) {  //main function for checking movement logic, calls all others
    let bIsMoveGood = false
    let failureMessage = "Success"
    if(isHexOpen(move, board)) {
        if(isDestHexAdjacent(move,board)) {
            if(isMoveContinuous(move, board)) {
                if(isMoveLegal(move, board)) {
                    if(isEndStateLegal(move, board)) {
                        bIsMoveGood = true
                    } else failureMessage = "End State Not Legal"
                } else failureMessage = "Move Not Legal"
            } else failureMessage = "Move Breaks Continuity"
        } else failureMessage = "Dest Hex not Adjacent to Anything"
    } else failureMessage = "Hex Occupied"
    return [bIsMoveGood, failureMessage]
}

export default checkMove;