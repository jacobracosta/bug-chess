import { expect } from "chai"
import { queenBee } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"

describe("Basic Movement Logic Tests: Queen Bee", function () {

    //create beforeeach where a board is made, staticBee1 is made
    //create aftereach where board is cleared
    it("tests queen bee movement success: move on same bug", function () {
        const moveBee = new queenBee("white",0)
        const staticBee = new queenBee("black",0)
        moveBee.addToAdjacent(3,0,staticBee)
        const move = new Move(moveBee,staticBee,1)
        const check = checkMove(move)
        expect(check).to.be.true;
    })

    it.skip("tests queen bee movement success: move on different bug", function () {
        const moveBee = new queenBee("white",0)
        const staticBee1 = new queenBee("black",0)
        const staticBee2 = new queenBee("black",0)
        moveBee.addToAdjacent(3,0,staticBee1)
        moveBee.addToAdjacent(2,5,staticBee2)
        const move = new Move(moveBee,staticBee2,0)
        const check = checkMove(move)
        expect(check).to.be.true;
    })

    it.skip("tests queen bee movement failure", function () {
        const moveBee = new queenBee("white",0)
        const staticBee = new queenBee("black",0)
        moveBee.addToAdjacent(3,0,staticBee)
        const move = new Move(moveBee,staticBee,2)
        const check = checkMove(move)
        expect(check).to.be.false;
    })

})