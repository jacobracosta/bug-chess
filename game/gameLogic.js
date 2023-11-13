import Board from "../gameObjects/board.js"
import Bug from "../gameObjects/bugs.js"
import CellState from "../gameObjects/cellState.js"

    //method to check for number of bugs of a type on board? this would break some tests


export function addBugToGame(placement, board) {
    const player = placement.player
    const coord = placement.coord
    const bugType = placement.bugType
    const bug = new Bug(player, coord, bugType)//need to verify type info was good

    if(bugType == "queenBee") {
        player.queenBee = bug
    } else if (bugType == "beetle") {
        player.beetles.push(bug)
    } else if (bugType == "hopper") {
        player.hoppers.push(bug)
    } else if (bugType == "spider") {
        player.spiders.push(bug)
    } else {//if (bugType == "ant") {
        player.ants.push(bug) 
    }

    let tempBoard = new Board(1)
    tempBoard = board
    tempBoard.addToBoard(bug)
    //need a return?
}

function checkNumberOfBug(placement) {
    const player = placement.player
    const bugType = placement.type
    let success;
    if(type == "queenBee" && !player.queenBee) success = true
    else if (bugType == "beetle" && player.beetles.length < 2) success = true
    else if (bugType == "hopper" && player.hoppers.length < 3) success = true
    else if (bugType == "spider" && player.spiders.length < 2) success = true
    else if (bugType == "ant" && player.ants.length < 3) success = true
    else success = false
    return success
}

function isHexOpen(placement,board) { //is the space where the player intends to move occupied already
    let isHexOpen = false
    let currentBoard = new Board()
    currentBoard = board
    let destCellState = new CellState()
    destCellState = currentBoard.getCellFromRefCoord(placement.coord)
    isHexOpen = destCellState.isEmpty()
    return isHexOpen
}

function isDestHexAdjacent(placement,board) {
    let currentBoard = new Board()
    currentBoard = board
    return currentBoard.checkIfAnyAdjacentCellsNonEmpty(placement.coord)
}

function checkColorOfAdjacent(placement, board) {
    return true
}

export function checkPlacement(placement, board) {
    let bIsPlacementGood = false
    let failureMessage = "Success"
    if(isHexOpen(placement, board)) {
        if(isDestHexAdjacent(placement, board)) {
            if(checkColorOfAdjacent(placement, board)) {
                if(checkNumberOfBug(placement)) {
                    bIsPlacementGood = true
                } else failureMessage = "Can't place next to a bug of opposite color."
            } else failureMessage = "Too many of this bug."
        } else failureMessage = "Dest Hex not Adjacent to Anything"
    } else failureMessage = "Hex Occupied"
    return [bIsMoveGood, failureMessage]
}

export default addBugToGame