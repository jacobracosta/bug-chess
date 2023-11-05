
function checkSpiderMove(move) {
    let bIsMoveGood = true
    // 1. get all adjacent cells to moving bug's starting cell
    // 2. loop through those cells to see if there are any legal move possibility (use checkMoveLite)
    // 3. gather all new legal move possibilities then loop through to see if those cells have legal moves next to them
    // 4. stop at 3 loops
    // 5. check all final legal move possibilities against the move.destCoord
    return bIsMoveGood
}

export default checkSpiderMove;