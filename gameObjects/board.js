import { CellState } from "./cellState.js";

export class Board {
    constructor(size) {
      this.bugsInPlay = []
      this.length = this.bugsInPlay.length

      this.boardMatrix = this.createBoard(size) // boards will be large square arrays and the first bug will be placed in the middle, 
      //need function for the possibility of expanding the board? or just make it really large
    }

    //makes square board
    createBoard(size) {
      let boardArray = new Array(size)
      for(let i=0; i<size;i++){
          boardArray[i] = this.createRow(size)
      }
      return boardArray
    }

    getCellFromRefCoord(refCoord) { //need better name
      const [aX, aY] = this.translateRefCoordToArrayCoord(refCoord)
      const cell = this.boardMatrix[aX][aY]
      return cell
    }

    translateRefCoordToArrayCoord(refCoord) {
      let aX, aY;
      const [rX, rY] = refCoord
      aX = rX/2
      if (aX % 2 == 0) {
        aY = ((rY + 1)/2) - 1
      } else {
        aY = rY/2
      }
      return [aX,aY]
    }

    createRow(size) {
      let rowArray = new Array(size) //make dynamic later
      for(let i=0; i<size;i++){
        rowArray[i] = new CellState();
      }
      return rowArray
    }

    clear() {
      this.bugsInPlay.length = 0 //get rid of
      this.boardMatrix.length = 0
    }

    addToBoard(bug) {
      const [aX, aY] = this.translateRefCoordToArrayCoord(bug.coord)

      this.boardMatrix[aX][aY] = bug
    }

    getAllAdjacentCells(coord){
      //get row above and below
      //get coords next to coord
      //return list? how [0,1] top left right
      // [2,3] left right
      // [4,5] bottom left right
    }

    removeFromBoard(coord) {
      this.bugsInPlay.splice(coord,1)
    }

    //method to check for number of bugs of a type on board? this would break some tests
}

export default Board