export class Bug {
    constructor(bFirstPlayer, coord, type) {
      this.bFirstPlayer = bFirstPlayer;
      this.coord = coord;
      this.type = type;
    }
}

export default Bug;

export class queenBee extends Bug {
  constructor(bFirstPlayer, coord, type) {
    super(bFirstPlayer, coord, type)
    this.type = "queenBee"
  }
}

export class ant extends Bug {
  constructor(bFirstPlayer, coord, type) {
    super(bFirstPlayer, coord, type)
    this.type = "ant"
  }
}

export class hopper extends Bug {
  constructor(bFirstPlayer, coord, type) {
    super(bFirstPlayer, coord, type)
    this.type = "hopper"
  }
}

export class beetle extends Bug {
  constructor(bFirstPlayer, coord, type) {
    super(bFirstPlayer, coord, type)
    this.type = "beetle"
  }
}

export class spider extends Bug {
  constructor(bFirstPlayer, coord, type) {
    super(bFirstPlayer, coord, type)
    this.type = "spider"
  }
}