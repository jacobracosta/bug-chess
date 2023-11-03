import { expect } from "chai"
import { hopper } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"
import Board from "../../gameObjects/board.js"

describe("Basic Hopper Logic Tests: Hopper", function () { //do hopper next

    let testBoard;
    let moveHopper, staticHopper1;
    beforeEach(function() {
        testBoard = new Board(4)
        moveHopper = new hopper("white",[0,0])
        staticHopper1 = new hopper("black",[1,1])

        testBoard.addToBoard(moveHopper)
        testBoard.addToBoard(staticHopper1)
    });

    afterEach(function() {
        testBoard.clear()
    });

    it("tests hopper movement success: move on same bug", function () { //need to check reverse directions as well
        const move = new Move(moveHopper,staticHopper1,[2,1])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests hopper movement failure: move on same bug", function () {
        const move = new Move(moveHopper,staticHopper1,[2,2])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests hopper movement success: move on different bug", function () {
        const staticHopper2 = new hopper("black",[2,1])
        testBoard.addToBoard(staticHopper2)

        const move = new Move(moveHopper,staticHopper2,[3,1])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it.skip("tests hopper movement failure: discontinuity", function () {
        const staticHopper2 = new hopper("black",0)
        testBoard.addToBoard(staticHopper2)

        moveHopper.addToAdjacent(0,3,staticHopper1)
        moveHopper.addToAdjacent(3,0,staticHopper2)
        const move = new Move(moveHopper,staticHopper2,3)
        const check = checkMove(move,testBoard)
        expect(check).to.be.false;
    })
    
})