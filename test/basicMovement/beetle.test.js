import { expect } from "chai"
import { beetle } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../bugMoveLogic/checkMove.js"
import Board from "../../gameObjects/board.js"

describe("Basic Movement Logic Tests: Beetle", function () {

    let testBoard;
    let moveBeetle, staticBeetle1;
    beforeEach(function() {
        testBoard = new Board(3)
        moveBeetle = new beetle("white",[2,2])
        staticBeetle1 = new beetle("black",[0,1])

        testBoard.addToBoard(moveBeetle)
        testBoard.addToBoard(staticBeetle1)
    });

    afterEach(function() {
        testBoard.clear()
    });

    it("tests beetle movement success: move on same bug", function () {
        const move = new Move(moveBeetle,[0,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests beetle movement success: move on top of same bug", function () {
        const move = new Move(moveBeetle,[0,1])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests beetle movement success: move on top of different bug", function () {
        const staticBeetle2 = new beetle("black",[0,3])
        testBoard.addToBoard(staticBeetle2)

        const move = new Move(moveBeetle,[0,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    
    it.skip("tests beetle movement failure: discontinuity", function () {
        const staticBeetle2 = new beetle("black",[2,1])
        testBoard.addToBoard(staticBeetle2)

        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Breaks Continuity")
    })

})