export class Move {
    constructor(moveBug, destCoord) {
      this.moveBug = moveBug
      this.startCoord = moveBug.coord
      this.destCoord = destCoord
    }
}

export default Move;