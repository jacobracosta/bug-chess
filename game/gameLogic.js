import Board from "../gameObjects/board.js"

export function updateBugCoord(bug,newCoord, board) {
    const oldCoord = bug.coord
    let dummyBoard = new Board(1)
    dummyBoard = board
    const oldCell = dummyBoard.getCellFromRefCoord(oldCoord)
    oldCell.emptyCell()
    bug.coord = newCoord
    dummyBoard.addToBoard(bug)
    //remove bug from previous cell, set that cell to empty
    //set bug in new cell
}

export default updateBugCoord