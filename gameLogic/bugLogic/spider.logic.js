import Move from "../../gameObjects/move.js"
import { checkMoveLite } from "../logic.util.js"
import Bug from "../../gameObjects/bugs.js"

function checkSpiderMove(move, board) {
    let bIsMoveGood = false
    // 1. get all adjacent cells to moving bug's starting cell
    // 2. loop through those cells to see if there are any legal move possibility (use checkMoveLite)
    // 3. gather all new legal move possibilities then loop through to see if those cells have legal moves next to them
    // 4. stop at 3 loops
    // 5. check all final legal move possibilities against the move.destCoord

    let moveCoords = [move.moveBug.coord]
    for(let i=0; i<3; i++){
        let proposedMoveCoords = []
        for(let j=0; j<moveCoords.length; j++) {
            const allAdjacentCoords = board.getAllAdjacentCellCoords(moveCoords[j])
            for(let k=0; k <allAdjacentCoords.length; k++) {
                const tempBug = new Bug("temp", moveCoords[j], "")
                const proposedMove = new Move(tempBug, allAdjacentCoords[k])
                if(checkMoveLite(proposedMove,board)) proposedMoveCoords.push(allAdjacentCoords[k])
            }
        }
        moveCoords = proposedMoveCoords
    }
    if(moveCoords.includes(move.destCoord)) bIsMoveGood = true
    return bIsMoveGood
}

export default checkSpiderMove;