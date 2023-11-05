import { checkCrescentBreak } from "../logic.util.js";

export function checkAntMove(move,board) {
    let isMoveGood = false
    isMoveGood = checkCrescentBreak(move,board)
    return isMoveGood
}

export default checkAntMove;