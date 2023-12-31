import { expect } from "chai"
import { queenBee } from "../../gameCode/gameObjects/bugs.js"
import Move from "../../gameCode/gameObjects/move.js"
import checkMove from "../../gameCode/moveLogic/checkMove.js"
import Board from "../../gameCode/gameObjects/board.js"

describe("Basic Movement Logic Tests: Queen Bee", function () {

    let testBoard;
    let moveBee, staticBee1;
    const firstPlayer = true
    const secondPlayer = false
    beforeEach(function() {
        testBoard = new Board(4)
        moveBee = new queenBee(firstPlayer,[0,1])
        staticBee1 = new queenBee(secondPlayer,[2,2])

        testBoard.addToBoard(moveBee)
        testBoard.addToBoard(staticBee1)
    });

    it("tests queen bee movement: success, move on same bug", function () {
        const move = new Move(moveBee,[0,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests queen bee movement: success move on same bug", function () {
        const move = new Move(moveBee,[2,0])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests queen bee movement: failure, too far", function () {
        const move = new Move(moveBee,[4,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Not Legal")
    })

    it("tests queen bee movement: failure, hex occupied", function () {
        const move = new Move(moveBee,[2,2])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Hex Occupied")
    })

})