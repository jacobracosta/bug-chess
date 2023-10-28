export class Board {
    constructor() {
      this.bugsInPlay = []
      this.length = this.bugsInPlay.length
    }

    clearBoard() {
      this.bugsInPlay.length = 0
    }
}