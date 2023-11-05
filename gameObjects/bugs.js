export class Bug {
    constructor(player, coord, type) {
      this.player = player;
      this.coord = coord;
      this.type = type;
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