import { expect } from "chai"
import { hopper } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"
import Board from "../../gameObjects/board.js"

describe("Basic Hopper Logic Tests: Hopper", function () {

    let testBoard;
    let moveHopper, staticHopper1;
    beforeEach(function() {
        testBoard = new Board(6)
        moveHopper = new hopper("white",[0,1])
        staticHopper1 = new hopper("black",[2,2])

        testBoard.addToBoard(moveHopper)
        testBoard.addToBoard(staticHopper1)
    });

    afterEach(function() {
        testBoard.clear()
    });

    it("tests hopper movement success: diagonal down right", function () {
        const move = new Move(moveHopper,[4,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement success: diagonal up left", function () {
        const diagHopper = new hopper("black",[4,1])
        testBoard.addToBoard(diagHopper)

        const move = new Move(diagHopper,[0,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement success: diagonal down left", function () {
        const diagHopper = new hopper("black",[0,3])
        testBoard.addToBoard(diagHopper)

        const move = new Move(diagHopper,[4,1])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement success: diagonal up right", function () {
        const staticHopper2 = new hopper("black",[2,4])
        testBoard.addToBoard(staticHopper2)
        const diagHopper = new hopper("black",[4,5])
        testBoard.addToBoard(diagHopper)

        const move = new Move(diagHopper,[0,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement success: same row jump", function () {
        const staticHopper2 = new hopper("black",[0,3])
        testBoard.addToBoard(staticHopper2)

        const move = new Move(moveHopper,[0,5])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement failure: move on same bug", function () {
        const move = new Move(moveHopper,[4,1])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Not Legal")
    })

    it("tests hopper movement success: move on different bug", function () {
        const staticHopper2 = new hopper("black",[4,3])
        testBoard.addToBoard(staticHopper2)

        const move = new Move(moveHopper,[6,4])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement failure: gap underneath", function () {
        const staticHopper2 = new hopper("black",[6,4])
        testBoard.addToBoard(staticHopper2)

        const move = new Move(moveHopper,[8,5])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Not Legal")
    })

    it.skip("tests hopper movement failure: discontinuity", function () {
        const staticHopper2 = new hopper("black",0)
        testBoard.addToBoard(staticHopper2)

        const move = new Move(moveHopper,3)
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Breaks Continuity")
    })
    
})