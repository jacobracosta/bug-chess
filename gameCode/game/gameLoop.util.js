import Move from "../gameObjects/move.js";
import Placement from "../gameObjects/placement.js";
import {checkPlacement} from "../../gameCode/placementLogic/checkPlacement.js";
import checkMove from "../moveLogic/checkMove.js"
import { verifyRefCoord } from "../utils/coordinateTranslate.util.js";

export function isWinConditionMet(player1, player2, board) {
    let message = "None"
    let conditionMet = false
    const p1Surrounded = player1.isQueenSurrounded(board)
    const p2Surrounded = player2.isQueenSurrounded(board)
    if(p1Surrounded || p2Surrounded) {
      conditionMet = true
      if(p1Surrounded && !p2Surrounded) message = "Game Over! Player 2 Wins!"
      else if(p2Surrounded && !p1Surrounded) message = "Game Over! Player 1 Wins!"
      else message = "Game Over! Draw."
    }
    return [conditionMet, message]
}

export function processCommand(userInput) {
  const inputArray = userInput.split(" ")
  const verb = inputArray[0].toLowerCase()
  const [bug,index] = inputArray[1].split("-")
  const coord = (inputArray[2].split(",")).map(Number)
  let processSuccess, processMessage
  const validBugs = ["queenBee", "ant", "hopper", "spider", "beetle"]

  if (verb != 'move' && verb != 'place') {
    processMessage = "Invalid verb. Start with 'move' or 'place'."
    processSuccess = false
  }
  else if(!validBugs.includes(bug)) {
    processMessage = "Invalid bug. Must be 'queenBee', 'ant', 'hopper', 'spider', or 'beetle'."
    processSuccess = false
  }
  else if(index > 2) {
    processMessage = "Index cannot be greater than 2."
    processSuccess = false
  }
  else if(!verifyRefCoord(coord)) {
    processMessage = "Coordinate not good."
    processSuccess = false
  }
  else {
    processMessage = "Success."
    processSuccess = true
  }

  return [processSuccess, processMessage, [verb, bug, index, coord]]
}

export function processMovement(player, bugType, index, coord, board){
    let message = "None"
    let processSuccess = false
    let bug;
    if(!player.queenBee){
        message = "Cannot move until your queen is placed." //
      } else {
        if(bugType == "queenBee") bug = player.queenBee
        else if (bugType == "beetle") bug = player.beetles[index]
        else if (bugType == "hopper") bug = player.hoppers[index]
        else if (bugType == "spider") bug = player.spiders[index]
        else if (bugType == "ant") bug = player.ants[index]
        else message = "Invalid bug."
        const move = new Move(bug, coord)
        const [bIsMoveGood, failureMessage] = checkMove(move, board)
        if(bIsMoveGood) {
          board.updateBugCoord(move)
          board.incrementTurn()
          processSuccess = true
        } else {
          message = failureMessage
        }
    }
    return [processSuccess, message + " Re-input command."]
}

export function processPlacement(player, bug, coord, board) {
    let message = "None"
    let processSuccess = false
    if(player.isFirst) {
        if(board.turn >= 7 && !player.queenBee) message = "You must place your queen by your 4th turn." //
    } else {
        if(board.turn >= 8 && !player.queenBee) message = "You must place your queen by your 4th turn." //
    }

    const placement = new Placement(player, coord, bug)
    const [bIsPlacementGood, failureMessage] = checkPlacement(placement,board) //issue placing an empty thing
    if(bIsPlacementGood) {
        placement.addBugToGame(board)
        board.incrementTurn()
        processSuccess = true
    } else message = failureMessage
    return [processSuccess, message + " Re-input command."]
}

export default isWinConditionMet