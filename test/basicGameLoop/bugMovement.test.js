import { Player } from "../../gameCode/gameObjects/player.js"
import Board from "../../gameCode/gameObjects/board.js"
import { expect } from "chai"
import {checkPlacement} from "../../gameCode/placementLogic/checkPlacement.js";
import Placement from "../../gameCode/gameObjects/placement.js"
import Move from "../../gameCode/gameObjects/move.js"

describe("Basic Game Loop Test: Move Bugs", function (){
//test where move beetle on top, check that can't place opposite piece next to it

    let red, blue, board;
    beforeEach(function (){
        red = new Player("red", true)
        blue = new Player("blue", false)
        board = new Board(6)
    })

    it("tests beetle movement updates: failure", function() { 
        const firstPlacement = new Placement(red,[2,2],"beetle")
        const beetle = firstPlacement.addBugToGame(board)
        board.incrementTurn()

        const secondPlacement = new Placement(blue,[4,3],"spider")
        secondPlacement.addBugToGame(board)
        board.incrementTurn()

        const move = new Move(beetle,[4,3])

        board.updateBugCoord(move)
        board.incrementTurn()

        const thirdPlacementFail = new Placement(blue,[4,5],"spider")
        const [successBlue,messageBlue] = checkPlacement(thirdPlacementFail, board)
        expect(messageBlue).to.be.eq("Can't place next to a bug of other player.")
        expect(successBlue).to.be.false
    })

    it("tests beetle movement updates: success", function() { 
        const firstPlacement = new Placement(red,[2,2],"beetle")
        const beetle = firstPlacement.addBugToGame(board)
        board.incrementTurn()

        const secondPlacement = new Placement(blue,[4,3],"spider")
        secondPlacement.addBugToGame(board)
        board.incrementTurn()

        const move = new Move(beetle,[4,3])

        board.updateBugCoord(move)
        board.incrementTurn()

        const thirdPlacementSuccess = new Placement(red,[4,5],"spider")
        const [successRed,messageRed] = checkPlacement(thirdPlacementSuccess, board)
        expect(messageRed).to.eq("Placement Good.")
        expect(successRed).to.be.true
    })

    it("tests beetle movement updates: hop down, success", function() { 
        const firstPlacement = new Placement(red,[2,2],"beetle")
        const beetle = firstPlacement.addBugToGame(board)
        board.incrementTurn()

        const secondPlacement = new Placement(blue,[4,3],"spider")
        secondPlacement.addBugToGame(board)
        board.incrementTurn()

        const moveUp = new Move(beetle,[4,3])

        board.updateBugCoord(moveUp)
        board.incrementTurn()

        const thirdPlacementSuccess = new Placement(red,[4,5],"spider")
        thirdPlacementSuccess.addBugToGame(board)

        const moveDown = new Move(beetle, [6,4])
        board.updateBugCoord(moveDown)
        board.incrementTurn()

        const fourthPlacementSuccess = new Placement(red,[8,5],"beetle")
        const [successRed,messageRed] = checkPlacement(fourthPlacementSuccess, board)
        expect(messageRed).to.eq("Placement Good.")
        expect(successRed).to.be.true
    })

    it("tests beetle movement updates: hop down, place after success", function() { 
        const firstPlacement = new Placement(red,[2,2],"beetle")
        const beetle = firstPlacement.addBugToGame(board)
        board.incrementTurn()

        const secondPlacement = new Placement(blue,[4,3],"spider")
        secondPlacement.addBugToGame(board)
        board.incrementTurn()

        const moveUp = new Move(beetle,[4,3])

        board.updateBugCoord(moveUp)
        board.incrementTurn()

        const thirdPlacement = new Placement(red,[4,5],"spider")
        thirdPlacement.addBugToGame(board)
        board.incrementTurn()

        const moveAcross = new Move(beetle, [4,5])
        board.updateBugCoord(moveAcross)
        board.incrementTurn()

        const cell = board.getCellFromRefCoord([4,3])
        expect(cell.isEmpty()).to.eq(0)
    })
})