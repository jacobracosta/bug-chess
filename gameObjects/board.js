export class Board {
    constructor() {
      this.bugsInPlay = []
      this.length = this.bugsInPlay.length
    }

    clear() {
      this.bugsInPlay.length = 0
    }

    addToBoard(bug) {
      this.bugsInPlay.push(bug)
      this.length = this.bugsInPlay.length
    }

    removeFromBoard(index) {
      this.bugsInPlay.splice(index,1)
    }
}

export default Board