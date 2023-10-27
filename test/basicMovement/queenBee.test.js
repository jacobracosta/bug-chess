import { expect } from "chai"
import { queenBee } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"

describe("Basic Movement Logic Tests: Queen Bee", function () {
    it("tests queen bee movement success", function () {
        const bee1 = new queenBee("white",0)
        const bee2 = new queenBee("black",0)
        bee1.addToAdjacent(1,bee2)
        const beeMove = new Move(bee1,bee2,2)
        const check = checkMove(beeMove)
        expect(check).to.be.true;
    })

    it("tests queen bee movement failure", function () {
        const bee1 = new queenBee("white",0)
        const bee2 = new queenBee("black",0)
        bee1.addToAdjacent(1,bee2)
        const beeMove = new Move(bee1,bee2,3)
        const check = checkMove(beeMove)
        expect(check).to.be.false;
    })

})