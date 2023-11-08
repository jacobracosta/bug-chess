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

export default doesArrayContainObject