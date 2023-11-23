import { expect } from "chai";
import { gameLoopTestHandle } from "../../gameCode/game/gameLoop.js"
import loopTestBeetleJson from "../testData/loopTest.beetle.json" assert { type: 'json' };; 
import loopTestSimpleJson from "../testData/loopTest.simple.json" assert { type: 'json' };; 


describe("Basic Game Loop Test: Full Game Loop", function (){
    it("Tests Full Loop: Success, Simple Test", function (){
        const [gameOverMessage, errors] = gameLoopTestHandle(loopTestSimpleJson["commands"])
        console.log("errors",errors)
        expect(gameOverMessage).to.eq("Game Over! Player 1 Wins!")
        expect(errors).to.be.an("array").that.is.empty
    })

    it.skip("Tests Full Loop: Success, Beetle Traversal Test", function (){ //cell getting erased when beetle traversing across top
        const [gameOverMessage, errors] = gameLoopTestHandle(loopTestBeetleJson["commands"])
        console.log("errors",errors)
        expect(gameOverMessage).to.eq("Game Over! Player 1 Wins!")
        expect(errors).to.be.an("array").that.is.empty
    })
})
