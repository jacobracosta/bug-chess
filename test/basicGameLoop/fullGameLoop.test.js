import { expect } from "chai";
import { gameLoopTestHandle } from "../../gameCode/game/gameLoop.js"
import loopTestJson from "../testData/loopTest.json" assert { type: 'json' };; 

describe("Basic Game Loop Test: Full Game Loop", function (){
    it("Tests Full Loop: Success", function (){
        const [gameOverMessage, errors] = gameLoopTestHandle(loopTestJson["commands"])
        expect(gameOverMessage).to.eq("Game Over! Player 1 Wins!")
        errors.to.be.an("array").that.is.empty
    })
})
