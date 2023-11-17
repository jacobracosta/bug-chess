import { checkSingleHexMove } from "../logic.util.js";

export function checkBeetleMove(move, board) {
    return checkSingleHexMove(move, board)
}

export default checkBeetleMove;