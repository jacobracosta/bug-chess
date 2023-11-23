export function doesArrayContainObject(array, object) {
    let contains = false
    for(let i=0; i<array.length;i++){
        if(JSON.stringify(object) == JSON.stringify(array[i])) {
            contains = true
            break
        }
    }
    return contains
}

export function doesArrayContainBug(array, bug) {
    let contains = false
    const player = bug.player.color
    const type = bug.type
    const coord = bug.coord
    for(let i=0; i<array.length;i++){
        const tempPlayer = array[i].player.color
        const tempType = array[i].type
        const tempCoord = array[i].coord
        if(tempPlayer==player && tempType==type && tempCoord==coord) {
            contains = true
            break
        }
    }
    return contains
}

export default doesArrayContainObject