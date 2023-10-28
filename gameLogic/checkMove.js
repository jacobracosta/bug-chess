import Bug from "../gameObjects/bugs.js"
import checkQueenBeeMove from "./bugLogic/queenBee.logic.js";
import checkBeetleMove from "./bugLogic/beetle.logic.js";
import checkHopperMove from "./bugLogic/hopper.logic.js";
import checkAntMove from "./bugLogic/ant.logic.js";
import checkSpiderMove from "./bugLogic/spider.logic.js";

function isHexOccupied(move) { //is the space where the player intends to move occupied already
    let bIsHexOccupied = false
    if((move.destBug).isAdjacentSpotEmpty(move.destIndex)) bIsHexOccupied = true; //need to exclude the 0th element because bugs can stack forever
    return bIsHexOccupied
}

function isMoveLegal(move) { //does the move follow the movement rules for that bug
    let moveBug = new Bug()
    moveBug = move.moveBug //cleaner way of doing this?
    const bugType = moveBug.type
    let bIsMoveLegal = false
    if(bugType == "queenBee") {
        bIsMoveLegal = checkQueenBeeMove(move)
    } else if (bugType == "beetle") {
        bIsMoveLegal = checkBeetleMove(move)
    } else if (bugType == "hopper") {
        bIsMoveLegal = checkHopperMove(move)
    } else if (bugType == "spider") {
        bIsMoveLegal = checkSpiderMove(move)
    } else {
        bIsMoveLegal = checkAntMove(move)
    }
    return bIsMoveLegal
}

function isMoveContinuous(move) { //does the move break the board continuity, ie does it break the one hive rule
    //iterate through adjacent list on moving bug and make sure each bug is attached to something else
    //need to update adjacent lists before this check? because this implementation can break down in the base case
    let isMoveContinuous = true
    let moveBug = new Bug()
    moveBug = move.moveBug
    let adjacent = moveBug.adjacentArray
    for (let i = 0; i < adjacent.length; i++) {
        if(adjacent[i]) {
            let tempBug = new Bug()
            tempBug = adjacent[i]
            if (tempBug.hasAnyAdjacents()) {
                isMoveContinuous = false
                break
            }
        }
    }
    return isMoveContinuous
}

export function checkMove(move) {  //main function for checking movement logic, calls all others
    let bIsMoveGood = false
    //check if the specified move is to the spot the moving bug is already in
    if(isHexOccupied(move)) {
        if(isMoveContinuous(move)) {
            if(isMoveLegal(move)) {
                bIsMoveGood = true
            } else console.log("Move Not Legal")
        } else console.log("Move Breaks Continuity")
    }
    else console.log("Hex Occupied") //need to log these errors
    return bIsMoveGood
}

export default checkMove;