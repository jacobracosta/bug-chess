import { CellState } from "./cellState.js";
import { translateRefCoordToArrayCoord } from "../utils/coordinateTranslate.util.js";

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
      const [aX, aY] = translateRefCoordToArrayCoord(refCoord)
      const cell = this.boardMatrix[aX][aY]
      return cell
    }

    createRow(size) {
      let rowArray = new Array(size) //make dynamic later
      for(let i=0; i<size;i++){
        rowArray[i] = new CellState();
      }
      return rowArray
    }

    clear() {
      this.boardMatrix.length = 0
    }

    addToBoard(bug) {
      const [aX, aY] = translateRefCoordToArrayCoord(bug.coord)
      this.boardMatrix[aX][aY] = bug
    }

    getNumberOfEmptyCellsAroundCoord(refCoord) {
      let numberOfEmptyCells = 0
      const allAdjacent = this.getAllAdjacentCells(refCoord)
      for (let i=0; i<allAdjacent.length; i++){
        if(allAdjacent[i].isEmpty) numberOfEmptyCells++
      }
      return numberOfEmptyCells
    }

    checkIfAnyAdjacentCellsNonEmpty(refCoord) {
      let anyAdjacentNonEmpty = false
      const allAdjacent = this.getAllAdjacentCells(refCoord)
      for (let i=0; i<allAdjacent.length; i++){
        if(!allAdjacent[i].isEmpty) {
          anyAdjacentNonEmpty = true
          break
        } 
      } return anyAdjacentNonEmpty
    }

    getAllAdjacentCells(refCoord){  //does not account for right edge or bottom of boards
      const [x,y] = refCoord
      const topLeft = [x-2,y-1]
      const topRight = [x-2,y+1]
      const left = [x,y-2]
      const right = [x,y+2]
      const bottomLeft = [x+2,y-1]
      const bottomRight = [x+2,y+1]

      let allAdjacent = []
      let coords = [right,bottomRight]
      const [aX, aY] = translateRefCoordToArrayCoord(refCoord)
      const aXisEven = (aX % 2  == 0) ? true : false 
      if(aX > 0) coords.push(topRight)
      if(aX > 0 && aY >= 1) coords.push(topLeft)
      if(aY > 0) coords.push(left)
      if(aXisEven && aY > 0) coords.push(bottomLeft)

      for (let i=0; i<coords.length; i++){
        const [aX, aY] = translateRefCoordToArrayCoord(coords[i])
        allAdjacent.push(this.boardMatrix[aX][aY])
      }
      return allAdjacent
    }

    removeFromBoard(coord) {
      this.bugsInPlay.splice(coord,1)
    }

    //method to check for number of bugs of a type on board? this would break some tests
}

export default Board