import { Player } from "../../game/player.js"
import Board from "../../gameObjects/board.js"
import { queenBee } from "../../gameObjects/bugs.js"
import Move from "../../gameObjects/move.js"
import { ant } from "../../gameObjects/bugs.js"
import { expect } from "chai"
import checkMove from "../../bugMoveLogic/checkMove.js"
import addBugToGame, { checkPlacement } from "../../game/gameLogic.js"
import Placement from "../../game/placement.js"

describe("Basic Game Loop Test: Add Bugs", function (){

    it("Adds one bug", function() { 
        const red = new Player("red")
        const board = new Board(5)
        const placement = new Placement(red,[2,2],"spider")

        const [success,message] = checkPlacement(placement, board)
        expect(success).to.be.true
        expect(message).to.eq("Placement Good.")

        addBugToGame(placement,board)
    })

    it("Adds two bugs", function() { 
        const red = new Player("red")
        const blue = new Player("blue")

        const board = new Board(5)
        const firstPlacement = new Placement(red,[2,2],"spider")
        const [success,message] = checkPlacement(firstPlacement, board)
        expect(message).to.eq("Placement Good.")
        expect(success).to.be.true
        addBugToGame(firstPlacement,board)

        const secondPlacement = new Placement(blue,[4,3],"spider")
        const [success2,message2] = checkPlacement(secondPlacement, board)
        expect(message2).to.eq("Placement Good.")
        expect(success2).to.be.true
        addBugToGame(secondPlacement,board)

    })



    //test one bug addition
    //test first opposite color placement
    //test successful third piece placement
    //test failed third piece placement



})