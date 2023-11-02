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
        const move = new Move(moveBee,staticBee1,[0,1])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it.skip("tests queen bee movement success: move on different bug", function () {
        const staticBee2 = new queenBee("black",0)
        testBoard.addToBoard(staticBee2)
        
        staticBee2.addToAdjacent(4,1,staticBee1)

        const move = new Move(moveBee,staticBee2,0)
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests queen bee movement failure", function () {
        const move = new Move(moveBee,staticBee1,[0,2])
        const check = checkMove(move, testBoard)
        expect(check).to.be.false;
    })

})