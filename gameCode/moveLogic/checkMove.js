import checkQueenBeeMove from "./bugLogic/queenBee.logic.js"
import checkBeetleMove from "./bugLogic/beetle.logic.js";
import checkHopperMove from "./bugLogic/hopper.logic.js";
import checkAntMove from "./bugLogic/ant.logic.js";
import checkSpiderMove from "./bugLogic/spider.logic.js";
import { isHexOpen, isDestHexAdjacent, isEndStateLegal, createBoardWithoutMoveBug } from "./logic.util.js";
import isBoardContinuous from "./continuity.util.js";

function isMoveLegal(move,board) {
    const bugType = move.moveBug.type
    let bIsMoveLegal = false
    if(bugType == "queenBee") {
        bIsMoveLegal = checkQueenBeeMove(move, board)
    } else if (bugType == "beetle") {
        bIsMoveLegal = checkBeetleMove(move, board)
    } else if (bugType == "hopper") {
        bIsMoveLegal = checkHopperMove(move,board)
    } else if (bugType == "spider") {
        bIsMoveLegal = checkSpiderMove(move,board)
    } else {
        bIsMoveLegal = checkAntMove(move,board)
    }
    return bIsMoveLegal
}

function isMoveContinuous(move, board) {
    //need to remove the moving bug from board before doing this check
    let boardWithoutMoveBug = createBoardWithoutMoveBug(move,board)
    const isMoveContinuous = isBoardContinuous(boardWithoutMoveBug)
    return isMoveContinuous
}

export function checkMove(move, board) {
    let bIsMoveGood = false
    let failureMessage = "Success"
    if(isHexOpen(move, board)) {
        if(isDestHexAdjacent(move,board)) {
            if(isMoveContinuous(move, board)) {
                if(isMoveLegal(move, board)) {
                    if(isEndStateLegal(move, board)) {
                        bIsMoveGood = true
                    } else failureMessage = "End State Not Legal" //
                } else failureMessage = "Move Not Legal" //
            } else failureMessage = "Move Breaks Continuity" //
        } else failureMessage = "Dest Hex not Adjacent to Anything" //
    } else failureMessage = "Hex Occupied" //
    return [bIsMoveGood, failureMessage]
}

export default checkMove;