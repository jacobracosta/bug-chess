import Board from "../gameObjects/board.js"

export function checkCrescentBreak(move, board) {
    let bIsMoveGood = true
    let tempBoard = new Board(1)
    tempBoard = board
    const numberOfEmptyCells = tempBoard.getNumberOfEmptyCellsAroundCoord(move.destCoord)
    if(numberOfEmptyCells <= 1){
        bIsMoveGood = false
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

export default checkSingleHexMove