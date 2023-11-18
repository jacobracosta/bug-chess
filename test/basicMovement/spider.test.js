import { expect } from "chai"
import { spider } from "../../gameCode/gameObjects/bugs.js"
import Move from "../../gameCode/gameObjects/move.js"
import checkMove from "../../gameCode/bugMoveLogic/checkMove.js"
import Board from "../../gameCode/gameObjects/board.js"

describe("Basic Movement Logic Tests: Spider", function () {

    let testBoard;
    let moveSpider, staticSpider1;
    beforeEach(function() {
        testBoard = new Board(8)
        moveSpider = new spider("white",[4,5])
        staticSpider1 = new spider("black",[6,6])

        testBoard.addToBoard(moveSpider)
        testBoard.addToBoard(staticSpider1)
    });

    it("tests spider movement: success, move on same bug", function () {
        const move = new Move(moveSpider,[8,7])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests spider movement: success, move on different bug", function () {
        const staticSpider2 = new spider("black",[8,5])
        testBoard.addToBoard(staticSpider2)

        const move = new Move(moveSpider,[8,7]) //10,4
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests spider movement: failure", function () {
        const move = new Move(moveSpider,[8,5])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Not Legal")
    })

    it("tests spider movement: success, 4 options", function (){
        const staticSpider2 = new spider("black",[8,7])
        const staticSpider3 = new spider("black",[10,6])
        const staticSpider4 = new spider("black",[12,5])
        const staticSpider5 = new spider("black",[12,3])
        const staticSpider6 = new spider("black",[12,1])
        const staticSpider7 = new spider("black",[10,0])
        const staticSpider8 = new spider("black",[8,1])
        const staticSpider9 = new spider("black",[6,2])
        testBoard.addToBoard(staticSpider2)
        testBoard.addToBoard(staticSpider3)
        testBoard.addToBoard(staticSpider4)
        testBoard.addToBoard(staticSpider5)
        testBoard.addToBoard(staticSpider6)
        testBoard.addToBoard(staticSpider7)
        testBoard.addToBoard(staticSpider8)
        testBoard.addToBoard(staticSpider9)

        const move1 = new Move(moveSpider,[10,2])
        const move2 = new Move(moveSpider,[10,4])
        const move3 = new Move(moveSpider,[4,1])
        const move4 = new Move(moveSpider,[8,9])

        const [check1,message1] = checkMove(move1, testBoard)
        const [check2,message2] = checkMove(move2, testBoard)
        const [check3,message3] = checkMove(move3, testBoard)
        const [check4,message4] = checkMove(move4, testBoard)
        expect(check1).to.be.true;
        expect(check2).to.be.true;
        expect(check3).to.be.true;
        expect(check4).to.be.true;
    })
})