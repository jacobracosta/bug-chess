import { translateRefCoordToArrayCoord } from "../utils/coordinateTranslate.util.js";
import { checkSingleHexMove } from "./singleHexMove.util.js"

export function checkCrescentBreak(move, board) {
    let bIsMoveGood = true
    //need to generalize for the pass through case, which covers the crescent brek case
    const adjacentCells = board.getAllAdjacentCells(move.destCoord)
    if(adjacentCells.length > 5) {
        const numberOfEmptyCells = board.getNumberOfEmptyCellsAroundCoord(move.destCoord) //can we use adjacent cells above to prevent redundant calc?
        if(numberOfEmptyCells <= 1){
            bIsMoveGood = false
        }
    }
    return bIsMoveGood
}

export function isHexOpen(move,board) {
    let isHexOpen = false
    if(bugType != "beetle") {
        isHexOpen = (board.getCellFromRefCoord(move.destCoord)).isEmpty()
    } else isHexOpen = true
    return isHexOpen
}

export function isDestHexAdjacent(move,board,ignore=[]) {
    return board.checkIfAnyAdjacentCellsNonEmpty(move.destCoord,ignore)
}

export function createBoardWithoutMoveBug(move,board) {
    let boardWithoutMoveBug = {...board} //shallow copy of current board
    const [aX,aY] = translateRefCoordToArrayCoord(move.moveBug.coord)
    let cell = boardWithoutMoveBug.boardMatrix[aX][aY]
    cell.emptyCell()
    return boardWithoutMoveBug
}


export function isEndStateLegal (move, board) { //need to check anything besides crescent break?
    let isMoveGood = true
    const bugType = move.moveBug.type

    if(bugType != "beetle" && bugType != "hopper")
        isMoveGood = checkCrescentBreak(move,board)
    return isMoveGood
}

export function checkMoveLite(move, board, ignore) {  
    let bIsMoveGood = false
    if(isHexOpen(move, board)) {
        if(checkSingleHexMove(move, board)) {
            if(isDestHexAdjacent(move,board, ignore)) {
                if(isEndStateLegal(move, board)) {
                    bIsMoveGood = true
                } //else console.log("Crescent Break")
            } //else console.log("Dest Hex not Adjacent to Anything 1")
        } //else console.log("Move not a single hex")
    } //else console.log("Hex Occupied 1")
    return bIsMoveGood
}

export default checkMoveLite