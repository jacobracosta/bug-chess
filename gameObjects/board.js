import { CellState } from "./cellState.js";

export class Board {
    constructor(size) {
      this.bugsInPlay = []
      this.length = this.bugsInPlay.length

      this.boardMatrix = this.createBoard(size)
    }

    //makes square board
    createBoard(size) {
      let boardArray = new Array(size)
      for(let i=0; i<size;i++){
          boardArray[i] = this.createRow(size)
      }
      return boardArray
    }

    createRow(size) {
      let rowArray = new Array(size) //make dynamic later
      for(let i=0; i<size;i++){
        rowArray[i] = new CellState();
      }
      return rowArray
    }

    clear() {
      this.bugsInPlay.length = 0
    }

    addToBoard(bug) {
      const [x, y] = bug.location
      this.boardMatrix[x][y] = bug
    }

    removeFromBoard(index) {
      this.bugsInPlay.splice(index,1)
    }

    //method to check for number of bugs of a type on board? this would break some tests
}

export default Board