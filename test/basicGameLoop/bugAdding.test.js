import { Player } from "../../gameCode/gameObjects/player.js"
import Board from "../../gameCode/gameObjects/board.js"
import { expect } from "chai"
import { addBugToGame, checkPlacement } from "../../gameCode/game/checkPlacement.js"
import Placement from "../../gameCode/gameObjects/placement.js"

describe("Basic Game Loop Test: Add Bugs", function (){

    let red, blue, board;
    beforeEach(function (){
        red = new Player("red", true)
        blue = new Player("blue", false)
        board = new Board(5)
    })

    it("Adds one bug: success", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        const [success,message] = checkPlacement(firstPlacement, board)
        expect(success).to.be.true
        expect(message).to.eq("Placement Good.")

        const spider= addBugToGame(firstPlacement,board)
        board.incrementTurn()
        expect(spider).to.be.not.null
    })

    it("Adds two bugs: success", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        const [success,message] = checkPlacement(firstPlacement, board)
        expect(message).to.eq("Placement Good.")
        expect(success).to.be.true

        const spider = addBugToGame(firstPlacement, board)
        board.incrementTurn()
        expect(spider).to.be.not.null

        const secondPlacement = new Placement(blue,[4,3],"spider")
        const [success2,message2] = checkPlacement(secondPlacement, board)
        expect(message2).to.eq("Placement Good.")
        expect(success2).to.be.true
        
        const spider2 = addBugToGame(secondPlacement,board)
        board.incrementTurn()
        expect(spider2).to.be.not.null
        expect(board.turn).to.eq(3)
    })

    it("Adds two bugs: failure, hex not adjacent", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        addBugToGame(firstPlacement, board)
        board.incrementTurn()

        const secondPlacement = new Placement(blue,[4,5],"spider")
        const [success,message] = checkPlacement(secondPlacement, board)
        expect(success).to.be.false
        expect(message).to.be.eq("Dest Hex not Adjacent to Anything.")
    })

    it("Adds two bugs: failure, hex occupied", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        addBugToGame(firstPlacement, board)
        board.incrementTurn()

        const secondPlacement = new Placement(blue,[2,2],"spider")
        const [success,message] = checkPlacement(secondPlacement, board)
        expect(success).to.be.false
        expect(message).to.be.eq("Hex Occupied.")
    })

    it("Adds three bugs: success", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        addBugToGame(firstPlacement, board)
        board.incrementTurn()

        const secondPlacement = new Placement(blue,[4,3],"spider")
        addBugToGame(secondPlacement,board)
        board.incrementTurn()

        const thirdPlacement = new Placement(red,[0,3],"spider")
        const [success3,message3] = checkPlacement(thirdPlacement, board)
        expect(message3).to.eq("Placement Good.")
        expect(success3).to.be.true
        
        const spider = addBugToGame(thirdPlacement,board)
        board.incrementTurn()
        expect(spider).to.be.not.null
        expect(board.turn).to.eq(4)
    })

    it("Adds three bugs: failure", function() { 
        const firstPlacement = new Placement(red,[2,2],"spider")
        addBugToGame(firstPlacement, board)
        board.incrementTurn()

        const secondPlacement = new Placement(blue,[4,3],"spider")
        const spider = addBugToGame(secondPlacement,board)
        board.incrementTurn()
        expect(spider).to.be.not.null
        expect(board.turn).to.eq(3)

        const thirdPlacement = new Placement(red,[2,4],"spider")
        const [success3,message3] = checkPlacement(thirdPlacement, board)
        expect(message3).to.eq("Can't place next to a bug of opposite color.")
        expect(success3).to.be.false
    })
})