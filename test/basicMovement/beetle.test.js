import { expect } from "chai"
import { beetle } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"
import Board from "../../gameObjects/board.js"

describe("Basic Movement Logic Tests: Beetle", function () {

    let testBoard;
    let moveBeetle, staticBeetle1;
    beforeEach(function() {
        testBoard = new Board()
        moveBeetle = new beetle("white",0)
        staticBeetle1 = new beetle("black",0)
        moveBeetle.addToAdjacent(3,0,staticBeetle1)

        testBoard.addToBoard(moveBeetle)
        testBoard.addToBoard(staticBeetle1)
    });

    afterEach(function() {
        testBoard.clear()
    });

    it("tests beetle movement success: move on same bug", function () {
        const move = new Move(moveBeetle,staticBeetle1,1)
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests beetle movement success: move on top of same bug", function () {
        const move = new Move(moveBeetle,staticBeetle1,6)
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests beetle movement success: move on top of different bug", function () {
        const staticBeetle2 = new beetle("black",0)
        testBoard.addToBoard(staticBeetle2)

        moveBeetle.addToAdjacent(2,5,staticBeetle2)
        staticBeetle2.addToAdjacent(4,1,staticBeetle1)

        const move = new Move(moveBeetle,staticBeetle2,6)
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    
    it("tests beetle movement failure: discontinuity", function () {
        const staticBeetle2 = new beetle("black",0)
        testBoard.addToBoard(staticBeetle2)

        moveBeetle.addToAdjacent(0,3,staticBeetle1)
        moveBeetle.addToAdjacent(3,0,staticBeetle2)
        const move = new Move(moveBeetle, staticBeetle2,6)
        const check = checkMove(move,testBoard)
        expect(check).to.be.false;
    })

    //redundant?
    it.skip("tests beetle movement success: move on different bug", function () {
        const staticBeetle2 = new beetle("black",0)
        testBoard.addToBoard(staticBeetle2)

        moveBeetle.addToAdjacent(2,5,staticBeetle2)
        staticBeetle2.addToAdjacent(4,1,staticBeetle1)

        const move = new Move(moveBeetle,staticBeetle2,0)
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    //redundant?
    it.skip("tests beetle movement failure", function () {
        const move = new Move(moveBeetle,staticBeetle1,2)
        const check = checkMove(move, testBoard)
        expect(check).to.be.false;
    })

})