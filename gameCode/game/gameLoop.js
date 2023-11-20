import {isWinConditionMet, processCommand, processMovement, processPlacement } from "./gameLoop.util.js";

export function processTurn(userInput, currentPlayer, otherPlayer, board) {
  let message = "Move Good."
  let turnSuccess = false
  let moveSuccess, moveMessage, placeSuccess, placeMessage
  const [verb,bug,index,coord] = processCommand(userInput)
  
  if(index > 2) {
    message = "Invalid index. Must be less than 2."
  }

  if(verb == "move") {
    [moveSuccess, moveMessage] = processMovement(currentPlayer,bug,index,coord,board)
    if(!processSuccess) {
      message = moveMessage
    }
  } else if(verb == "place") {
    [placeSuccess, placeMessage] = processPlacement(currentPlayer,bug,coord,board)
    if(!placeSuccess) {
      message = placeMessage
    }
  } else {
    console.log ("Invalid verb. Start with 'move' or 'place'.")
  }

  if(placeSuccess || moveSuccess) {
    turnSuccess = true
    const [winConditionMet, winMessage] = isWinConditionMet(currentPlayer,otherPlayer,board)
    if(winConditionMet) {
      message = winMessage
    }
  }
  return [turnSuccess, message]
}