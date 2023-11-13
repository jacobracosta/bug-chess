import { CellState } from "./cellState.js";
import { translateArrayCoordToRefCoord, translateRefCoordToArrayCoord } from "../utils/coordinateTranslate.util.js";
import doesArrayContainObject from "../utils/array.util.js";

export class Board {
    constructor(size) {
      this.boardMatrix = this.createBoard(size) // boards will be large square arrays and the first bug will be placed in the middle, 
      //need function for the possibility of expanding the board? or just make it really large
    }

    //makes square board
    createBoard(size) {
      let boardArray = new Array(size)
      for(let i=0; i<size;i++){
          boardArray[i] = this.createRow(i,size)
      }
      return boardArray
    }

    getCellFromRefCoord(refCoord) { //need better name
      const [aX, aY] = translateRefCoordToArrayCoord(refCoord)
      const cell = this.boardMatrix[aX][aY]
      return cell
    }

    updateBugCoord(bug,newCoord) {
      const oldCoord = bug.coord
      const oldCell = this.getCellFromRefCoord(oldCoord)
      oldCell.emptyCell()
      bug.coord = newCoord
      this.addToBoard(bug)
      //remove bug from previous cell, set that cell to empty
      //set bug in new cell
  }

    createRow(numRow,size) {
      let rowArray = new Array(size) //make dynamic later
      for(let i=0; i<size;i++){
        rowArray[i] = new CellState(translateArrayCoordToRefCoord([numRow,i]));
      }
      return rowArray
    }

    clear() {
      this.boardMatrix.length = 0
    }

    addToBoard(newBug) {
      const [aX, aY] = translateRefCoordToArrayCoord(newBug.coord)
      let newCell = new CellState(newBug.coord)
      newCell.bug = newBug
      this.boardMatrix[aX][aY] = newCell
    }

    getNumberOfEmptyCellsAroundCoord(refCoord) {
      let numberOfEmptyCells = 0
      const allAdjacent = this.getAllAdjacentCells(refCoord)
      for (let i=0; i<allAdjacent.length; i++){
        if(allAdjacent[i].isEmpty()) numberOfEmptyCells++
      }
      return numberOfEmptyCells
    }

    checkIfAnyAdjacentCellsNonEmpty(refCoord, ignore) {
      let anyAdjacentNonEmpty = false
      const allAdjacent = this.getAllAdjacentCells(refCoord)
      for (let i=0; i<allAdjacent.length; i++){
        if(ignore && doesArrayContainObject(ignore, allAdjacent[i].refCoord)) continue
        if(!allAdjacent[i].isEmpty()) {
          anyAdjacentNonEmpty = true
          break
        } 
      } return anyAdjacentNonEmpty
    }

    getAllAdjacentCellCoords(refCoord) {
      const [x,y] = refCoord
      const topLeft = [x-2,y-1]
      const topRight = [x-2,y+1]
      const left = [x,y-2]
      const right = [x,y+2]
      const bottomLeft = [x+2,y-1]
      const bottomRight = [x+2,y+1]

      let coords = [right,bottomRight]
      const [aX, aY] = translateRefCoordToArrayCoord(refCoord)
      const aXisEven = (aX % 2  == 0) ? true : false 
      if(aX > 0) coords.push(topRight)
      if(aX > 0 && aY >= 1) coords.push(topLeft)
      if(aY > 0) coords.push(left)
      if(aXisEven && aY > 0) coords.push(bottomLeft)

      return coords
    }

    getAllAdjacentCells(refCoord) {  //does not account for right edge or bottom of boards
      const allAdjacentCoords = this.getAllAdjacentCellCoords(refCoord)
      let allAdjacentCells = []
      for (let i=0; i<allAdjacentCoords.length; i++){
        const [aX, aY] = translateRefCoordToArrayCoord(allAdjacentCoords[i])
        allAdjacentCells.push(this.boardMatrix[aX][aY])
      }
      return allAdjacentCells
    }

    removeFromBoard(coord) {
      this.bugsInPlay.splice(coord,1)
    }
}

export default Board