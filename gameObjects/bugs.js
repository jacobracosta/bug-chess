export class Bug {
    constructor(player, location, type) {
      this.player = player;
      this.location = location;
      this.type = type;
      this.adjacentArray = [null, null, null, null, null, null]
    }

    addToAdjacent (index, newBug) {
      this.adjacentArray.splice(index,0,newBug)
    }

    removeFromAdjacent (index) {
      this.adjacentArray.splice(index,1)
    }

    isAdjacentSpotEmpty(index) {
      var bSpotEmpty = false
      if (this.adjacentArray[index] === null) bSpotEmpty = true;
      return bSpotEmpty
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