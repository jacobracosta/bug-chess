
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

export default translateRefCoordToArrayCoord