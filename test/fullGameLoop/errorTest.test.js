import { expect } from "chai";
import { gameLoopTestHandle } from "../../gameCode/game/gameLoop.js"
import errorTestPlacementJson from "../testData/errorTest.placement.json" assert { type: 'json' };
import errorTestMovementJson from "../testData/errorTest.movement.json" assert { type: 'json' };
import errorTestLoopJson from "../testData/errorTest.loop.json" assert { type: 'json' };

describe("Basic Game Loop Test: Full Game Loop", function (){

    it("Tests Errors: Placement Errors", function (){ 
        const [gameOverMessage, errors] = gameLoopTestHandle(errorTestPlacementJson["commands"])
        expect(gameOverMessage).to.eq("End of Test Input.")
        expect(errors).to.be.an("array").that.includes("Dest Hex not Adjacent to Anything. Re-input command.")
        expect(errors).to.be.an("array").that.includes("Hex Occupied. Re-input command.")
        expect(errors).to.be.an("array").that.includes("Can't place next to a bug of other player. Re-input command.")
        expect(errors).to.be.an("array").that.includes("Too many of this bug. Re-input command.")
    })

    it("Tests Errors: Movement Errors", function (){ 
        const [gameOverMessage, errors] = gameLoopTestHandle(errorTestMovementJson["commands"])
        expect(gameOverMessage).to.eq("End of Test Input.")
        expect(errors).to.be.an("array").that.includes("End State Not Legal.")
        expect(errors).to.be.an("array").that.includes("Move Not Legal.")
        expect(errors).to.be.an("array").that.includes("Move Breaks Continuity.")
        expect(errors).to.be.an("array").that.includes("Dest Hex not Adjacent to Anything.")
        expect(errors).to.be.an("array").that.includes("Hex Occupied.")
    })

    it("Tests Errors: Loop Errors", function (){ 
        const [gameOverMessage, errors] = gameLoopTestHandle(errorTestLoopJson["commands"])
        expect(gameOverMessage).to.eq("End of Test Input.")
        expect(errors).to.be.an("array").that.is.empty
    })

})
