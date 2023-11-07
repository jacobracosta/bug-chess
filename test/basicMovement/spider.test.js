import { expect } from "chai"
import { spider } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"
import Board from "../../gameObjects/board.js"

describe("Basic Movement Logic Tests: Spider", function () {

    let testBoard;
    let moveSpider, staticSpider1;
    beforeEach(function() {
        testBoard = new Board(7)
        moveSpider = new spider("white",[4,5])
        staticSpider1 = new spider("black",[6,4])

        testBoard.addToBoard(moveSpider)
        testBoard.addToBoard(staticSpider1)
    });

    afterEach(function() {
        testBoard.clear()
    });

    it("tests spider movement success: move on same bug", function () {
        const move = new Move(moveSpider,[8,3])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests spider movement success: move on different bug", function () {
        const staticSpider2 = new spider("black",[8,5])
        testBoard.addToBoard(staticSpider2)

        const move = new Move(moveSpider,[10,6])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests spider movement failure", function () {
        const move = new Move(moveSpider,[4,3])
        const check = checkMove(move, testBoard)
        expect(check).to.be.false;
    })

    //test for continuity

})