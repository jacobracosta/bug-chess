export class Move {
    constructor(moveBug, destBug, destCoord) {
      this.moveBug = moveBug
      this.destBug = destBug // gonna get rid of this
      this.startCoord = moveBug.location
      this.destCoord = destCoord
    }
}

export default Move;