import { Player } from "../../game/player.js"
import Board from "../../gameObjects/board.js"
import { queenBee } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import { ant } from "../../gameObjects/bugs.js"
import { expect } from "chai"
import checkMove from "../../bugMoveLogic/checkMove.js"
import { updateBugCoord } from "../../game/gameLogic.js"

describe("Basic Game Loop Test: End Game", function (){

    it("Tests end state", function() {
        const red = new Player("red")
        const board = new Board(5)

        const redBee = new queenBee("white",[6,4])
        red.queenBee = redBee
        board.addToBoard(redBee)

        const moveAnt = new ant("black",[2,4])
        board.addToBoard(moveAnt)
        const staticAnt2 = new ant("black",[4,5])
        board.addToBoard(staticAnt2)
        const staticAnt3 = new ant("black",[6,6])
        board.addToBoard(staticAnt3)
        const staticAnt4 = new ant("black",[8,5])
        board.addToBoard(staticAnt4)
        const staticAnt5 = new ant("black",[8,3])
        board.addToBoard(staticAnt5)
        const staticAnt6 = new ant("black",[6,2])
        board.addToBoard(staticAnt6)

        const firstCheck = red.isQueenSurrounded(board)
        expect(firstCheck).to.be.false

        const move = new Move(moveAnt,[4,3])
        if(checkMove(move,board)) updateBugCoord(moveAnt)

        const secondCheck = red.isQueenSurrounded(board)
        expect(secondCheck).to.be.true

    })
})