import { expect } from "chai"
import { ant } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import checkMove from "../../gameLogic/checkMove.js"
import Board from "../../gameObjects/board.js"

describe("Basic Movement Logic Tests: Ant", function (){

    let testBoard;
    let moveAnt, staticAnt1;
    beforeEach(function() {
        testBoard = new Board(5)
        moveAnt = new ant("white",[0,1])
        staticAnt1 = new ant("black",[2,2])

        testBoard.addToBoard(moveAnt)
        testBoard.addToBoard(staticAnt1)
    });

    afterEach(function() {
        testBoard.clear()
    });

    it("tests ant movement success: move on same bug", function () {
        const move = new Move(moveAnt,[2,4])
        const check = checkMove(move, testBoard)
        expect(check).to.be.true;
    })

    it("tests ant movement success: move on different bug", function () {
        const staticAnt2 = new ant("black",[4,3])
        testBoard.addToBoard(staticAnt2)

        const move = new Move(moveAnt,[6,2])
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

    it("tests ant movement failure: breaks crescent", function () {
        
        const staticAnt2 = new ant("black",[2,4])
        testBoard.addToBoard(staticAnt2)
        const staticAnt3 = new ant("black",[4,5])
        testBoard.addToBoard(staticAnt3)
        const staticAnt4 = new ant("black",[6,4])
        testBoard.addToBoard(staticAnt4)
        const staticAnt5 = new ant("black",[6,2])
        testBoard.addToBoard(staticAnt5)

        const move = new Move(moveAnt,[4,3])

        const check = checkMove(move,testBoard)
        expect(check).to.be.false;
    })

})