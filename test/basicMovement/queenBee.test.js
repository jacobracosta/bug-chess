import { expect } from "chai"
import { queenBee } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"
import Board from "../../gameObjects/board.js"

describe("Basic Movement Logic Tests: Queen Bee", function () {

    let testBoard;
    let moveBee, staticBee1;
    beforeEach(function() {
        testBoard = new Board(3)
        moveBee = new queenBee("white",[0,0])
        staticBee1 = new queenBee("black",[1,1])

        testBoard.addToBoard(moveBee)
        testBoard.addToBoard(staticBee1)
    });

    afterEach(function() {
        testBoard.clear()
    });

    it("tests queen bee movement success: move on same bug", function () {
        const move = new Move(moveBee,[0,1])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests queen bee movement success: move on same bug", function () {
        const move = new Move(moveBee,[1,0])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })


    it("tests queen bee movement failure: too far", function () {
        const move = new Move(moveBee,[2,2])
        const check = checkMove(move, testBoard)
        expect(check).to.be.false;
    })

    it("tests queen bee movement failure: hex occupied", function () {
        const move = new Move(moveBee,[1,1])
        const check = checkMove(move, testBoard)
        expect(check).to.be.false;
    })

})