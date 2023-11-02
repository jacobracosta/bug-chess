
export function getSingleHexMoveLength(move) { //need better name

    return(Math.abs(destIndex - staticBug.adjacentArray.indexOf(moveBug)))
}

export function isMoveOneHex(move) {
    const [x0,y0] = move.startCoord
    const [x1,y1] = move.destCoord
    const x = x0-x1
    const y = y0-y1
    return Math.sqrt(x * x + y * y) == 1 ? true : false ;
}

export function checkSingleHexMove(move) {
    return isMoveOneHex(move)
}

export default getSingleHexMoveLength;