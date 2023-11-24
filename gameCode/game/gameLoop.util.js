import Move from "../gameObjects/move.js";
import Placement from "../gameObjects/placement.js";
import {checkPlacement} from "../../gameCode/placementLogic/checkPlacement.js";
import checkMove from "../moveLogic/checkMove.js"

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
  //process coords here by calling translate function to see if legit coord
  return [verb,bug,index,coord]
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
        else message = "Invalid bug. Re-input command."
        const move = new Move(bug, coord)
        const [bIsMoveGood, failureMessage] = checkMove(move, board)
        if(bIsMoveGood) {
          board.updateBugCoord(move)
          board.incrementTurn()
          processSuccess = true
        } else {
          message = failureMessage + " Re-input command."
        }
    }
    return [processSuccess, message]
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
    } else message = failureMessage + " Re-input command."
    return [processSuccess, message]
}

export default isWinConditionMet