import { expect } from "chai"
import { hopper } from "../../gameCode/gameObjects/bugs.js"
import Move from "../../gameCode/gameObjects/move.js"
import checkMove from "../../gameCode/moveLogic/checkMove.js"
import Board from "../../gameCode/gameObjects/board.js"

describe("Basic Hopper Logic Tests: Hopper", function () {

    let testBoard;
    let moveHopper, staticHopper1;
    const firstPlayer = true
    const secondPlayer = false
    beforeEach(function() {
        testBoard = new Board(6)
        moveHopper = new hopper(firstPlayer,[0,1])
        staticHopper1 = new hopper(secondPlayer,[2,2])

        testBoard.addToBoard(moveHopper)
        testBoard.addToBoard(staticHopper1)
    });

    it("tests hopper movement: success, diagonal down right", function () {
        const move = new Move(moveHopper,[4,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement: success, diagonal up left", function () {
        const diagHopper = new hopper(secondPlayer,[4,1])
        testBoard.addToBoard(diagHopper)

        const move = new Move(diagHopper,[0,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement: success, diagonal down left", function () {
        const diagHopper = new hopper(secondPlayer,[0,3])
        testBoard.addToBoard(diagHopper)

        const move = new Move(diagHopper,[4,1])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement: success, diagonal up right", function () {
        const staticHopper2 = new hopper(secondPlayer,[2,4])
        testBoard.addToBoard(staticHopper2)
        const diagHopper = new hopper(secondPlayer,[4,5])
        testBoard.addToBoard(diagHopper)

        const move = new Move(diagHopper,[0,3])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement: success, same row jump", function () {
        const staticHopper2 = new hopper(secondPlayer,[0,3])
        testBoard.addToBoard(staticHopper2)

        const move = new Move(moveHopper,[0,5])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement: failure, move on same bug", function () {
        const move = new Move(moveHopper,[4,1])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Not Legal.")
    })

    it("tests hopper movement: success, move on different bug", function () {
        const staticHopper2 = new hopper(secondPlayer,[4,3])
        testBoard.addToBoard(staticHopper2)

        const move = new Move(moveHopper,[6,4])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.true;
        expect(message).to.eq("Success")
    })

    it("tests hopper movement: failure, gap underneath", function () {
        const staticHopperA = new hopper(secondPlayer,[2,4])
        const staticHopperB = new hopper(secondPlayer,[4,5])
        const staticHopper2 = new hopper(secondPlayer,[6,4])
        testBoard.addToBoard(staticHopper2)
        testBoard.addToBoard(staticHopperA)
        testBoard.addToBoard(staticHopperB)

        const move = new Move(moveHopper,[8,5])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Not Legal.")
    })

    it("tests hopper movement: failure, discontinuity", function () {
        const staticHopper2 = new hopper(secondPlayer,[4,3])
        testBoard.addToBoard(staticHopper2)

        const move = new Move(staticHopper1,[6,4])
        const [check,message] = checkMove(move, testBoard)
        expect(check).to.be.false;
        expect(message).to.eq("Move Breaks Continuity.")
    })
    
})