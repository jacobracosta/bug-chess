import { expect } from "chai"
import { hopper } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"

describe("Basic Hopper Logic Tests: Hopper", function () {

    it("tests hopper movement success: move on same bug", function () {
        const moveHopper = new hopper("white",0)
        const staticHopper = new hopper("black",0)
        moveHopper.addToAdjacent(3,0,staticHopper)
        const move = new Move(moveHopper,staticHopper,3)
        const check = checkMove(move)
        expect(check).to.be.true;
    })

    it("tests hopper movement success: move on different bug", function () {
        const moveHopper = new hopper("white",0)
        const staticHopper1 = new hopper("black",0)
        const staticHopper2 = new hopper("black",0)
        moveHopper.addToAdjacent(1,4,staticHopper1)
        staticHopper1.addToAdjacent(1,4,staticHopper2)
        const move = new Move(moveHopper,staticHopper2,1) //need to account for bad case, if this "1" changes
        const check = checkMove(move)
        expect(check).to.be.true;
    })

    it("tests hopper movement failure: move on same bug", function () {
        const moveHopper = new hopper("white",0)
        const staticHopper = new hopper("black",0)
        moveHopper.addToAdjacent(3,0,staticHopper)
        const move = new Move(moveHopper,staticHopper,2)
        const check = checkMove(move)
        expect(check).to.be.false;
    })

    //good opportunity to check move continuity

    
})