import { Player } from "../../gameCode/gameObjects/player.js"
import Board from "../../gameCode/gameObjects/board.js"
import { expect } from "chai"
import addBugToGame, { checkPlacement } from "../../gameCode/game/gameLogic.js"
import Placement from "../../gameCode/gameObjects/placement.js"
import Move from "../../gameCode/gameObjects/move.js"

describe("Basic Game Loop Test: Move Bugs", function (){
//test where move beetle on top, check that can't place opposite piece next to it

    let red, blue, board;
    beforeEach(function (){
        red = new Player("red", true)
        blue = new Player("blue", false)
        board = new Board(5)
    })

    it("tests beetle movement: success", function() { 
        const firstPlacement = new Placement(red,[2,2],"beetle")
        const beetle = addBugToGame(firstPlacement,board)
        board.incrementTurn()

        const secondPlacement = new Placement(blue,[4,3],"spider")
        addBugToGame(secondPlacement,board)
        board.incrementTurn()

        const move = new Move(beetle,[4,3])

        board.updateBugCoord(move)
        board.incrementTurn()

        const thirdPlacementFail = new Placement(blue,[4,5],"spider")
        const [successBlue,messageBlue] = checkPlacement(thirdPlacementFail, board)
        expect(messageBlue).to.be.eq("Can't place next to a bug of opposite color.")
        expect(successBlue).to.be.false

        const thirdPlacementSuccess = new Placement(red,[4,5],"spider")
        const [successRed,messageRed] = checkPlacement(thirdPlacementSuccess, board)
        expect(messageRed).to.eq("Placement Good.")
        expect(successRed).to.be.true

        //should be able to place red here and have it work
    })
})