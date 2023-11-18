import { expect } from "chai"
import { ant } from "../../gameCode/gameObjects/bugs.js"
import Move from "../../gameCode/gameObjects/move.js"
import checkMove from "../../gameCode/bugMoveLogic/checkMove.js"
import Board from "../../gameCode/gameObjects/board.js"

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

    it("tests ant movement: success, move on same bug", function () {
        const move = new Move(moveAnt,[2,4])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests ant movement: success, move on different bug", function () {
        const staticAnt2 = new ant("black",[4,3])
        testBoard.addToBoard(staticAnt2)

        const move = new Move(moveAnt,[6,2])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests ant movement: failure, discontinuity", function () {
        const staticAnt2 = new ant("black",[4,3])
        testBoard.addToBoard(staticAnt2)

        const move = new Move(staticAnt1,[2,4])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Breaks Continuity")
    })

    it("tests ant movement: failure, breaks crescent", function () {
        const staticAnt2 = new ant("black",[2,4])
        testBoard.addToBoard(staticAnt2)
        const staticAnt3 = new ant("black",[4,5])
        testBoard.addToBoard(staticAnt3)
        const staticAnt4 = new ant("black",[6,4])
        testBoard.addToBoard(staticAnt4)
        const staticAnt5 = new ant("black",[6,2])
        testBoard.addToBoard(staticAnt5)

        const move = new Move(moveAnt,[4,3])

        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("End State Not Legal")
    })
    
})