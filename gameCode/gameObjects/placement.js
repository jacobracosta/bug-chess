import Bug from "../gameObjects/bugs.js"

export class Placement {
    constructor(player, coord, type) {
        this.player = player
        this.type = type
        this.coord = coord
    }

    addBugToGame(board) {
        const player = this.player
        const coord = this.coord
        const bugType = this.type
        const bug = new Bug(player.isFirst, coord, bugType)
    
        let addSuccess = true
        if(bugType == "queenBee") {
            player.queenBee = bug
        } else if (bugType == "beetle") {
            player.beetles.push(bug)
        } else if (bugType == "hopper") {
            player.hoppers.push(bug)
        } else if (bugType == "spider") {
            player.spiders.push(bug)
        } else if (bugType == "ant") {
            player.ants.push(bug) 
        } else addSuccess = false
    
        board.addToBoard(bug)
        return bug
    }
}

export default Placement