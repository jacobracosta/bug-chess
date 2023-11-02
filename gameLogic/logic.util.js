
export function getSingleHexMoveLength(move) { //need better name

    return(Math.abs(destIndex - staticBug.adjacentArray.indexOf(moveBug)))
}

export function isMoveOneHex(move) { //need to redo this potentially?
    const [x0,y0] = move.startCoord
    const [x1,y1] = move.destCoord
    const x = x1 - x0
    const y = y1 - y0
    const distance =  Math.sqrt(x * x + y * y)
    let isMoveOneHex = false
    if(distance == 1) isMoveOneHex = true
    else if(distance > 1 && distance < 2) {
        if( y > 0 && x != 0) {
            isMoveOneHex = false
        }
        else isMoveOneHex = true
    }
    else isMoveOneHex = false
    return isMoveOneHex
}

export function checkSingleHexMove(move) {
    return isMoveOneHex(move)
}

export default getSingleHexMoveLength;