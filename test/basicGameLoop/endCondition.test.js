import { Player } from "../../gameCode/gameObjects/player.js"
import Board from "../../gameCode/gameObjects/board.js"
import { queenBee } from "../../gameCode/gameObjects/bugs.js"
import Move from "../../gameCode/gameObjects/move.js"
import { ant } from "../../gameCode/gameObjects/bugs.js"
import { expect } from "chai"
import checkMove from "../../gameCode/bugMoveLogic/checkMove.js"

describe("Basic Game Loop Test: End Game", function (){

    it("Tests game end state", function() {
        const red = new Player("red")
        const blue = new Player("blue")
        const board = new Board(5)

        const redBee = new queenBee(red,[6,4])
        red.queenBee = redBee
        board.addToBoard(redBee)

        const moveAnt = new ant(blue,[2,4])
        board.addToBoard(moveAnt)
        const staticAnt2 = new ant(blue,[4,5])
        board.addToBoard(staticAnt2)
        const staticAnt3 = new ant(blue,[6,6])
        board.addToBoard(staticAnt3)
        const staticAnt4 = new ant(blue,[8,5])
        board.addToBoard(staticAnt4)
        const staticAnt5 = new ant(blue,[8,3])
        board.addToBoard(staticAnt5)
        const staticAnt6 = new ant(blue,[6,2])
        board.addToBoard(staticAnt6)

        const firstCheck = red.isQueenSurrounded(board)
        expect(firstCheck).to.be.false

        const move = new Move(moveAnt,[4,3])

        const [bIsMoveGood, failureMessage] = checkMove(move,board)
        if(bIsMoveGood) board.updateBugCoord(move)

        const secondCheck = red.isQueenSurrounded(board)
        expect(secondCheck).to.be.true

    })
})