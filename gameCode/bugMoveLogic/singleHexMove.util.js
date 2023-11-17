export function checkSingleHexMove(move, board) {
    let isMoveOneHex = false
    const [x0,y0] = move.startCoord
    const [x1,y1] = move.destCoord
    const x = x1 - x0
    const y = y1 - y0
    if( x == 0 && Math.abs(y) == 2) {
        if(move.moveBug.type == "beetle") isMoveOneHex = true
        else { //rolling case
            if( y > 0) { // moving right
                const topRightCoord = [x0-2,y0+1]
                const bottomRightCoord = [x0+2,y0+1]
                if(x0-2>0) {
                    const topRightCell = board.getCellFromRefCoord(topRightCoord)
                    if(!topRightCell.isEmpty()) isMoveOneHex = true
                } else {
                    const bottomRightCell = board.getCellFromRefCoord(bottomRightCoord)
                    if(!bottomRightCell.isEmpty()) isMoveOneHex = true
                }
            } else { //left
                const topLeftCoord = [x0-2,y0-1]
                const bottomLeftCoord = [x0+2,y0-1]
                if(y0-1 > 0) {
                    if(x0-2>0) {
                        const topLeftCell = board.getCellFromRefCoord(topLeftCoord)
                        if(!topLeftCell.isEmpty()) isMoveOneHex = true
                    } else {
                        const bottomLeftCell = board.getCellFromRefCoord(bottomLeftCoord)
                        if(!bottomLeftCell.isEmpty()) isMoveOneHex = true
                    }
                }
            }
        }
    }
    else if (Math.abs(x) == 2 && Math.abs(y) == 1) isMoveOneHex = true
    return isMoveOneHex
}

export default checkSingleHexMove