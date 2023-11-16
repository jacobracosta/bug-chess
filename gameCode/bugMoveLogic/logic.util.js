import { translateRefCoordToArrayCoord } from "../utils/coordinateTranslate.util.js";

export function checkCrescentBreak(move, board) {
    let bIsMoveGood = true

    const adjacentCells = board.getAllAdjacentCells(move.destCoord)
    if(adjacentCells.length > 5) { //crescent break scenario only relevant when 5 or more adjacent cells involved
        const numberOfEmptyCells = board.getNumberOfEmptyCellsAroundCoord(move.destCoord) //can we use adjacent cells above to prevent redundant calc?
        if(numberOfEmptyCells <= 1){
            bIsMoveGood = false
        }
    }
    return bIsMoveGood
}

export function checkSingleHexMove(move) { //need to redo this potentially?
    const [x0,y0] = move.startCoord
    const [x1,y1] = move.destCoord
    const x = x1 - x0
    const y = y1 - y0
    const distance =  Math.sqrt(x * x + y * y)
    let isMoveOneHex = false
    if(distance == 2) isMoveOneHex = true
    else if(distance == Math.sqrt(5)) isMoveOneHex = true
    else isMoveOneHex = false
    return isMoveOneHex
}

export function isHexOpen(move,board) { //is the space where the player intends to move occupied already
    const bugType = move.moveBug.type
    let isHexOpen = false
    if(bugType != "beetle") { //beetle doesn't care if a space is occupied
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

export function checkMoveLite(move, board, ignore) {  
    let bIsMoveGood = false
    if(isHexOpen(move, board)) {
        if(checkSingleHexMove(move)) {
            if(isDestHexAdjacent(move,board, ignore)) {
                if(isEndStateLegal(move, board)) {
                    bIsMoveGood = true
                } //else console.log("Crescent Break")
            } //else console.log("Dest Hex not Adjacent to Anything 1")
        } //else console.log("Move not a single hex")
    } //else console.log("Hex Occupied 1")
    return bIsMoveGood
}

export function isEndStateLegal (move, board) { //need to check anything besides crescent break?
    let isMoveGood = true
    const bugType = move.moveBug.type

    if(bugType != "beetle" && bugType != "hopper")
        isMoveGood = checkCrescentBreak(move,board)
    return isMoveGood
}

export default checkSingleHexMove