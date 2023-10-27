import { expect } from "chai"
import Bug, { queenBee } from "../gameObjects/bugs.js"
import Move from "../gameObjects/move.js"
import checkMove from "../gameLogic/checkMove.js"

describe("Basic Movement Logic Tests", function () {
    it("tests queen bee movement", function () {
        const bee1 = new queenBee("white",0)
        const bee2 = new queenBee("black",0)
        const beeMove = new Move(bee1,bee2,2)
        const check = checkMove(beeMove)
        expect(check).to.be.true;
    })

    it("tests beetle movement", function () {
        expect(2).to.equal(2);
    })

    it("tests ant movement", function () {
        expect(2).to.equal(2);
    })

    it("tests spider movement", function () {
        expect(2).to.equal(2);
    })

    it("tests grasshopper movement", function () {
        expect(2).to.equal(2);
    })
})