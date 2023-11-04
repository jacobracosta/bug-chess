export class Move {
    constructor(moveBug, destCoord) {
      this.moveBug = moveBug
      this.startCoord = moveBug.location
      this.destCoord = destCoord
    }
}

export default Move;