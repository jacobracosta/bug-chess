import { checkSingleHexMove } from "../singleHexMove.util.js";

export function checkQueenBeeMove(move, board) {
    return checkSingleHexMove(move, board)
}

export default checkQueenBeeMove;