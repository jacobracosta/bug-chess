import { translateRefCoordToArrayCoord } from "../utils/coordinateTranslate.util.js";
import CellState from "../gameObjects/cellState.js";

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

export function checkSingleHexMove(move, board) {
    let isMoveOneHex = false
    const [x0,y0] = move.startCoord
    const [x1,y1] = move.destCoord
    const x = x1 - x0
    const y = y1 - y0
    if( x == 0 && Math.abs(y) == 2) {
        if(move.moveBug.type == "beetle") isMoveOneHex = true
        else { //rolling case
            if( y > 0) { // moving right
                const topRightCoord = [x0-2,y0+1]
                const bottomRightCoord = [x0+2,y0+1]
                if(x0-2>0) {
                    let tempCell = new CellState(topRightCoord)
                    let topRightCell = tempCell
                    topRightCell = board.getCellFromRefCoord(topRightCoord)
                    if(!topRightCell.isEmpty()) isMoveOneHex = true
                } else {
                    let tempCell = new CellState(topRightCoord)
                    let bottomRightCell = tempCell
                    bottomRightCell = board.getCellFromRefCoord(bottomRightCoord)
                    if(!bottomRightCell.isEmpty()) isMoveOneHex = true
                }
            } else { //left
                const topLeftCoord = [x0-2,y0-1]
                const bottomLeftCoord = [x0+2,y0-1]
                if(y0-1 > 0) {
                    if(x0-2>0) {
                        let tempCell = new CellState(topLeftCoord)
                        let topLeftCell = tempCell
                        topLeftCell = board.getCellFromRefCoord(topLeftCoord)
                        if(!topLeftCell.isEmpty()) isMoveOneHex = true
                    } else {
                        let tempCell = new CellState(topLeftCoord)
                        let bottomLeftCell = tempCell
                        bottomLeftCell = board.getCellFromRefCoord(bottomLeftCoord)
                        if(!bottomLeftCell.isEmpty()) isMoveOneHex = true
                    }
                }
            }
        }
    }
    else if (Math.abs(x) == 2 && Math.abs(y) == 1) isMoveOneHex = true
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

export function isEndStateLegal (move, board) { //need to check anything besides crescent break?
    let isMoveGood = true
    const bugType = move.moveBug.type

    if(bugType != "beetle" && bugType != "hopper")
        isMoveGood = checkCrescentBreak(move,board)
    return isMoveGood
}

export default checkSingleHexMove