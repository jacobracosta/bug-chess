import { expect } from "chai"
import { ant } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"
import Board from "../../gameObjects/board.js"

describe("Basic Movement Logic Tests: Ant", function (){

    let testBoard;
    let moveAnt, staticAnt1;
    beforeEach(function() {
        testBoard = new Board(4)
        moveAnt = new ant("white",[0,0])
        staticAnt1 = new ant("black",[1,0])

        testBoard.addToBoard(moveAnt)
        testBoard.addToBoard(staticAnt1)
    });

    afterEach(function() {
        testBoard.clear()
    });

    it("tests ant movement success: move on same bug", function () {
        const move = new Move(moveAnt,[2,1])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests ant movement success: move on different bug", function () {
        const staticAnt2 = new ant("black",[2,1])
        testBoard.addToBoard(staticAnt2)

        const move = new Move(moveAnt,[2,2])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests ant movement failure: discontinuity", function () {
        const staticAnt2 = new ant("black",[2,1])
        testBoard.addToBoard(staticAnt2)

        const move = new Move(staticAnt1,[3,1])
        const check = checkMove(move,testBoard)
        expect(check).to.be.false;
    })

    it.skip("tests ant movement failure: bad end state", function () {
        /*
        const staticAnt2 = new ant("black",0)
        testBoard.addToBoard(staticAnt2)
        const staticAnt3 = new ant("black",0)
        testBoard.addToBoard(staticAnt3)
        const staticAnt4 = new ant("black",0)
        testBoard.addToBoard(staticAnt4)
        const staticAnt5 = new ant("black",0)
        testBoard.addToBoard(staticAnt5)

        const move = new Move(moveAnt,5)

        const check = checkMove(move,testBoard)
        expect(check).to.be.false;*/
    })

})