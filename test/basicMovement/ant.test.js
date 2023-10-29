import { expect } from "chai"
import { ant } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"
import Board from "../../gameObjects/board.js"

describe("Basic Movement Logic Tests: Ant", function (){

    let testBoard;
    let moveAnt, staticAnt1;
    beforeEach(function() {
        testBoard = new Board()
        moveAnt = new ant("white",0)
        staticAnt1 = new ant("black",0)
        moveAnt.addToAdjacent(3,0,staticAnt1)

        testBoard.addToBoard(moveAnt)
        testBoard.addToBoard(staticAnt1)
    });

    afterEach(function() {
        testBoard.clear()
    });

    it("tests ant movement success: move on same bug", function () {
        const move = new Move(moveAnt,staticAnt1,4)
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests ant movement success: move on different bug", function () {
        const staticAnt2 = new ant("black",0)
        testBoard.addToBoard(staticAnt2)

        staticAnt2.addToAdjacent(3,0,staticAnt1)

        const move = new Move(moveAnt,staticAnt2,5)
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests ant movement failure: discontinuity", function () {
        const staticAnt2 = new ant("black",0)
        testBoard.addToBoard(staticAnt2)

        moveAnt.addToAdjacent(0,3,staticAnt1)
        moveAnt.addToAdjacent(3,0,staticAnt2)
        const move = new Move(moveAnt,staticAnt2,3)
        const check = checkMove(move,testBoard)
        expect(check).to.be.false;
    })

})