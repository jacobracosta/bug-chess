import { CellState } from "./cellState.js";
import { translateArrayCoordToRefCoord, translateRefCoordToArrayCoord } from "../utils/coordinateTranslate.util.js";
import doesArrayContainObject, { doesArrayContainBug } from "../utils/array.util.js";

export class Board {
    constructor(size) {
      this.boardMatrix = this.createBoard(size) // boards will be large square arrays and the first bug will be placed in the middle, 
      this.turn = 1 //turns indexed from 1
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

    incrementTurn(){
      this.turn++
    }

    getCellFromRefCoord(refCoord) { //need better name
      const [aX, aY] = translateRefCoordToArrayCoord(refCoord)
      const cell = this.boardMatrix[aX][aY]
      return cell
    }

    updateBugCoord(move) {
      const bug = move.moveBug
      const newCoord = move.destCoord
      const oldCoord = bug.coord
      const oldCell = this.getCellFromRefCoord(oldCoord)
      const newCell = this.getCellFromRefCoord(newCoord)
      if(bug.type == "beetle") {
        if(doesArrayContainBug(oldCell.top,bug)) { //its not actually getting in here
          this.removeFromTop(bug)
          bug.coord = newCoord
          if(newCell.isEmpty()) { //hopping down
            this.addToBoard(bug) 
          } else { //moving on top
            this.addToTop(bug)
          }
        } else {
          oldCell.emptyCell()
        bug.coord = newCoord
          if(newCell.isEmpty()) { //moving normally
            this.addToBoard(bug)
          } else { //hopping up from ground
            this.addToTop(bug)
      }
        }
      } else {
        oldCell.emptyCell()
        bug.coord = newCoord
        this.addToBoard(bug)
      }
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

    addToTop(newBug) {
      const [aX, aY] = translateRefCoordToArrayCoord(newBug.coord)
      let topA = (this.boardMatrix[aX][aY].top)
      topA.push(newBug)
      this.boardMatrix[aX][aY].top = topA
    }

    removeFromTop(bug) { //only call if removing last bug
      const [aX, aY] = translateRefCoordToArrayCoord(bug.coord)
      const top = (this.boardMatrix[aX][aY].top)
      top.pop()
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
      const bottomLeft = [x+2,y-1]
      const bottomRight = [x+2,y+1]
      const topLeft = [x-2,y-1]
      const topRight = [x-2,y+1]
      const left = [x,y-2]
      const right = [x,y+2]

      let coords = [right,bottomRight]
      const [aX, aY] = translateRefCoordToArrayCoord(refCoord)
      const aXisEven = (aX % 2  == 0) ? true : false 
      if(aX > 0) coords.push(topRight)
      if(aX > 0 && aY >= 1) coords.push(topLeft)
      if(aY > 0) coords.push(left)
      if(aXisEven || !aXisEven && aY > 0) coords.push(bottomLeft)
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

    getAllAdjacentCellPlayers(refCoord) {
      const allAdjacent = this.getAllAdjacentCells(refCoord)
      let players = []
      for (let i=0; i<allAdjacent.length; i++){
        if(!allAdjacent[i].isEmpty()) {
          const cell = allAdjacent[i]
          const bug = cell.bug
          const top = cell.top
          const topBug = (top.length > 0) ? top[top.length - 1] : null
          if(topBug) players.push(topBug.bFirstPlayer)
          else players.push(bug.bFirstPlayer)
        }
      }
      return players
    }

}

export default Board