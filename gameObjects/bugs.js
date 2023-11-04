export class Bug {
    constructor(player, coord, type) {
      this.player = player;
      this.coord = coord;
      this.type = type;
      // 0 top
      // 1 top right diagonal
      // 2 bottom right diagonal   
      // 3 bottom
      // 4 bottom left diagonal
      // 5 top left diagonal
      this.adjacentArray = [null, null, null, null, null, null]
      this.topArray = []
    }

    addToAdjacent (indexOfThisBug, indexOfOtherBug, newBug) {
      this.adjacentArray[indexOfThisBug] = newBug //always add to the first index when moving a bug. may need to rethink that
      newBug.adjacentArray[indexOfOtherBug] = this 
    }

    removeFromAdjacent (index) {
      this.adjacentArray[index] = null // duhhhh
      //how to handle similar to addToAdjacent?
    }

    isAdjacentSpotEmpty(index) {
      var bSpotEmpty = false
      if (this.adjacentArray[index] === null) bSpotEmpty = true;
      return bSpotEmpty
    }

    isAdjacentToBug(bug) {
      if (this.adjacentArray.includes(bug)) return true
      else return false
    }

    hasAnyAdjacents(excludeBug) {
      if(excludeBug) {
        for (let i = 0; i < this.adjacentArray.length; i++) {
          if(this.adjacentArray[i] == excludeBug) continue
          else if(this.adjacentArray[i]) return true
        }
      }
      else return this.adjacentArray.some(Boolean)
    }
}

export default Bug;

export class queenBee extends Bug {
  constructor(player, coord, type) {
    super(player, coord, type)
    this.type = "queenBee"
  }
}

export class ant extends Bug {
  constructor(player, coord, type) {
    super(player, coord, type)
    this.type = "ant"
  }
}

export class hopper extends Bug {
  constructor(player, coord, type) {
    super(player, coord, type)
    this.type = "hopper"
  }
}

export class beetle extends Bug {
  constructor(player, coord, type) {
    super(player, coord, type)
    this.type = "beetle"
  }
}

export class spider extends Bug {
  constructor(player, coord, type) {
    super(player, coord, type)
    this.type = "spider"
  }
}