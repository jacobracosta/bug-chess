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

    let red, blue, board;
    beforeEach(function (){
        red = new Player("red", true)
        blue = new Player("blue", false)
        board = new Board(5)
    })

    it("Adds one bug", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        const [success,message] = checkPlacement(firstPlacement, board)
        expect(success).to.be.true
        expect(message).to.eq("Placement Good.")

        const [addSuccess, turn] = addBugToGame(firstPlacement,board)
        expect(addSuccess).to.be.true
        expect(turn).to.eq(2)
    })

    it("Adds two bugs", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        const [success,message] = checkPlacement(firstPlacement, board)
        expect(message).to.eq("Placement Good.")
        expect(success).to.be.true

        const [addSuccess, turn] = addBugToGame(firstPlacement, board)
        expect(addSuccess).to.be.true
        expect(turn).to.eq(2)

        const secondPlacement = new Placement(blue,[4,3],"spider")
        const [success2,message2] = checkPlacement(secondPlacement, board)
        expect(message2).to.eq("Placement Good.")
        expect(success2).to.be.true
        
        const [addSuccess2, turn2] = addBugToGame(secondPlacement,board)
        expect(addSuccess2).to.be.true
        expect(turn2).to.eq(3)
    })

    it("Adds three bugs: success", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        const [success,message] = checkPlacement(firstPlacement, board)
        expect(message).to.eq("Placement Good.")
        expect(success).to.be.true

        const [addSuccess, turn] = addBugToGame(firstPlacement, board)
        expect(addSuccess).to.be.true
        expect(turn).to.eq(2)

        const secondPlacement = new Placement(blue,[4,3],"spider")
        const [success2,message2] = checkPlacement(secondPlacement, board)
        expect(message2).to.eq("Placement Good.")
        expect(success2).to.be.true
        
        const [addSuccess2, turn2] = addBugToGame(secondPlacement,board)
        expect(addSuccess2).to.be.true
        expect(turn2).to.eq(3)

        const thirdPlacement = new Placement(red,[0,3],"spider")
        const [success3,message3] = checkPlacement(thirdPlacement, board)
        expect(message3).to.eq("Placement Good.")
        expect(success3).to.be.true
        
        const [addSuccess3, turn3] = addBugToGame(thirdPlacement,board)
        expect(addSuccess3).to.be.true
        expect(turn3).to.eq(4)
    })

    it("Adds three bugs: failure", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        const [success,message] = checkPlacement(firstPlacement, board)
        expect(message).to.eq("Placement Good.")
        expect(success).to.be.true

        const [addSuccess, turn] = addBugToGame(firstPlacement, board)
        expect(addSuccess).to.be.true
        expect(turn).to.eq(2)

        const secondPlacement = new Placement(blue,[4,3],"spider")
        const [success2,message2] = checkPlacement(secondPlacement, board)
        expect(message2).to.eq("Placement Good.")
        expect(success2).to.be.true
        
        const [addSuccess2, turn2] = addBugToGame(secondPlacement,board)
        expect(addSuccess2).to.be.true
        expect(turn2).to.eq(3)

        const thirdPlacement = new Placement(red,[2,4],"spider")
        const [success3,message3] = checkPlacement(thirdPlacement, board)
        expect(message3).to.eq("Can't place next to a bug of opposite color.")
        expect(success3).to.be.false
    })



    //test one bug addition
    //test first opposite color placement
    //test successful third piece placement
    //test failed third piece placement



})