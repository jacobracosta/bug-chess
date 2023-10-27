export class Bug {
    constructor(player, location, type) {
      this.player = player;
      this.location = location;
      this.type = type;
      this.adjacentArray = [null, null, null, null, null, null]
      this.topArray = []
    }

    addToAdjacent (index, newBug) {
      this.adjacentArray.splice(0,0,newBug) //always add to the first index when moving a bug
      newBug.adjacentArray.splice(index,0,this) 
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