
export function translateRefCoordToArrayCoord(refCoord) {
    let aX, aY;
    const [rX, rY] = refCoord
    aX = rX/2
    if (aX % 2 == 0) aY = ((rY + 1)/2) - 1
    else aY = rY/2
    return [aX,aY]
}

export function translateArrayCoordToRefCoord(arrayCoord) {
    let rX,rY;
    const [aX, aY] = arrayCoord
    if(aX % 2 == 0) rY = (2*(aY + 1)) - 1
    else rY = aY*2
    rX = aX*2
    return [rX,rY]
}

export function verifyRefCoord(refCoord) {
    const [rX,rY] = refCoord
    let coordGood = true
    if(!Number.isInteger(rX) && rX < 0) coordGood = false
    if(!Number.isInteger(rY) && rY < 0) coordGood = false
    return coordGood //may need to do more checks, doing lazy version now.
}

export default translateRefCoordToArrayCoord