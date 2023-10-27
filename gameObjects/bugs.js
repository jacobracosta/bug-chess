export class Bug {
    constructor(player, location, type) {
      this.player = player;
      this.location = location;
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
      this.adjacentArray.splice(indexOfThisBug,0,newBug) //always add to the first index when moving a bug. may need to rethink that
      newBug.adjacentArray.splice(indexOfOtherBug,0,this) 
    }

    removeFromAdjacent (index) {
      this.adjacentArray.splice(index,1)
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
}

export default Bug;

export class queenBee extends Bug {
  constructor(player, location, type) {
    super(player, location, type)
    this.type = "queenBee"
  }
}

export class ant extends Bug {
  constructor(player, location, type) {
    super(player, location, type)
    this.type = "ant"
  }
}

export class hopper extends Bug {
  constructor(player, location, type) {
    super(player, location, type)
    this.type = "hopper"
  }
}

export class beetle extends Bug {
  constructor(player, location, type) {
    super(player, location, type)
    this.type = "beetle"
  }
}

export class spider extends Bug {
  constructor(player, location, type) {
    super(player, location, type)
    this.type = "spider"
  }
}