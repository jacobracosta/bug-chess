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

//do we need to extend bug class for each type? possibly not

export class queenBee extends Bug {
  constructor(player, location, type) {
    super(player, location, type)
    this.type = "queenBee"
  }

}
/*
class ant extends bug {
  constructor(player, location, type) {
    super(player, location, type)
  }
  
  checkMove(location, endLocation, board) {
    
  }
}

class hopper extends bug {
  constructor(player, location, type) {
    super(player, location, type)
  }
  
  checkMove(location, endLocation, board) {
    
  }
}

class beetle extends bug {
  constructor(player, location, type) {
    super(player, location, type)
  }
  
  checkMove(location, endLocation, board) {
    
  }
}

class spider extends bug {
  constructor(player, location, type) {
    super(player, location, type)
  }
  
  checkMove(location, endLocation, board) {
    
  }
}*/