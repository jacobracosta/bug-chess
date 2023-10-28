
export function getSingleHexMoveLength(moveBug, staticBug, destIndex) { //need better name
    //need protection here if staticBug doesn't have an entry matching movebug?
    return(Math.abs(destIndex - staticBug.adjacentArray.indexOf(moveBug)))
}

export default getSingleHexMoveLength;