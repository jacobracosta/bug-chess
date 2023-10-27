import { expect } from "chai"
import { queenBee } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"

describe("Basic Movement Logic Tests: Queen Bee", function () {
    it("tests queen bee movement success: move on same bug", function () {
        const moveBee = new queenBee("white",0)
        const staticBee = new queenBee("black",0)
        moveBee.addToAdjacent(3,0,staticBee)
        const beeMove = new Move(moveBee,staticBee,1)
        const check = checkMove(beeMove)
        expect(check).to.be.true;
    })

    it("tests queen bee movement success: move on differentbug", function () {
        const moveBee = new queenBee("white",0)
        const staticBee1 = new queenBee("black",0)
        const staticBee2 = new queenBee("black",0)
        moveBee.addToAdjacent(3,0,staticBee1)
        moveBee.addToAdjacent(2,5,staticBee2)
        const beeMove = new Move(moveBee,staticBee2,0)
        const check = checkMove(beeMove)
        expect(check).to.be.true;
    })


    it("tests queen bee movement failure", function () {
        const moveBee = new queenBee("white",0)
        const staticBee = new queenBee("black",0)
        moveBee.addToAdjacent(3,0,staticBee)
        const beeMove = new Move(moveBee,staticBee,2)
        const check = checkMove(beeMove)
        expect(check).to.be.false;
    })

})