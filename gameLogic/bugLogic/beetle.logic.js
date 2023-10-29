import { checkSingleHexMove } from "../logic.util.js";

export function checkBeetleMove(move) {
    let bIsMoveGood = false
    if(move.destIndex > 5) {
        bIsMoveGood = checkIfTopSpotLegal(move)
    } else bIsMoveGood = checkSingleHexMove(move)

    return bIsMoveGood
}

function checkIfTopSpotLegal(move) {
    return move.moveBug.isAdjacentToBug(move.destBug)
}

export default checkBeetleMove;