export class Move {
    constructor(moveBug, destBug, destIndex) {
      this.moveBug = moveBug
      this.destBug = destBug
      this.destIndex = destIndex
      //this.proposedAdjacentArray = destBug.adjacentArray
      //this.proposedAdjacentArray[destIndex] = moveBug
    }
}

export default Move;

//calculate move length