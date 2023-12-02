function checkNumberOfBug(placement) {
    const player = placement.player
    const bugType = placement.type
    let success;
    if(bugType == "queenBee" && !player.queenBee) success = true
    else if (bugType == "beetle" && player.beetles.length < 2) success = true
    else if (bugType == "hopper" && player.hoppers.length < 3) success = true
    else if (bugType == "spider" && player.spiders.length < 2) success = true
    else if (bugType == "ant" && player.ants.length < 3) success = true
    else success = false
    return success
}

function isHexOpen(placement,board) {
    return board.getCellFromRefCoord(placement.coord).isEmpty()
}

function isDestHexAdjacent(placement,board) {
    let isDestHexAdjacent = false
    if(board.turn == 1) isDestHexAdjacent = true
    else isDestHexAdjacent = board.checkIfAnyAdjacentCellsNonEmpty(placement.coord)
    return isDestHexAdjacent
}

function checkColorOfAdjacent(placement, board) { //just checks player order instead of color
    const coord = placement.coord
    const playerNum = placement.player.isFirst
    let allAdjacentSameColor = true

    const allEqual = arr => arr.every(val => val === arr[0]);
    if(board.turn >= 3) {
        const colors = board.getAllAdjacentCellPlayers(coord)
        allAdjacentSameColor = (allEqual(colors) && colors[0] == playerNum)
    }
    return allAdjacentSameColor
}

export function checkPlacement(placement, board) {
    let bIsPlacementGood = false
    let failureMessage = "Placement Good."
    if(isHexOpen(placement, board)) {
        if(isDestHexAdjacent(placement, board)) {
            if(checkColorOfAdjacent(placement, board)) {
                if(checkNumberOfBug(placement)) {
                    bIsPlacementGood = true
                } else failureMessage =  "Too many of this bug." //
            } else failureMessage = "Can't place next to a bug of opposite color." //
        } else failureMessage = "Dest Hex not Adjacent to Anything." //
    } else failureMessage = "Hex Occupied." //
    return [bIsPlacementGood, failureMessage]
}

export default checkPlacement