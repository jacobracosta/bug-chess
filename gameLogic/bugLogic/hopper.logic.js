import { translateRefCoordToArrayCoord } from "../../utils/coordinateTranslate.util.js"

export function checkHopperMove(move, board) {
    return isMoveAStraightHop(move, board)
}

function isMoveAStraightHop(move, board){
    let isMoveGood = false
    const [x0,y0] = move.moveBug.coord
    const [x1,y1] = move.destCoord
    const x = x1 - x0
    const y = y1 - y0
    const boardMatrix = board.boardMatrix

    const [aXo,aYo] = translateRefCoordToArrayCoord(move.moveBug.coord)
    const [aXd,aYd] = translateRefCoordToArrayCoord(move.destCoord)
    const colDiff = Math.abs(aYd - aYo)
    if ( y == 0) isMoveGood = false
    else {
        if ( x == 0 ) {
            if(colDiff > 1) {
                const underCells = boardMatrix[aXd]
                isMoveGood = true
                for (let i=aYd; i < aYd; i++) {
                    const checkCell = underCells[i]
                    if (checkCell.isEmpty) {
                        isMoveGood = false
                        break
                    }
                }
            } else isMoveGood = false
        } else { 
            let [sX, sY] = move.destCoord
            if(x > 0) [sX, sY] = move.moveBug.coord
            isMoveGood = true
            for (let i=sX; i< aXd-1; i++) {
                if(y>0) [sX,sY] = [sX+2,sY+1] //diag down left and diag up right
                else [sX,sY] = [sX+2,sY-1] //diag down right and diag diag up left
                const checkCell = board.getCellFromRefCoord([sX,sY])
                if (checkCell.isEmpty) {
                    isMoveGood = false
                    break
                }
            }
        }
    }
    return isMoveGood
}

export default checkHopperMove;